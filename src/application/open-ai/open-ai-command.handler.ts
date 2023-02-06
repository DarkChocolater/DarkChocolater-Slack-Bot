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
import { C