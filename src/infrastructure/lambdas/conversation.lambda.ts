import { createHandler, EventListenerLambda, SQSEvent } from "./lambda";
import { ConversationCommandHandler } from "../../application/conversation/conversation-command.handler";
import { ConversationCommand } from "../../domain/conversation/conversation.commands";

class ConversationLambda extends EventListenerLambda {
  constructor(
    private readonly conversationCommandHandler = new Convers