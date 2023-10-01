import {
  OAuthV2AccessInput,
  OAuthV2AccessOutput,
  OAuthV2AccessResponse,
} from "./oauth.dto";

const OAUTH_V2_ACCESS_URL = "https://slack.com/api/oauth.v2.access";

export async function slackOAuthV2Access({
  clientId,
  clientSecret,
  code,
}: OAu