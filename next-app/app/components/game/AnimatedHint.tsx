"use client"

import { useEffect, useState } from "react"

const messages = [
    "Start typing to begin...",
    "Earn experience as you type",
    "Challenge yourself to improve",
    "Focus on accuracy and speed",
    "Build your typing skills",
    "Every word counts",
    "Practice makes perfect",
    "Type with confidence",
    "Push your limits",
    "Let's get started!"
]

interface AnimatedHintProps {
    className?: string
}

export default function AnimatedHint({ className = "" }: AnimatedHintProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        const interval = setInterval(() => {
            // Fade out
            setIsVisible(false)
            
            // After fade out, change message and fade in
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % messages.length)
                setIsVisible(true)
            }, 300) // Half of transition duration
        }, 18000) // Change message every 3 seconds

        return () => clearInterval(interval)
    }, [])

    return (
        <div className={`mt-4 text-center text-sm text-gray-500 dark:text-gray-400 ${className}`}>
            <span
                className="inline-block"
                style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(-10px)',
                    transition: 'opacity 600ms cubic-bezier(0.4, 0, 0.2, 1), transform 600ms cubic-bezier(0.4, 0, 0.2, 1)'
                }}
            >
                {messages[currentIndex]}
            </span>
        </div>
    )
}

