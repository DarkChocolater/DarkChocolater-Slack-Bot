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
  type