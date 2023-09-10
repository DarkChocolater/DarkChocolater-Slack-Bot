import { SecretsManagerAdapter } from "./secrets-manager-adapter";
import { getEnv } from "../../env";

type AppId = string;
type AppSecrets = {
  token?: string;
  clientId?: string;
  clientSecret?: string;
};

export class SlackSecretsService {
  private static readonly SLACK_SECRET_ARN = getEnv("SLACK_SECRET_ARN");
  private static readonly APP_SECRET_REGEX =
    /^app\/(?<appId>[a-zA-Z0-9]+)\/(?<secretName>token|client-id|client-secret)$/;
  private static readonly SLACK_SECRET_TTL = 60 * 1000;

  private static getFieldNameBySecretName(
    secretName: string
  ): keyof AppSecrets {
    switch (secretName) {
      case "token":
        return "token";
      case "client-id":
        return "clientId";
      case "client-secret":
        return "clientSecret";
      default:
        throw new Error("unknown secret 