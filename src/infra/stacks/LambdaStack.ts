import { Stack, StackProps } from "aws-cdk-lib";
import { LambdaIntegration } from "aws-cdk-lib/aws-apigateway";
import { ITable } from "aws-cdk-lib/aws-dynamodb";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { Code, Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { join } from "path";

interface LambdaStackProps extends StackProps {
    cypherTable: ITable
}

export class LambdaStack extends Stack {

    public readonly cypherLamdaIntegration: LambdaIntegration

    constructor(scope: Construct, id: string, props?: LambdaStackProps){
        super(scope, id, props);

        const cypherLambda = new NodejsFunction(this, 'CypherLamda', {
            runtime: Runtime.NODEJS_18_X,
            handler: 'handler',
            entry: join(__dirname, '..', '..', 'services', 'cypher', 'handler.ts'),
            environment: {
                TABLE_NAME: props.cypherTable.tableName
            }
        })

        cypherLambda.addToRolePolicy(new PolicyStatement({
            effect: Effect.ALLOW,
            resources: [props.cypherTable.tableArn],
            actions:[
                'dynamodb:PutItem',
                'dynamodb:Scan'
            ]
        }))
        
        this.cypherLamdaIntegration = new LambdaIntegration(cypherLambda)

    }
}