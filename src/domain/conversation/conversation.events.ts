type BaseEvent = {
  eventId: number;
  conversationId: string;
};

export type ConversationStarted = BaseEvent & {
  type: "CONVERSATION_STARTED";
  metadata: Record<string, string>;
};

export type UserMessageAdded = BaseEvent & {
  type: "USER_MESSAGE_ADDED";
  message: {
    id: string;
    text: string;
    author: { id: string };
    approximateTokens: number;
  };
};

export type BotCompletionRequested = BaseEvent & {
  type: "BOT_COMPLETION_REQUESTED";
  correlationId: string;
};

export type BotResponseAdded = BaseEvent & {
  type: "BOT_RESPONSE_ADDED";
  correlationId: string;
  m