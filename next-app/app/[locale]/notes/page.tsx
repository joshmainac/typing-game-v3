import { getNotes } from "@/lib/data/notes"


export default async function NotesPage() {
    const data = await getNotes()
    
    return (
        <ul>
            {data.map((note) =>
            <li key={note.PK}>{note.title} - {note.content}</li>)}
        </ul>
    )
}