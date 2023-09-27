export type TeamAccess = {
  appId: string;
  teamId: string;
  accessToken: string | null;
  authedUsers: Set<string>;
  scopes: Set<string>;
};

export type UserAccess = {
  appId: string;
  teamId: string;
  userId: string;
  accessToken: string | null;
  scopes: Set<string>;
};

export type OAuthV2AccessResponse =
  | { ok: false; error: string }
  | {
      ok: true;
      app_id: string;
      authed_user: {
        id: string;
        scope?: string;
        access_token?: string;
        token_type?: string;
      };
