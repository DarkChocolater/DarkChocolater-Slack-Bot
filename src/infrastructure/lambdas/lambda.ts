import type * as Lambda from "aws-lambda";
import {
  SlackEventType,
  SlackMessageEventWithEnvelope,
} from "../../domain/slack-adapter/slack-adapter.dto";

export type SQSEvent = Lambda.SQSEvent;

abstract class BaseLambda<TEvent = any, TResult = any> {
  protected constructor(protected readonly baseProps: { lambdaName: string }) {}

  abstract handle(event: TEvent, context: Lambda.Context): Promise<TResult>;
}

export abstract class AsyncLambda<TEvent = any> extends BaseLambda<
  TEvent,
  void
> {}

type SlackEventDetailMapping = {
  [SlackEventType.MESSAGE]: {
    detailType: "EventCallback.message";
    detail: SlackMessageEventWithEnvelope;
  };
};

export interface SlackEventBridgeEvent<
  T extends SlackEventType = SlackEventType
> extends Lambda.EventBridgeEvent<
    SlackEventDetailMapping[T]["detailType"],
    SlackEventDetailMapping[T]["detail"]
  > {}

export function isSlackEventTypeOf<T extends SlackEventType>(
  event: SlackEventBridgeEvent,
  type: T
): event is SlackEventBridgeEvent<T> {
  return event["detail-type"] === `EventCallback.${type}`;
}

export abstract class EventListenerLambda<
  T extends Lambda.EventBridgeEvent<any, any> = Lamb