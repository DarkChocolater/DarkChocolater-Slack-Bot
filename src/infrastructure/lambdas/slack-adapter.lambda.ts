import type * as Lambda from "aws-lambda";
import {
  createHandler,
  EventListenerLambda,
  isSlackEventTypeOf,
  SlackEventBridgeEvent,
  SQSEvent,
} from "./lambda";
import { ConversationEventHandler } from "../../application/slack-adapter/conversation-event-handler";
import { SlackEventHandler } from "../../application/slack-adapter/slack-event-handler";
import { SlackOAuthHandler } from "../../a