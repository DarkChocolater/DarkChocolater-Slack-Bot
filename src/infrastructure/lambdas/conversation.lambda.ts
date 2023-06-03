import { createHandler, EventListenerLambda, SQSEvent } from "./lambda";
import { ConversationCommandHandler } from "../../application/conversation/conversation-command.handler";
import { ConversationCommand } from "../../domain/conversation/conversation.commands";

class ConversationLambda extends EventListenerLambda {
  constructor(
    private readonly conversationCommandHandler = new ConversationCommandHandler()
  ) {
    super({ lambdaName: "ConversationLambda" });
  }

  protected async handleSQSEvent({ Records }: SQSEvent) {
    try {
      const cmd: ConversationCommand = JSON.parse(Records[0].body);

      await this.con