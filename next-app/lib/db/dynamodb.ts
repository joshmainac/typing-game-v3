import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb"

const client = new DynamoDBClient({
    // region: process.env.AWS_REGION
})
export const documentClient = DynamoDBDocumentClient.from(client)