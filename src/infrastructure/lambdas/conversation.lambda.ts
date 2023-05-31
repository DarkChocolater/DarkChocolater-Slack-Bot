import { createHandler, EventListenerLambda, SQSEvent } from "./lambda";
import { ConversationCommandHandler } from "../../application/conversation/conversation-command.handler";
import { ConversationCommand } from "../../domain/conversation/conversation.commands";

class Conv