"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"

import { useCountdownTimer } from "@/app/hooks/useCountdownTimer"
import { useGameStates } from "@/app/hooks/useGameStats"
import AnimatedHint from "./AnimatedHint"

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value

        // Start timer on first character typed
        if (startTime === null && value.length > 0) {
            setStartTime(Date.now())
        }

        setText(value)
    }

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

    const currentIndex = text.length

    return (
        <div 
            className="typing-box relative p-8 rounded-xl bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-700 shadow-lg"
            onClick={(e) => (e.currentTarget.querySelector('input') as HTMLInputElement)?.focus()}
        >
            {/* Time and stats display */}
            <div className="mb-6 flex items-center justify-between">
                <div className="text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Time</p>
                    <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                        {startTime !== null ? `${Math.ceil(elapsedMs / 1000)}s` : "0s"}
                    </p>
                </div>
                {startTime !== null && (
                    <>
                        <div className="text-center">
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">WPM</p>
                            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                                {wpm}
                            </p>
                        </div>
                        <div className="text-center">
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Accuracy</p>
                            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                {accuracy}%
                            </p>
                        </div>
                    </>
                )}
            </div>

            {/* Hidden input for capturing keyboard input */}
            <input
                type="text"
                value={text}
                onChange={handleChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-text z-10"
                autoFocus
            />

            {/* Visual text display */}
            <div className="text-xl leading-8 font-mono break-words whitespace-pre-wrap pointer-events-none select-none">
                {targetText.split("").map((char, index) => {
                    const typedChar = text[index];
                    const isCorrect = typedChar === char;
                    const isTyped = index < text.length;
                    const isCurrent = index === currentIndex;
                    const isBeforeStart = startTime === null
                    const isFirstChar = index === 0

                    let charClass = "text-gray-400 dark:text-gray-500 transition-colors";
                    if (isTyped) {
                        charClass = isCorrect
                            ? "text-green-600 dark:text-green-400 font-semibold"
                            : "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/40 font-semibold";
                    }

                    // Highlight current character
                    if (isCurrent) {
                        charClass += " bg-blue-200 dark:bg-blue-900/50 border-b-2 border-blue-500 dark:border-blue-400";
                    }

                    // Add blinking effect only before game starts
                    if (isBeforeStart && isFirstChar) {
                        charClass += " animate-blink";
                    }

                    return (
                        <span key={index} className={charClass}>
                            {char === " " ? "\u00A0" : char}
                        </span>
                    );
                })}
            </div>

            {/* Start hint */}
            {startTime === null && (
                <AnimatedHint />
            )}

            {/* End Game button */}
            {startTime !== null && (
                <div className="mt-6 flex justify-center relative z-20">
                    <button
                        onClick={handleEndGame}
                        className="px-6 py-3 bg-red-500 dark:bg-red-600 text-white rounded-lg hover:bg-red-600 dark:hover:bg-red-700 transition-colors font-semibold shadow-md"
                    >
                        End Game
                    </button>
                </div>
            )}
        </div>
    )
}

