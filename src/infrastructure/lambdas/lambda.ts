import type * as Lambda from "aws-lambda";
import {
  SlackEventType,
  SlackMessageEventWithEnvelope,
} from "../../domain/slack-adapter/slack-adapter.dto";

export type SQSEvent = Lambda.SQSEvent;

abstract class BaseLambda<TEvent = any, TResult = any> {
  protected constructor(protected readonly baseProps: { lambdaNa