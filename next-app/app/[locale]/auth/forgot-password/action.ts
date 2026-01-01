'use server'

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { headers } from "next/headers"

export async function resetPassword(formData: FormData) {
    const email = formData.get("email") as string
    const locale = (formData.get("locale") as string) || "en"
    const supabase = await createClient()
    
    // Get the origin URL for the redirect
    const headersList = await headers()
    const origin = headersList.get("origin") || headersList.get("host")
    const protocol = headersList.get("x-forwarded-proto") || "http"
    const baseUrl = origin?.startsWith("http") ? origin : `${protocol}://${origin}`
    
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${baseUrl}/${locale}/auth/update-password`,
    })
    
    // For security, always redirect with success message
    // This prevents email enumeration attacks
    if (error) {
        redirect(`/${locale}/auth/forgot-password?error=${encodeURIComponent(error.message)}`)
    }
    
    redirect(`/${locale}/auth/forgot-password?success=true`)
}

