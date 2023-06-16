import crypto from "crypto";
import {
  InvocationType,
  InvokeCommand,
  LambdaClient,
} from "@aws-sdk/client-lambda";
import { ConversationAICommand } from "../../../domain/conversation/ai/conversation-ai.commands";
import { ConversationAIService } from "../../../domain/conversa