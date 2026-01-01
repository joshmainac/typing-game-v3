'use server'

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function signIn(formData: FormData) {
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const locale = (formData.get("locale") as string) || "en"
    const errorRedirect = (formData.get("errorRedirect") as string) || `/${locale}/auth/sign-in`
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