import { getTextByMode, getValidModes, type Mode } from "@/lib/text/getTextDict"
import { notFound } from "next/navigation"
import ManualEndTypingBox from "@/app/components/game/ManualEndTypingBox"
import { createClient } from "@/lib/supabase/server"

export default async function ManualEndModePage({
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
            <h1>Manual End - {mode.toUpperCase()}</h1>
            <p>{text}</p>
            <ManualEndTypingBox targetText={text} userId={userId} />
        </div>
    )
}

