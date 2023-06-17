import crypto from "crypto";
import {
  InvocationType,
  InvokeCommand,
  LambdaClient,
} from "@aws-sdk/client-lambda";
import { ConversationAICommand } from "../../../domain/conversation/ai/conversation-ai.commands";
import { ConversationAIService } from "../../../domain/conversation/ai/conversation-ai.service";
import { getEnv } from "../../../env";

export class OpenAILambdaInvoke implements ConversationAISer