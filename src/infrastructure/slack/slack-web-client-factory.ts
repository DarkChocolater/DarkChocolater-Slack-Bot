import { WebClient } from "@slack/web-api";
import config from "../../config";
import { SlackOAuthReaderRepository } from "../dynamodb/slack/oauth/slack-oauth-reader.repository";
import defaultSlackSecretsService, {
  SlackSecretsService,
} from "../secrets/slack-secrets.service";

function assertSlackAuthTypeUnreachable(value: never): never {
  throw new Error(`unknown type of slack auth type: '${value}'`);
}

export class SlackWebClientFactory {
  private static readonly SLACK_APP_ID = config.slack.appId;
  private static readonly SLACK_AUTH_TYPE = config.slack.authType;

  constructor(
    private readonly slackSecretService: SlackSecretsService = defaultSlackSecretsService,
    private readonly slackOAuthReaderRepository: SlackOAuthReaderRepository = new Sla