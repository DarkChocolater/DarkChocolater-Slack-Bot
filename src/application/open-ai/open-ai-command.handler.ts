/**
 * `AICommandHandler` processes completion and summary requests
 * with the given correlation ID, and communicates
 */
import { CommandBus, globalCommandBus } from "../../domain/bus/command-bus";
import {
  ConversationAICommand,
  TriggerCompletionCommand,
  TriggerSummaryCommand,
} from "../../domain/conversation/ai/conversation-ai.commands";
import { ConversationCommand } from "../../domain/conversation/conversation.commands";
import { OpenAIService } from "../../infrastructure/openai/openai.service";

export class OpenAICommandHandler {
  constructor(
    private readonly conversationCommandBus: CommandBus<ConversationCommand> = globalCommandBus,
    private readonly openAIService: OpenAIService = new OpenAIService()
  ) {}

  async handle(cmd: ConversationAICommand): Promise<void> {
    switch (cmd.type) {
      case "TRIGGER_COMPLETION_COMMAND": {
        