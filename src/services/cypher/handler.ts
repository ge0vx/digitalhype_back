import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";


async function handler(event:APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {

    const response:APIGatewayProxyResult = {
        statusCode: 200,
        body: JSON.stringify('hello from handler'),
    }

    return response;
}

export { handler }