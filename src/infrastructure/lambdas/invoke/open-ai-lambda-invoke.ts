import crypto from "crypto";
import {
  InvocationType,
  InvokeCommand,
  LambdaClient,
} from "@aws-sdk/client-lambda";
import { ConversationAICommand } from "../../../domain/conversation/ai/conversation-ai.commands";
import { ConversationAIService } from "../../../domain/conversation/ai/conversation-ai.service";
import { getEnv } from "../../../env";

export class OpenAILambdaInvoke implements ConversationAIService {
  private static readonly LAMBDA_ARN = getEnv("OPENAI_LAMBDA_ARN");

  constructor(private readonly client = new LambdaClient({})) {}

  async trigger(
    input: Omit<ConversationAICommand, "correlationId">
  ): Promise<{ correlationId: string }> {
    const correlationId = crypto.randomUUID();
    const cmd = { ...input, correlationId };

    const result = await this.client.se