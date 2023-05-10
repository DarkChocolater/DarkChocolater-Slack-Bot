import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { SlackOAuthBaseRepository } from "./slack-oauth-base-repository";
import { TeamAccess, UserAccess } from "../../../slack/oauth/oauth.dto";

export class SlackOAuthWriterRepository extends SlackOAuthBaseRepository {
  constructor() {
    super();
  }

  async putTeamAccess(
    appId: string,
    teamId: string,
    team