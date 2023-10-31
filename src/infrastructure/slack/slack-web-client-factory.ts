import { WebClient } from "@slack/web-api";
import config from "../../config";
import { SlackOAuthReaderRepository } from "../dynamodb/slack/oauth/slack-oauth-reader.repository";
import defaultSlackSecretsService, {
  SlackSecretsService,
} from "../secrets/slack-secrets.service";

function assertSlackAuthTypeUnreachable(value: never): never {
  throw new Error(`unknown type of slack auth type: '${value}'`);