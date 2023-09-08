import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { postCypher } from "./PostCypher";
import { getCypher } from "./GetCypher";
import { MissingFieldError } from "../shared/Validator";


const ddbClient = new DynamoDBClient({});

async function handler(event:APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {

    let message: string;

    try {
        switch (event.httpMethod) {
            case 'GET':
                const getResponse = getCypher(event, ddbClient);
                return getResponse;
            case 'POST':
                const postResponse = postCypher(event, ddbClient);
                return postResponse;
            default:
                break;
        }
    } catch(error) {
        console.error(error);

        if(error instanceof MissingFieldError){
            return {
                statusCode: 400,
                body: JSON.stringify(error.message)
            }
        }

        return {
            statusCode: 500,
            body: JSON.stringify(error.message)
        }
    }

    const response:APIGatewayProxyResult = {
        statusCode: 200,
        body: JSON.stringify(message),
    }

    return response;
}

export { handler }