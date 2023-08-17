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
Aspects.of(app).add(new AwsSolutionsChecks({ verbose: true }))
const stack = new cdk.Stack(app, iniciativa, {
  env: provider
})

new Sqs(stack, iniciativa, {})

app.synth();
