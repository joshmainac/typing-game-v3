import { NextRequest, NextResponse } from "next/server"

const LOCALES = [
    "en", // English
    "ja", // Japanese
    "fr", // French
    "es", // Spanish
    "de", // German
    "it", // Italian
    "pt", // Portuguese
    "ko", // Korean
    "zh", // Chinese
    "zh-TW", // Traditional Chinese
    "ru", // Russian
]

const DEFAULT_LOCALE = "en"

export default function middleware(req: NextRequest) {
    console.log("MIDDLEWARE HIT:", req.nextUrl.pathname)

    const { pathname } = req.nextUrl
    // 1. Ignore Next.js internals
    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/api") ||
        pathname.includes(".")
    ) {
        return NextResponse.next()
    }

    // 2. Root → /en
    if (pathname === "/") {
        return NextResponse.redirect(
            new URL(`/${DEFAULT_LOCALE}`, req.url)
        )
    }

    // 3. Check if URL already has locale
    const hasLocale = LOCALES.some(
        (locale) =>
            pathname === `/${locale}` ||
            pathname.startsWith(`/${locale}/`)
    )
    if (hasLocale) {
        return NextResponse.next()
    }

    // 4. Missing locale → prepend default
    return NextResponse.redirect(
        new URL(`/${DEFAULT_LOCALE}${pathname}`, req.url)
    )
}