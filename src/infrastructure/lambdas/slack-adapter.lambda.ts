import type * as Lambda from "aws-lambda";
import {
  createHandler,
  EventListenerLambda,
  isSlackEventTypeOf,
  SlackEventBridgeEvent,
  SQSEvent,
} from "./lambda";
import { ConversationEventHandler } from "../../application/slack-adapter/conversation-event-handler";
import {