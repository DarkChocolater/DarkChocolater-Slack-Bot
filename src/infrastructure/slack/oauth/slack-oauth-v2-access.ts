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
}: OAuthV2AccessInput): Promise<OAuthV2AccessOutput> {
  const form = new URLSearchParams();
  form.append("client_id", clientId);
  form.append("client_secret", clientSecret);
  form.append("code", code);

  const response = await fetch(OAUTH_V2_ACCESS_URL, {
    method: "POST",
    body: form,
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    