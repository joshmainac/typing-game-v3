import { getHistoryByUserId } from "@/lib/data/user_history"
import { createClient } from "@/lib/supabase/server"


export default async function HistoryPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user?.id) {
        return <p>Please sign in to view your history</p>
    }

    const data = await getHistoryByUserId(user.id)

    return (
        <ul>
            {data.map((history) =>
                <li key={`${history.id}-${history.created_at}`}>
                    {history.wpm} - {history.accuracy} - {history.duration} - {history.mode}
                </li>
            )}
        </ul>
    )
}

