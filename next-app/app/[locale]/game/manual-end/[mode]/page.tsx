import { getTextByMode, getValidModes, type Mode } from "@/lib/text/getTextDict"
import { notFound } from "next/navigation"
import ManualEndTypingBox from "@/app/components/game/ManualEndTypingBox"
import { createClient } from "@/lib/supabase/server"
import GameTypeDropdown from "@/app/components/game/GameTypeDropdown"
import ModeDropdown from "@/app/components/game/ModeDropdown"

export default async function ManualEndModePage({
    params,
}: {
    params: Promise<{ mode: string; locale: string }>
}) {
    const { mode, locale } = await params
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
                <div className="mb-2">
                    <GameTypeDropdown currentType="manual-end" mode={mode} locale={locale} />
                </div>
                <ModeDropdown currentMode={mode as Mode} gameType="manual-end" locale={locale} />
            </div>
            <ManualEndTypingBox targetText={text} userId={userId} />
        </div>
    )
}

