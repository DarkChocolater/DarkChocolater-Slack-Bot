type BaseEvent = {
  eventId: number;
  conversationId: string;
};

export type ConversationStarted = BaseEvent & {
  type: "CONVERSATION_STARTED";
  metadata: Record<string, string>;
};

export type Use