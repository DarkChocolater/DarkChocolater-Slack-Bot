
import { resolve } from "path";
import * as apigwv2 from "@aws-cdk/aws-apigatewayv2-alpha";
import { HttpLambdaIntegration } from "@aws-cdk/aws-apigatewayv2-integrations-alpha";
import { SlackEventBus } from "@wisegpt/awscdk-slack-event-bus";
import {
  aws_events as Events,
  aws_events_targets as EventsTargets,
  aws_lambda_event_sources as LambdaEventSources,
  CfnOutput,
  Duration,
} from "aws-cdk-lib";
import {
  AttributeType,
  BillingMode,
  ProjectionType,
  Table,
} from "aws-cdk-lib/aws-dynamodb";
import { Alias } from "aws-cdk-lib/aws-lambda";
import { ISecret } from "aws-cdk-lib/aws-secretsmanager";
import { IQueue } from "aws-cdk-lib/aws-sqs";
import { Construct } from "constructs";
import { CustomNodejsFunction } from "./custom-nodejs-function";
import { EnvKey } from "../../env";

const SLACK_ADAPTER_LAMBDA_TIMEOUT = Duration.seconds(15);
const CONVERSATION_ID_INDEX_NAME = "CONVERSATION_ID_INDEX";

type SlackResourcesProps = {
  appId: string;
  authType: "TOKEN_BASED" | "OAUTH_BASED";
  secret: ISecret;
  httpApi: apigwv2.HttpApi;
  conversationCommandSQS: IQueue;
  conversationEventSQS: IQueue;
};

export class SlackResources extends Construct {