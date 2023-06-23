import type * as Lambda from "aws-lambda";
import {
  SlackEventType,
  SlackMessageEventWithEnvelope,
} from "../../domain/slack-adapter/slack-adapter.dto";

export type SQSEvent = Lambda.SQSEvent;

abstract cl