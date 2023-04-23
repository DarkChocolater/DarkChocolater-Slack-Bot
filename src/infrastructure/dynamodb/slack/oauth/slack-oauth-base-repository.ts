import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { getEnv } from "../../../../env";
import { defaultDynamoDBDocumentClient } from "../../crud/dynamodb-clients";

export abstract class SlackOAuthBaseRepository {
