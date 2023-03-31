
import { ConversationAIService } from "./ai/conversation-ai.service";
import {
  AddUserMessageCommand,
  ProcessCompletionResponseCommand,
  ProcessSummaryResponseCommand,
} from "./conversation.commands";
import {
  ConversationAIStatus,
  ConversationMessage,
  ConversationStatus,
  DistributiveOmit,
} from "./conversation.dto";
import {
  ConversationEnded,
  ConversationEvent,
  ConversationStarted,
} from "./conversation.events";
import { gpt3TokenCount } from "./gpt3-token-count";
import config from "../../config";

export class ConversationAggregate {
  static create(
    conversationId: string,
    metadata: Record<string, string>
  ): ConversationAggregate {
    return new ConversationAggregate(conversationId, {
      type: "CONVERSATION_STARTED",
      conversationId,
      metadata: metadata,
    });
  }

  static load(conversationId: string): ConversationAggregate {
    return new ConversationAggregate(conversationId);
  }

  private nextEventId: number;
  private status: ConversationStatus;

  private lastSummary: { summary: string; lastMessageId: string } | undefined;
  private messagesSinceLastSummary: ConversationMessage[];
  private totalTokensSinceLastSummary: number;

  private aiStatus: ConversationAIStatus;

  private totalTokensSpent: number;

  private newEvents: ConversationEvent[] = [];

  private constructor(
    public readonly conversationId: string,
    createEvent?: Omit<ConversationStarted, "eventId">
  ) {
    this.nextEventId = 0;
    this.status = { status: "ONGOING" };

    this.messagesSinceLastSummary = [];
    this.totalTokensSinceLastSummary = 0;

    this.aiStatus = {
      completion: { status: "IDLE" },
      summary: { status: "IDLE" },
    };
    this.totalTokensSpent = 0;

    if (createEvent) {
      this.createAndApply(createEvent);
    }
  }

  /**
   * Returns the recently appended events to the aggregate since the last load
   */
  get events(): ConversationEvent[] {
    return this.newEvents;
  }

  async addUserMessage(
    { message }: AddUserMessageCommand,
    conversationAIService: ConversationAIService
  ): Promise<void> {
    this.assertConversationOngoing();

    this.createAndApply({
      type: "USER_MESSAGE_ADDED",
      conversationId: this.conversationId,
      message: {
        ...message,
        approximateTokens: gpt3TokenCount(message.text),
      },
    });

    await this.triggerCompletionIfNecessary(conversationAIService);
  }

  async processCompletionResponse(
    cmd: ProcessCompletionResponseCommand,
    conversationAIService: ConversationAIService
  ): Promise<void> {
    this.assertConversationOngoing();

    const aiCompletionStatus = this.aiStatus.completion;

    if (aiCompletionStatus.status !== "PROCESSING") {
      throw new Error("expected AI Completion status to be Processing");
    }

    if (aiCompletionStatus.correlationId !== cmd.correlationId) {
      throw new Error(
        `unknown bot response, expected response for correlation id '${aiCompletionStatus.correlationId}' but got '${cmd.correlationId}'`
      );
    }

    switch (cmd.responseType) {
      case "BOT_COMPLETION_SUCCESS": {
        this.createAndApply({
          type: "BOT_RESPONSE_ADDED",
          conversationId: this.conversationId,
          correlationId: cmd.correlationId,
          message: {
            id: cmd.correlationId,
            text: cmd.message,
            tokens: cmd.messageTokens,
          },
          totalTokensSpent: cmd.totalTokensSpent,
        });

        if (!this.endConversationIfWentOverLimit()) {
          if (
            !(await this.triggerSummarizationIfNecessary(conversationAIService))
          ) {
            // TODO: fix completion is not triggering because bot response may get added after user message (timing issue)
            // we should use message time instead of event id to order messages
            await this.triggerCompletionIfNecessary(conversationAIService);
          }
        }

        return;
      }
      case "BOT_COMPLETION_ERROR": {
        return this.createAndApply({
          type: "CONVERSATION_ENDED",
          conversationId: this.conversationId,
          reason: {
            type: "BOT_COMPLETION_ERROR",
            correlationId: cmd.correlationId,
            error: {
              message: cmd.error.message,
            },
          },
        });
      }
      default:
        throw new Error(
          `unknown type of bot response: '${JSON.stringify(cmd)}'`
        );
    }
  }

  async processSummaryResponse(
    cmd: ProcessSummaryResponseCommand,
    conversationAIService: ConversationAIService
  ): Promise<void> {
    this.assertConversationOngoing();

    const aiSummaryStatus = this.aiStatus.summary;

    if (aiSummaryStatus.status !== "PROCESSING") {
      throw new Error("expected AI Summary status to be Processing");
    }

    if (aiSummaryStatus.correlationId !== cmd.correlationId) {
      throw new Error(
        `unknown bot response, expected response for correlation id '${aiSummaryStatus.correlationId}' but got '${cmd.correlationId}'`
      );
    }

    switch (cmd.responseType) {
      case "BOT_SUMMARY_SUCCESS": {
        this.createAndApply({
          type: "BOT_SUMMARY_ADDED",
          conversationId: this.conversationId,
          correlationId: cmd.correlationId,
          summary: cmd.summary,
          summaryTokens: cmd.summaryTokens,
          totalTokensSpent: cmd.totalTokensSpent,