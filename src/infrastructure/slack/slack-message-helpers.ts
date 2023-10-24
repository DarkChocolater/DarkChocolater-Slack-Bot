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
      ":hourglass_flowing_sand: hold on for a few seconds...";

    return {
      text: LOADING_TEXT,
      blocks: [
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: LOADING_TEXT,
            },
          ],
        },
      ],
    };
  }

  static updateWithResponse({
    markdownBody,
    botUserId,
  }: {
    markdownBody: string;
    botUserId: string;
  }): UpdateWithResponseOutput {
    const text = prepareForSlack({ text: markdownBody, botUserId });

    return {
      text,
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text,
          }