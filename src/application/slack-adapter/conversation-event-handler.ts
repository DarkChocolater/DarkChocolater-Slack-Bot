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
import { SlackMessageHelpers } from "../../infrastructure/slack/sl