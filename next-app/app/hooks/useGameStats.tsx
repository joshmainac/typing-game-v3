"use client"

import { useMemo } from "react"

export function useGameStates(
    targetText: string,
    typedText: string,
    elapsedMs: number
) {
    return useMemo(() => {
        // Avoid division by zero
        if (elapsedMs === 0 || typedText.length === 0) {
            return { wpm: 0, accuracy: 100 }
        }

        // --- WPM ---
        const minutes = elapsedMs / 60000
        const wpm = Math.round((typedText.length / 5) / minutes)

        // --- Accuracy ---
        let correctChars = 0
        const compareLength = Math.min(targetText.length, typedText.length)

        for (let i = 0; i < compareLength; i++) {
            if (typedText[i] === targetText[i]) {
                correctChars++
            }
        }

        const accuracy = Math.round(
            (correctChars / typedText.length) * 100
        )

        return { wpm, accuracy }
    }, [targetText, typedText, elapsedMs])
}
