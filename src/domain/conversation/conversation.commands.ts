type UserMessage = {
  id: string;
  text: string;
  author: { id: string };
};

type BaseCommand = { conversationId: string };

export type AddUserMessageCommand = BaseCommand & {
  type: "ADD