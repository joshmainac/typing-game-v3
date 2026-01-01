"use client"

import { useEffect, useState } from "react"

export function useCountdownTimer(
    startTime: number | null,
    timeLimitMs: number
) {
    const [remainingMs, setRemainingMs] = useState(timeLimitMs)
    const [elapsedMs, setElapsedMs] = useState(0)

    useEffect(() => {
        if (startTime === null) {
            setRemainingMs(timeLimitMs)
            setElapsedMs(0)
            return
        }

        const interval = setInterval(() => {
            // const actualElapsed = Date.now() - startTime
            // const elapsed = Math.min(actualElapsed, timeLimitMs)
            const elapsed = Date.now() - startTime
            const remaining = Math.max(0, timeLimitMs - elapsed)

            setElapsedMs(elapsed)
            setRemainingMs(remaining)

            if (remaining === 0) {
                clearInterval(interval)
            }
        }, 100)

        return () => clearInterval(interval)
    }, [startTime, timeLimitMs])

    return { remainingMs, elapsedMs }
}
