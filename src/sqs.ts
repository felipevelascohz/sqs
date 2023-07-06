import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as iam from 'aws-cdk-lib/aws-iam';

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

        const queue = new sqs.Queue(this, id, {
            encryption: sqs.QueueEncryption.SQS_MANAGED,
            enforceSSL: true,
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
                    resources: [queue.queueArn],
                })
            );
        };
        
        new cdk.CfnOutput(this, 'SQS URL', {
            value: queue.queueUrl,
            description: 'The URL of SQS',
            exportName: 'sqsURL',
          });

          new cdk.CfnOutput(this, 'SQS ARN', {
            value: queue.queueUrl,
            description: 'The ARN of SQS',
            exportName: 'sqsARN',
          });

    }
}