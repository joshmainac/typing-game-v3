'use server'

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { headers } from "next/headers"

export async function signIn(formData: FormData) {
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const locale = (formData.get("locale") as string) || "en"
    const errorRedirect = (formData.get("errorRedirect") as string) || `/${locale}/auth/login`
    const supabase = await createClient()
    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })
    
    if (error) {
        redirect(`${errorRedirect}?error=${encodeURIComponent(error.message)}`)
    }
    
    redirect(`/${locale}`)
}

export async function signInWithGoogle(formData: FormData) {
    const locale = (formData.get("locale") as string) || "en"
    const supabase = await createClient()
    
    // Get the origin URL for the redirect
    const headersList = await headers()
    const origin = headersList.get("origin") || headersList.get("host")
    const protocol = headersList.get("x-forwarded-proto") || "http"
    const baseUrl = origin?.startsWith("http") ? origin : `${protocol}://${origin}`
    
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${baseUrl}/api/auth/callback?next=/${locale}`,
        },
    })
    
    if (error) {
        redirect(`/${locale}/auth/login?error=${encodeURIComponent(error.message)}`)
    }
    
    if (data.url) {
        redirect(data.url)
    }
}

