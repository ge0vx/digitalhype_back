import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 } from "uuid";
import { validateCypherEntry } from "../shared/Validator";
import { marshall } from "@aws-sdk/util-dynamodb";

const ddbClient = new DynamoDBClient({});

export async function postCypher(event:APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {
    
    const item = JSON.parse(event.body);
    item.id = v4();
    validateCypherEntry(item)

    const result = await ddbClient.send(new PutItemCommand({
        TableName: process.env.TABLE_NAME,
        Item: marshall(item)
    }));

    console.log(result);

    return {
        statusCode: 200,
        body: JSON.stringify({id: item.id})
    }
}