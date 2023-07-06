# AWS SQS lib

Library created by:
 
 - Name: Felipe Velasco  
 - Org: BaasKit

 # Usage
Code example:

``` typescript
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { Sqs } from '@felipevelascohz/sqs/lib/';

const iniciativa: string = 'IdSbxFelipeVelasco';
const provider = {
  account: process.env.CDK_DEFAULT_ACCOUNT, 
  region: process.env.CDK_DEFAULT_REGION 
};

const app = new cdk.App();

new Sqs(app, iniciativa, {
  sourceRoles: [],
  env: provider
});
```