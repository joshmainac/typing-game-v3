'use server'

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function updatePassword(formData: FormData) {
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string
    const locale = (formData.get("locale") as string) || "en"
    
    if (password !== confirmPassword) {
        redirect(`/${locale}/auth/update-password?error=${encodeURIComponent("Passwords do not match")}`)
    }
    
    if (password.length < 6) {
        redirect(`/${locale}/auth/update-password?error=${encodeURIComponent("Password must be at least 6 characters")}`)
    }
    
    const supabase = await createClient()
    
    // Check if user has a valid session (recovery session)
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
        redirect(`/${locale}/auth/update-password?error=${encodeURIComponent("No valid reset token found. Please request a new password reset.")}`)
    }
    
    const { error } = await supabase.auth.updateUser({
        password: password
    })
    
    if (error) {
        redirect(`/${locale}/auth/update-password?error=${encodeURIComponent(error.message)}`)
    }
    
    redirect(`/${locale}/auth/login?success=true`)
}

