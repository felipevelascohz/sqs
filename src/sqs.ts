import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as kms from 'aws-cdk-lib/aws-kms';

interface SqsProps {
    sourceRoles: string[];
    fifo?: boolean;
    env: {
        region:any,
        account:any
    };   
}

export class Sqs extends cdk.Stack {
    public constructor(scope: Construct, id: string, props: SqsProps){
        super(scope, id + 'Sqs', props)

        const policyStatement = new iam.PolicyStatement({
            actions: [
                "kms:Create*",
                "kms:Describe*",
                "kms:Enable*",
                "kms:List*",
                "kms:Put*",
                "kms:Update*",
                "kms:Revoke*",
                "kms:Disable*",
                "kms:Get*",
                "kms:Delete*",
                "kms:ScheduleKeyDeletion",
                "kms:CancelKeyDeletion"
            ],
            resources: ['*'],
            principals: [new iam.AccountRootPrincipal()]
        });

        const encryptionKey = new kms.Key(this, 'Key', {
            enableKeyRotation: true,
            policy: new iam.PolicyDocument({
                statements: [policyStatement]
            })
          });

        const queue = new sqs.Queue(this, id, {
            encryption: sqs.QueueEncryption.KMS_MANAGED,
            enforceSSL: true,
            encryptionMasterKey: encryptionKey
        });

        for (var i = 0; i < props.sourceRoles.length; i++) {
            queue.addToResourcePolicy(
                new iam.PolicyStatement({
                    actions: [
                        'SQS:SendMessage',
                        'SQS:ChangeMessageVisibility',
                        'SQS:DeleteMessage',
                        'SQS:ReceiveMessage'
                    ],
                    principals: [new iam.ArnPrincipal(props.sourceRoles[i])],
                    resources: [queue.queueArn]
                })
            );
        };
        
        new cdk.CfnOutput(this, 'URL', {
            value: queue.queueUrl,
            description: 'The URL of SQS',
            exportName: 'sqsURL'
          });

          new cdk.CfnOutput(this, 'ARN', {
            value: queue.queueArn,
            description: 'The ARN of SQS',
            exportName: 'sqsARN'
          });

    }
}