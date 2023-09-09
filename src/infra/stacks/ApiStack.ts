import { Stack, StackProps } from "aws-cdk-lib";
import { ApiKeySourceType, Cors, LambdaIntegration, ResourceOptions, RestApi } from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";

interface ApiStackProps extends StackProps {
    cypherLambdaIntegration: LambdaIntegration
}

export class ApiStack extends Stack {

    constructor(scope: Construct, id: string, props?: ApiStackProps){
        super(scope, id, props);

        const api = new RestApi(this, 'CypherApi');

        const optionsWithCors: ResourceOptions = {
            defaultCorsPreflightOptions: {
                allowOrigins: Cors.ALL_ORIGINS,
                allowMethods: Cors.ALL_METHODS,
            }
        }

        const cypherResource = api.root.addResource('cypher', optionsWithCors);
        cypherResource.addMethod('GET', props.cypherLambdaIntegration)
        cypherResource.addMethod('POST', props.cypherLambdaIntegration)
        
    }
}