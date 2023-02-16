import { WebClient } from "@slack/web-api";
import {
  BotResponseAdded,
  BotCompletionRequested,
  ConversationEnded,
  ConversationEvent,
  ConversationStarted,
} from "../../domain/conversation/conversation.events";
import { SlackConversationView } from "