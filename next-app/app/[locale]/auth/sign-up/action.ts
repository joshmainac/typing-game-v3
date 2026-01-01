'use server'

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function signUp(formData: FormData) {
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string
    const locale = (formData.get("locale") as string) || "en"
    const errorRedirect = (formData.get("errorRedirect") as string) || `/${locale}/auth/sign-up`
    
    if (password !== confirmPassword) {
        redirect(`${errorRedirect}?error=${encodeURIComponent("Passwords do not match")}`)
    }
    
    const supabase = await createClient()
    const { error } = await supabase.auth.signUp({
        email,
        password,
    })
    
    if (error) {
        redirect(`${errorRedirect}?error=${encodeURIComponent(error.message)}`)
    }
    
    redirect(`/${locale}`)
}

