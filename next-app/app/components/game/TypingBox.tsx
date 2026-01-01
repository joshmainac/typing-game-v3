"use client"

import { useCountdownTimer } from "@/app/hooks/useCountdownTimer"
import { useGameStates } from "@/app/hooks/useGameStats"
import { useState } from "react"

interface TypingBoxProps {
    targetText: string
}

export default function TypingBox({ targetText }: TypingBoxProps) {
    const [text, setText] = useState("")
    const [startTime, setStartTime] = useState<number | null>(null)

    const { remainingMs, elapsedMs } = useCountdownTimer(startTime, 10_000)
    const { wpm, accuracy } = useGameStates(targetText, text, elapsedMs)

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
                    <div>
                        Time left: {Math.ceil(remainingMs / 1000)}s
                    </div>
                    <div>
                        Elapsed time: {Math.ceil(elapsedMs / 1000)}s
                    </div>
                    <div>
                        WPM: {wpm}
                    </div>
                    <div>
                        Accuracy: {accuracy}%
                    </div>
                    <div>
                        Target text: {targetText}
                    </div>
                </>
            )}
        </div>
    )
}
