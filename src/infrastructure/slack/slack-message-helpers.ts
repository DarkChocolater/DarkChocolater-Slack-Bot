import { ChatPostMessageArguments, ChatUpdateArguments } from "@slack/web-api";
import { ConversationEnded } from "../../domain/conversation/conversation.events";
import { prepareForSlack } from "../../domain/slack-adapter/conversation-mentions";

type CreateMessageOutput = Required<
  Pick<ChatPostMessageArguments, "text" | "blocks">
>;

type UpdateMessageOutput = Required<
  Pick<ChatUpdateArguments, "text" | "blocks">
>;

type UpdateWithResponseOutput = UpdateMessageOutput;

export class SlackMessageHelpers {
  static createInitialMessage(): CreateMessageOutput {
    const LOADING_TEXT =
      ":hourglass_flowing_sand: hold on for a f