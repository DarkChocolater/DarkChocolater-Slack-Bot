import { SendMessageCommand, SQSClient } from "@aws-sdk/client-sqs";
import { defaultSQSClient } from "./sqs";
import { getEnv } from "../../env";

export type DomainEvent = any & { type: string; conversationId: string };

export class EventBus {
  private static readonly QUEUE_URL = getEnv("EVENT_BUS_SQS");

  constructor(private readonly sqsClient: SQSClient = defaultSQSClient) {}

  async publish(event: DomainEvent)