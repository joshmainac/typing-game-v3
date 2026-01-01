"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

import { useCountdownTimer } from "@/app/hooks/useCountdownTimer"
import { useGameStates } from "@/app/hooks/useGameStats"

interface TimeBaseTypingBoxProps {
    targetText: string
    userId: string | null
}

export default function TimeBaseTypingBox({
    targetText,
    userId,
}: TimeBaseTypingBoxProps) {
    const router = useRouter()
    const pathname = usePathname()

    const [text, setText] = useState("")
    const [startTime, setStartTime] = useState<number | null>(null)

    const { remainingMs, elapsedMs } = useCountdownTimer(startTime, 10_000)
    const { wpm, accuracy } = useGameStates(targetText, text, elapsedMs)

    // ✅ Redirect when time is up
    useEffect(() => {
        if (startTime !== null && remainingMs === 0) {
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
    }, [remainingMs, startTime, router, pathname, userId])

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
                    <div>Time left: {Math.ceil(remainingMs / 1000)}s</div>
                    <div>Elapsed time: {Math.ceil(elapsedMs / 1000)}s</div>
                    <div>WPM: {wpm}</div>
                    <div>Accuracy: {accuracy}%</div>
                    <div>Target text: {targetText}</div>
                </>
            )}
        </div>
    )
}
