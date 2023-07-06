import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as App from '../src/sqs';

// example test. To run these tests, uncomment this file along with the
// example resource in lib/app-stack.ts

const provider = {
   account: process.env.CDK_DEFAULT_ACCOUNT, 
   region: process.env.CDK_DEFAULT_REGION 
 }
 

test('SQS Created', () => {
  const app = new cdk.App();
  const stack = new App.Sqs(app, 'MyTestStack', {
   env: provider,
   sourceRoles: []
  });
  const template = Template.fromStack(stack);
  template.hasResourceProperties('AWS::SQS::Queue', {
   "SqsManagedSseEnabled": true,
  });
});