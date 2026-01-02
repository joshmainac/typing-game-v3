"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

import { useCountdownTimer } from "@/app/hooks/useCountdownTimer"
import { useGameStates } from "@/app/hooks/useGameStats"

interface CountBaseTypingBoxProps {
    targetText: string
    userId: string | null
}

export default function CountBaseTypingBox({
    targetText,
    userId,
}: CountBaseTypingBoxProps) {
    const router = useRouter()
    const pathname = usePathname()

    const [text, setText] = useState("")
    const [startTime, setStartTime] = useState<number | null>(null)

    const { remainingMs, elapsedMs } = useCountdownTimer(startTime, 999_999_999)
    const { wpm, accuracy } = useGameStates(targetText, text, elapsedMs)

    // ✅ Redirect when text is completed
    useEffect(() => {
        if (text.trim() === targetText.trim() && text.length > 0) {
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
    }, [text, targetText, router, pathname, userId])

    const isCompleted = text.trim() === targetText.trim() && text.length > 0

    return (
        <div className="space-y-2">
            <input
                className="border px-2 py-1"
                value={text}
                onChange={(e) => {
                    if (startTime === null && e.target.value) {
                        setStartTime(Date.now())
                    }
                    if (!isCompleted) {
                        setText(e.target.value)
                    }
                }}
                placeholder="Start typing..."
                disabled={isCompleted}
            />

            <div>Text: {text}</div>

            {startTime && (
                <>
                    <div>Elapsed time: {Math.ceil(elapsedMs / 1000)}s</div>
                    <div>WPM: {wpm}</div>
                    <div>Accuracy: {accuracy}%</div>
                    <div>Target text: {targetText}</div>
                    {isCompleted && (
                        <div className="text-green-600 font-bold">
                            Completed!
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

