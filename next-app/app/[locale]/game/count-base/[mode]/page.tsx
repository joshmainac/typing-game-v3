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
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                    Count Base
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">
                    {mode.toUpperCase()}
                </p>
            </div>
            <CountBaseTypingBox targetText={text} userId={userId} />
        </div>
    )
}

