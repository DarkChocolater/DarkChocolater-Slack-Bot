import { AsyncLambda, createHandler } from "./lambda";
import { OpenAICommandHandler } from "../../application/open-ai/open-ai-command.handler";
import { ConversationAICommand } from "../../domain/conversation/ai/conversation-ai.commands";

class OpenAILambda extends AsyncLambda<ConversationAICommand> {
  constructor(
    private rea