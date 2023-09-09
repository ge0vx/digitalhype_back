import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { postCypher } from "./PostCypher";
import { getCypher } from "./GetCypher";
import { CypherFieldError, MissingFieldError } from "../shared/Validator";
import { addCorsHeader } from "../shared/Util";


const ddbClient = new DynamoDBClient({});

async function handler(event:APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {

    let response: APIGatewayProxyResult;

    try {
        switch (event.httpMethod) {
            case 'GET':
                const getResponse = await getCypher(event, ddbClient);
                response = getResponse;
                break;
            case 'POST':
                const postResponse = await postCypher(event, ddbClient);
                response = postResponse;
                break;
            default:
                break;
        }
    } catch(error) {
        if(error instanceof MissingFieldError){
            return {
                statusCode: 400,
                body: JSON.stringify(error.message)
            }
        }

        if(error instanceof CypherFieldError){
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

    addCorsHeader(response)
    return response;
}

export { handler }