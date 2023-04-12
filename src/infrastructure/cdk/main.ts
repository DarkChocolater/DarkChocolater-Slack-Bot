import { resolve } from "path";
import * as apigwv2 from "@aws-cdk/aws-apigatewayv2-alpha";
import {
  App,
  aws_lambda_event_sources as LambdaEventSources,
  Duration,
  Stack,
  StackProps,
} from "aws-cdk-lib";
import { AttributeType, BillingMode, Table } from "aws-cdk-lib/aws-dynamodb";
import { Secret } from "aws-cdk-lib/aws-secretsmanager";
import { DeduplicationScope, Queue } from "aws-cdk-lib/aws-sqs";
import { Construct } from "constructs";
import { CustomNodejsFunction } from "./custom-nodejs-function";
import { SlackResources } from "./slack-resources";
import config from "../../config";
import { EnvKey } from "../../env";

const CONVERSATION_LAMBDA_TIMEOUT = Duration.seconds(15);
const OPENAI_LAMBDA_TIMEOUT = Duration.seconds(30);

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    