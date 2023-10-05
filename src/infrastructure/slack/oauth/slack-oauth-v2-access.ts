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
    },
  });

  if (response.status !== 200) {
    throw new Error(
      `unexpected status code '${response.status}' returned from Slack oAuth`
    );
  }

  const data: OAuthV2AccessResponse = (await response.json()) as any;

  if (!data.ok) {
    throw new Error(`unexpected error happened with error: '${data.error}'`);
  }

  return {
    appId: data.app_id,
    authedUser: {
      id: data.authed_user.id,
      scopes: data.authed_user.scope?.split(",") || [],
     