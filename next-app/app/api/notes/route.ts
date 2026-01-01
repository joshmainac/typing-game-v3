import { NextResponse } from "next/server"
import { getNotes } from "@/lib/data/notes"

export async function GET(request: Request) {
    const notes = await getNotes()

    return NextResponse.json(notes)

}