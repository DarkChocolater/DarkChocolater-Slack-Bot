import type * as Lambda from "aws-lambda";
import config from "../../config";
import { SlackOAuthReaderRepository } from "../../infrastructure/dynamodb/slack/oauth/slack-oauth-reader.repository";
import { SlackOAuthWriterRepository } from "../../infrastructure/dynamodb/slack/oauth/slack-oauth-writer.repository";
import {
  OAuthV2AccessOutput,
  TeamAccess,
  UserAccess,
} from "../../infrastructure/slack/oauth/oauth.dto";
import { SlackOAuthService } from "../../infrastructure/slack/oauth/slack-oauth-service";

export class SlackOAuthHandler {
  private static readonly APP_ID = config.slack.appId;

  private static mergeTeamAccess(
    { accessToken, authedUser: { id: us