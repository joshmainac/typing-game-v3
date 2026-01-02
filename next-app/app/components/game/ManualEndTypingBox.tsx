"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"

import { useCountdownTimer } from "@/app/hooks/useCountdownTimer"
import { useGameStates } from "@/app/hooks/useGameStats"

interface ManualEndTypingBoxProps {
    targetText: string
    userId: string | null
}

export default function ManualEndTypingBox({
    targetText,
    userId,
}: ManualEndTypingBoxProps) {
    const router = useRouter()
    const pathname = usePathname()

    const [text, setText] = useState("")
    const [startTime, setStartTime] = useState<number | null>(null)

    // Use a very long time limit since it's manual end
    const { remainingMs, elapsedMs } = useCountdownTimer(startTime, 999_999_999)
    const { wpm, accuracy } = useGameStates(targetText, text, elapsedMs)

    const handleEndGame = () => {
        // Extract locale from pathname (e.g., /en/game/... -> en)
        const locale = pathname.split('/')[1] || 'en'
        
        if (userId) {
            // Redirect to history/[id] with the user's ID
            router.push(`/${locale}/history/${userId}`)
        } else {
            // If not logged in, redirect to home
            router.push(`/${locale}`)
        }
    }

    return (
        <div className="space-y-2">
            <input
                className="border px-2 py-1"
                value={text}
                onChange={(e) => {
                    if (startTime === null && e.target.value) {
                        setStartTime(Date.now())
                    }
                    setText(e.target.value)
                }}
                placeholder="Start typing..."
            />

            <div>Text: {text}</div>

            {startTime && (
                <>
                    <div>Elapsed time: {Math.ceil(elapsedMs / 1000)}s</div>
                    <div>WPM: {wpm}</div>
                    <div>Accuracy: {accuracy}%</div>
                    <div>Target text: {targetText}</div>
                    <button
                        onClick={handleEndGame}
                        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    >
                        End Game
                    </button>
                </>
            )}
        </div>
    )
}

