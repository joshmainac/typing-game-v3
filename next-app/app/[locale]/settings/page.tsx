'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useState, useTransition, useEffect } from 'react'

const LOCALES = [
    { code: "en", name: "English" },
    { code: "ja", name: "日本語 (Japanese)" },
    { code: "fr", name: "Français (French)" },
    { code: "es", name: "Español (Spanish)" },
    { code: "de", name: "Deutsch (German)" },
    { code: "it", name: "Italiano (Italian)" },
    { code: "pt", name: "Português (Portuguese)" },
    { code: "ko", name: "한국어 (Korean)" },
    { code: "zh", name: "中文 (Chinese)" },
    { code: "zh-TW", name: "繁體中文 (Traditional Chinese)" },
    { code: "ru", name: "Русский (Russian)" },
] as const

export default function SettingsPage() {
    const router = useRouter()
    const pathname = usePathname()
    const [isPending, startTransition] = useTransition()
    const [currentLocale, setCurrentLocale] = useState<string>('en')

    // Extract current locale from pathname
    useEffect(() => {
        const localeMatch = pathname?.match(/^\/([^\/]+)/)
        if (localeMatch) {
            setCurrentLocale(localeMatch[1])
        }
    }, [pathname])

    const handleLocaleChange = (newLocale: string) => {
        if (newLocale === currentLocale) return

        startTransition(() => {
            // Replace the locale in the current path
            const newPath = pathname?.replace(/^\/[^\/]+/, `/${newLocale}`) || `/${newLocale}`
            router.push(newPath)
        })
    }

    return (
        <main className="mx-auto max-w-2xl px-6 py-12">
            <h1 className="text-2xl font-bold mb-6">Settings</h1>

            <div className="mb-8">
                <h2 className="text-lg font-semibold mt-6 mb-4">
                    Language
                </h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                    Select your preferred language. The interface will update to your chosen language.
                </p>
                <select
                    value={currentLocale}
                    onChange={(e) => handleLocaleChange(e.target.value)}
                    disabled={isPending}
                    className="w-full sm:w-auto min-w-[200px] px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {LOCALES.map((locale) => (
                        <option key={locale.code} value={locale.code}>
                            {locale.name}
                        </option>
                    ))}
                </select>
                {isPending && (
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
                        Changing language...
                    </p>
                )}
            </div>
        </main>
    )
}

