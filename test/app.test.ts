import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { Sqs } from '../src/sqs';
 
test('SQS Created', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'MyTestStack');

  new Sqs(stack, 'Test', {})

  const template = Template.fromStack(stack);
  template.hasResourceProperties('AWS::SQS::Queue', {
   "SqsManagedSseEnabled": true,
  });
});