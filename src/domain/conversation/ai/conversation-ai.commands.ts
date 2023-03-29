import { Conversation } from "@wisegpt/gpt-conversation-prompt";

type BaseCommand = {
  conversationId: string;
  correlationId: string;
};

export type TriggerCompletionCommand = BaseCommand & {
 