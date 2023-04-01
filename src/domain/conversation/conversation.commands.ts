type UserMessage = {
  id: string;
  text: string;
  author: { id: string };
};

type BaseCommand = { conversationId: string };

export type AddUserMessageCommand = BaseCommand & {
  type: "ADD_USER_MESSAGE_COMMAND";
  message: UserMessage;
};

export type CreateConversationCommand = BaseCommand & {
  type: "CREATE_CONVERSATION_COMMAND";
  initialMessage: UserMessage;
  metadata: Record<string, string>;
};

export type ProcessCompl