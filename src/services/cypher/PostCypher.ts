import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 } from "uuid";
import { validateCypherEntry } from "../shared/Validator";
import { marshall } from "@aws-sdk/util-dynamodb";

export async function postCypher(event:APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {
    
    const item = JSON.parse(event.body);
    item.cypher = JSON.stringify(validateCypherEntry(item));
    item.id = v4();

    await ddbClient.send(new PutItemCommand({
        TableName: process.env.TABLE_NAME,
        Item: marshall(item)
    }));

    return {
        statusCode: 200,
        body: JSON.stringify({item})
    }
}
