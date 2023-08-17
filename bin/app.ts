#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { Sqs } from '../src/sqs';
import { AwsSolutionsChecks } from 'cdk-nag';
import { Aspects } from 'aws-cdk-lib';

const iniciativa :string = 'IdSbxFelipeVelasco';
const provider = {
  account: process.env.CDK_DEFAULT_ACCOUNT, 
  region: process.env.CDK_DEFAULT_REGION 
};

const app = new cdk.App();
Aspects.of(app).add(new AwsSolutionsChecks({ verbose: true }));
const stack = new cdk.Stack(app, iniciativa, {
  env: provider
});

const DLQ = new Sqs(stack, iniciativa + 'DLQ', {})
new Sqs(stack, iniciativa, {}, {
  deadLetterQueue: {
    queue: DLQ,
    maxReceiveCount: 10
  }
});

app.synth();
