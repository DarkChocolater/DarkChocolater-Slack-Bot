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
    private readonly slackOAuthReaderRepository: SlackOAuthReaderRepository = new SlackOAuthReaderRepository()
  ) {}

  async create({ teamId }: { teamId: string }): Promise<WebClient> {
    switch (SlackWebClientFactory.SLACK_AUTH_TYPE) {
      case "TOKEN_BASED":
        return this.createTokenBasedWebClient();
      case "OAUTH_BASED":
        return this.createOAuthBasedWebClient({ teamId });
      default:
        return assertSlackAuthTypeUnreachable(
          SlackWebClientFactory.SLACK_AUTH_TYPE
        );
    }
  }

  private async createTokenBasedWebClient(): Promise<WebClient> {
    const secrets = await this.slackSecretService.retrieve();

    if 