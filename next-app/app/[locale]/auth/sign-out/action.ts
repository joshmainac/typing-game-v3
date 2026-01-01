'use server'

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function signOut(formData: FormData) {
    const locale = (formData.get("locale") as string) || "en"
    const supabase = await createClient()
    const { error } = await supabase.auth.signOut()
    
    if (error) {
        redirect(`/${locale}/auth/sign-out?error=${encodeURIComponent(error.message)}`)
    }
    
    redirect(`/${locale}/auth/login`)
}

