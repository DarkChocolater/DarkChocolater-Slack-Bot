
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
