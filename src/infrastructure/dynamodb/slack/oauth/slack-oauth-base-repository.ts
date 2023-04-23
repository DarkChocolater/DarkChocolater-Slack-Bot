import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { getEnv } from "../../../../env";
import { defaultDynamoDBDocumentClient } from "../../crud/dynamodb-clients";

export abstract class SlackOAuthBaseRepository {
  protected static readonly TABLE_NAME = getEnv("OAUTH_TABLE_NAME");
  protected static readonly PK_FIELD = "PK";
  protected sta