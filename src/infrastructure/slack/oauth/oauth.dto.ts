export type TeamAccess = {
  appId: string;
  teamId: string;
  accessToken: string | null;
  authedUsers: Set<string>;
  scopes: Set<string>;
};

export type UserAccess = {