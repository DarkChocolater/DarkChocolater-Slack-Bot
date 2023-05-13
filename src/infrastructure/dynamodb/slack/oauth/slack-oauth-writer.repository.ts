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
    teamAccess: TeamAccess
  ): Promise<void> {
    const pk = SlackOAuthBaseRepository.buildPK(appId, teamId);
    const sk = SlackOAuthBaseRepository.buildSKTeamAccess();

    await this.pClient.send(
      new PutCommand({
        TableName: S