import { ConversationPromptService } from "@wisegpt/gpt-conversation-prompt";
import { Configuration, OpenAIApi } from "openai";
import { OpenAiSecretsService } from "../secrets/open-ai-secrets.service";

export class ConversationPromptServiceFactory {
  private cache:
    | { apiKey: string; 