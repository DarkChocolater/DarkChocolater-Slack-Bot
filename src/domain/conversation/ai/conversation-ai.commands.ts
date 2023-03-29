import { Conversation } from "@wisegpt/gpt-conversation-prompt";

type BaseCommand = {
  conversationId: string;
  correlationId: string;
};

export type TriggerCompletionCommand = BaseCommand & {
  type: "TRIGGER_COMPLETION_COMMAND";
  conversation: Conversation;
};

export type TriggerSummaryCommand = BaseComma