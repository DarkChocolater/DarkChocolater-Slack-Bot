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
import { SlackOAuthHandler } from "../../application/slack-adapter/slack-oauth-handler";
import { DomainEvent } from "../../domain/bus/event-bus";
import { SlackEventType } from "../../domain/slack-adapter/slack-adapter.dto";

class SlackAdapterLambda extends EventListenerLambda<SlackEventBridgeEvent> {
  constructor(
    private readonly slackEventHandler: SlackEventHandler = new SlackEventHandler(),
    private readonly slackOAuthHandler: SlackOAuthHandler = new SlackOAuthHandler(),
    private readonly conversationEventHandler: ConversationEventHandler = new ConversationEventHandler()
  ) {
    super({ lambdaName: "SlackAdapterLambda" });
  }

  protected handleAPIGatewayProxyEvent(
    event: Lambda.APIGatewayProxyEventV2
  ): Promise<Lambda.APIGatewayProxyStructuredResultV2> {
    try {
      return this.slackOAuthHandler.handle(event);
    } catch (err) {
      // TODO: add better error handling, DLQ