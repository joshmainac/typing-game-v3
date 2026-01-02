"use client"

import { useState } from "react"
import Link from "next/link"
import type { Mode } from "@/lib/text/getTextDict"

interface ModeDropdownProps {
    currentMode: Mode
    gameType: "time-base" | "count-base" | "manual-end"
    locale: string
}

export default function ModeDropdown({
    currentMode,
    gameType,
    locale,
}: ModeDropdownProps) {
    const [isOpen, setIsOpen] = useState(false)

    const modes: { value: Mode; label: string }[] = [
        { value: "easy", label: "Easy" },
        { value: "mid", label: "Mid" },
        { value: "hard", label: "Hard" },
    ]

    const currentLabel = modes.find((m) => m.value === currentMode)?.label || "Easy"

    return (
        <div className="relative inline-block">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-lg text-gray-600 dark:text-gray-400 font-medium flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
                {currentLabel}
                <svg
                    className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>
            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute top-full left-0 mt-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg z-20 min-w-[150px]">
                        {modes.map((mode) => (
                            <Link
                                key={mode.value}
                                href={`/${locale}/game/${gameType}/${mode.value}`}
                                className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                                    mode.value === currentMode
                                        ? "bg-blue-50 dark:bg-blue-900/20 font-semibold"
                                        : ""
                                }`}
                                onClick={() => setIsOpen(false)}
                            >
                                {mode.label}
                            </Link>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

