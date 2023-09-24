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

export type O