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