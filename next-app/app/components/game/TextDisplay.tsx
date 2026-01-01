"use client"

import { useState, useEffect, useRef } from "react"

interface TextDisplayProps {
    text: string;
}

interface GameStats {
    totalTypedChars: number;
    duration: number; // in seconds
    wpm: number; // words per minute
    accuracy: number; // percentage
}

export default function TextDisplay({ text }: TextDisplayProps) {
    const TIME_LIMIT = 60
    const [typedText, setTypedText] = useState("")
    const [timeRemaining, setTimeRemaining] = useState(TIME_LIMIT)
    const [isStarted, setIsStarted] = useState(false)
    const [isFinished, setIsFinished] = useState(false)
    const [gameStats, setGameStats] = useState<GameStats | null>(null)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)
    const startTimeRef = useRef<number | null>(null)

    // Timer countdown
    useEffect(() => {
        if (isStarted && !isFinished && timeRemaining > 0) {
            intervalRef.current = setInterval(() => {
                setTimeRemaining((prev) => {
                    if (prev <= 1) {
                        setIsFinished(true)
                        return 0
                    }
                    return prev - 1
                })
            }, 1000)
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
    }, [isStarted, isFinished, timeRemaining])

    // Calculate and store stats when game finishes
    useEffect(() => {
        if (isFinished && !gameStats && startTimeRef.current) {
            const duration = TIME_LIMIT - timeRemaining
            const totalTypedChars = typedText.length
            const correctChars = typedText.split("").filter((char, idx) => char === text[idx]).length
            const accuracy = totalTypedChars > 0 ? Math.round((correctChars / totalTypedChars) * 100) : 0

            // Calculate WPM: (total characters / 5) / (time in minutes)
            // Standard: 5 characters = 1 word
            const wordsTyped = totalTypedChars / 5
            const timeInMinutes = duration / 60
            const wpm = timeInMinutes > 0 ? Math.round(wordsTyped / timeInMinutes) : 0

            const stats: GameStats = {
                totalTypedChars,
                duration,
                wpm,
                accuracy
            }

            setGameStats(stats)
            console.log("Game Statistics:", stats)
        }
    }, [isFinished, gameStats, typedText, text, timeRemaining])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value

        // Start timer on first character typed
        if (!isStarted && value.length > 0) {
            setIsStarted(true)
            startTimeRef.current = Date.now()
        }

        // Don't allow typing if finished
        if (isFinished) {
            return
        }

        setTypedText(value)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // Prevent backspace when finished
        if (isFinished && e.key === "Backspace") {
            e.preventDefault()
        }
    }

    const currentIndex = typedText.length
    const correctChars = typedText.split("").filter((char, idx) => char === text[idx]).length
    const accuracy = typedText.length > 0 ? Math.round((correctChars / typedText.length) * 100) : 100

    return (
        <div className="relative p-8 rounded-xl bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-700 shadow-lg">
            {/* Timer and stats display */}
            <div className="mb-6 flex items-center justify-between">
                <div className="text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Time</p>
                    <p className={`text-3xl font-bold ${timeRemaining <= 10 ? "text-red-600 dark:text-red-400" : "text-gray-800 dark:text-gray-200"}`}>
                        {isFinished ? "Finish" : `${timeRemaining}s`}
                    </p>
                </div>
                {isStarted && (
                    <div className="text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Accuracy</p>
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {accuracy}%
                        </p>
                    </div>
                )}
            </div>

            {/* Hidden input for capturing keyboard input */}
            <input
                type="text"
                value={typedText}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                disabled={isFinished}
                className="absolute inset-0 w-full h-full opacity-0 cursor-text z-10"
                autoFocus
            />

            {/* Visual text display */}
            <div className="text-xl leading-8 font-mono break-words whitespace-pre-wrap pointer-events-none select-none">
                {text.split("").map((char, index) => {
                    const typedChar = typedText[index];
                    const isCorrect = typedChar === char;
                    const isTyped = index < typedText.length;
                    const isCurrent = index === currentIndex;

                    let charClass = "text-gray-400 dark:text-gray-500 transition-colors";
                    if (isTyped) {
                        charClass = isCorrect
                            ? "text-green-600 dark:text-green-400 font-semibold"
                            : "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/40 font-semibold";
                    }

                    // Highlight current character
                    if (isCurrent && !isFinished) {
                        charClass += " bg-blue-200 dark:bg-blue-900/50 border-b-2 border-blue-500 dark:border-blue-400";
                    }

                    return (
                        <span key={index} className={charClass}>
                            {char === " " ? "\u00A0" : char}
                        </span>
                    );
                })}
            </div>

            {/* Start hint */}
            {!isStarted && !isFinished && (
                <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
                    Start typing to begin...
                </div>
            )}

            {/* Final stats display */}
            {isFinished && gameStats && (
                <div className="mt-6 p-4 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600">
                    <h3 className="text-lg font-bold mb-3 text-center">Game Results</h3>
                    <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Characters</p>
                            <p className="text-xl font-bold">{gameStats.totalTypedChars}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Duration</p>
                            <p className="text-xl font-bold">{gameStats.duration}s</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">WPM</p>
                            <p className="text-xl font-bold text-purple-600 dark:text-purple-400">{gameStats.wpm}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Accuracy</p>
                            <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{gameStats.accuracy}%</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}