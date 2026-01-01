import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const LOCALES = ["en", "ja", "fr", "es", "de", "it", "pt", "ko", "zh", "zh-TW", "ru"]
const DEFAULT_LOCALE = "en"

export async function GET(request: NextRequest) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    const next = searchParams.get('next') ?? '/'
    
    // Extract locale from next parameter or default to en
    let locale = DEFAULT_LOCALE
    const nextPath = next.startsWith('/') ? next : `/${next}`
    const localeMatch = nextPath.match(/^\/([^\/]+)/)
    if (localeMatch && LOCALES.includes(localeMatch[1])) {
        locale = localeMatch[1]
    }
    
    if (code) {
        let supabaseResponse = NextResponse.next({
            request,
        })
        
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
            {
                cookies: {
                    getAll() {
                        return request.cookies.getAll()
                    },
                    setAll(cookiesToSet) {
                        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
                        supabaseResponse = NextResponse.next({
                            request,
                        })
                        cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
                    },
                },
            }
        )
        
        const { error } = await supabase.auth.exchangeCodeForSession(code)
        
        if (!error) {
            const forwardedHost = request.headers.get('x-forwarded-host')
            const isLocalEnv = process.env.NODE_ENV === 'development'
            
            let redirectUrl: string
            if (isLocalEnv) {
                redirectUrl = `${origin}${next}`
            } else if (forwardedHost) {
                redirectUrl = `https://${forwardedHost}${next}`
            } else {
                redirectUrl = `${origin}${next}`
            }
            
            // Create redirect response using the supabaseResponse which already has cookies set
            const redirectResponse = NextResponse.redirect(redirectUrl)
            
            // Copy all cookies from supabaseResponse to redirectResponse
            supabaseResponse.cookies.getAll().forEach((cookie) => {
                redirectResponse.cookies.set(cookie.name, cookie.value, {
                    path: cookie.path,
                    domain: cookie.domain,
                    maxAge: cookie.maxAge,
                    expires: cookie.expires,
                    httpOnly: cookie.httpOnly,
                    secure: cookie.secure,
                    sameSite: cookie.sameSite as 'strict' | 'lax' | 'none' | undefined,
                })
            })
            
            return redirectResponse
        }
    }
    
    // return the user to an error page with instructions
    return NextResponse.redirect(`${origin}/${locale}/auth/login?error=${encodeURIComponent('Could not authenticate user')}`)
}

