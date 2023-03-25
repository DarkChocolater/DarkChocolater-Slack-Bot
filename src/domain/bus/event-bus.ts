import { SendMessageCommand, SQSClient } from "@aws-sdk/client-sqs";
import { defaultSQSClient } from "./sqs";
import { getEnv } from "../../env";

export type DomainEvent