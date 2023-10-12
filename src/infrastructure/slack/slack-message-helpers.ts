import { ChatPostMessageArguments, ChatUpdateArguments } from "@slack/web-api";
import { ConversationEnded } from "../../domain/conversation/conversation.events";
import { prepareForSlack } from "../../domain/slack-adapter/conversation-mentions";

type CreateMessageOutput = Requ