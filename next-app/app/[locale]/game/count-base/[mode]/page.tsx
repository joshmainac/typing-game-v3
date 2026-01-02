import { getTextByMode, getValidModes, type Mode } from "@/lib/text/getTextDict"
import { notFound } from "next/navigation"
import CountBaseTypingBox from "@/app/components/game/CountBaseTypingBox"
import { createClient } from "@/lib/supabase/server"

export default async function CountBaseModePage({
    params,
}: {
    params: Promise<{ mode: string }>
}) {
    const { mode } = await params
    const validModes = getValidModes()
    
    if (!validModes.includes(mode as Mode)) {
        notFound()
    }
    
    const text = getTextByMode(mode as Mode)
    
    // Get user ID from server-side auth
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const userId = user?.id || null
    
    return (
        <div>
            <h1>Count Base - {mode.toUpperCase()}</h1>
            <p>{text}</p>
            <CountBaseTypingBox targetText={text} userId={userId} />
        </div>
    )
}

