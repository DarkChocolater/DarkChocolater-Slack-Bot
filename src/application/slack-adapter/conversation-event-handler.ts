import { WebClient } from "@slack/web-api";
import {
  BotResponseAdded,
  BotCompletionRequested,
  ConversationEnded,
  ConversationEvent,
  ConversationStarted,
} from "../../domain/conversation/conversation.events";
import { SlackConversationView } from "../../domain/slack-adapter/slack-adapter.dto";
import { SlackConversationDynamodbRepository } from "../../infrastructure/dynamodb/slack/slack-conversation-dynamodb.repository";
import { SlackMessageHelpers } from "../../infrastructure/slack/slack-message-helpers";
import defaultSlackWebClientFactory, {
  SlackWebClientFactory,
} from "../../infrastructure/slack/slack-web-client-factory";

export class ConversationEventHandler {
  constructor(
    private readonly repository: SlackConversationDynamodbRepository = new SlackConversationDynamodbRepository(),
    private readonly slackWebClientFactory: SlackWebClientFactory = defaultSlackWebClientFactory
  ) {}

  async handle(event: ConversationEvent): Promise<void> {
    switch (event.type) {
      case "CONVERSATION_STARTED":
        return this.handleConversationStarted(ev