"use client"

import { useState } from "react"
import Link from "next/link"

interface GameTypeDropdownProps {
    currentType: "time-base" | "count-base" | "manual-end"
    mode: string
    locale: string
}

export default function GameTypeDropdown({
    currentType,
    mode,
    locale,
}: GameTypeDropdownProps) {
    const [isOpen, setIsOpen] = useState(false)

    const gameTypes = [
        { value: "time-base", label: "Time Base" },
        { value: "count-base", label: "Count Base" },
        { value: "manual-end", label: "Manual End" },
    ]

    const currentLabel = gameTypes.find((t) => t.value === currentType)?.label || "Time Base"

    return (
        <div className="relative inline-block">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-3xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
                {currentLabel}
                <svg
                    className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
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
                    <div className="absolute top-full left-0 mt-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg z-20 min-w-[200px]">
                        {gameTypes.map((type) => (
                            <Link
                                key={type.value}
                                href={`/${locale}/game/${type.value}/${mode}`}
                                className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                                    type.value === currentType
                                        ? "bg-blue-50 dark:bg-blue-900/20 font-semibold"
                                        : ""
                                }`}
                                onClick={() => setIsOpen(false)}
                            >
                                {type.label}
                            </Link>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

