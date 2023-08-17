import { Construct } from 'constructs';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as iam from 'aws-cdk-lib/aws-iam';

interface SqsPolicyConfig {
    props?: sqs.QueueProps;
    sourceRoles?: string[];
    policyActions?: string[];
    disableRootPrincipal?: boolean;   
}

const actions: string[] = [
    'SQS:SendMessage',
    'SQS:ChangeMessageVisibility',
    'SQS:DeleteMessage',
    'SQS:ReceiveMessage'
]

export class Sqs extends sqs.Queue {
    public constructor(scope: Construct, id: string, config: SqsPolicyConfig, props?: sqs.QueueProps){
        super(scope, id, {
            encryption: sqs.QueueEncryption.SQS_MANAGED,
            enforceSSL: true,
            ...props
        });

        const { policyActions = actions } = config;
        const { sourceRoles = [] } = config;
        const { disableRootPrincipal = false } = config;

        if (disableRootPrincipal == false){
            this.addToResourcePolicy(
                new iam.PolicyStatement({
                    actions: policyActions,
                    principals: [new iam.AccountRootPrincipal],
                    resources: [this.queueArn]
                })
            );
        };

        for (var i = 0; i < sourceRoles.length; i++) {
            this.addToResourcePolicy(
                new iam.PolicyStatement({
                    actions: policyActions,
                    principals: [new iam.ArnPrincipal(sourceRoles[i])],
                    resources: [this.queueArn]
                })
            );
        };
    }
};