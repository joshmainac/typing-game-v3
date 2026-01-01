import { ScanCommand } from "@aws-sdk/lib-dynamodb"
import { documentClient } from "@/lib/db/dynamodb"
import { Note } from "@/lib/types/notes"

export async function getNotes(): Promise<Note[]> {
    const command = new ScanCommand({
        TableName: "notes",
    })

    const response = await documentClient.send(command)

    return (response.Items ?? []) as Note[]
}
