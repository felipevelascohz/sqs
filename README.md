# AWS SQS lib

Library created by:

- Name: Felipe Velasco

## Usage

Code example:

``` typescript
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import * as sqs from '@felipevelascohz/sqs';
const iniciativa :string = 'IdSbxFelipeVelasco';
const provider = {
  account: process.env.CDK_DEFAULT_ACCOUNT, 
  region: process.env.CDK_DEFAULT_REGION 
};
const app = new cdk.App();
const stack = new cdk.Stack(app, iniciativa, {
  env: provider
});
new Sqs(stack, iniciativa, {})
app.synth();
```
