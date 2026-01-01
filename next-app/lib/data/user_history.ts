import { createClient } from "@/lib/supabase/server"
import { UserHistory } from "@/lib/types/user_history"

export async function getHistory(): Promise<UserHistory[]> {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from("user_history")
        .select("*")
        .order("created_at", { ascending: false })

    if (error) {
        throw error
    }

    return (data ?? []) as UserHistory[]
}

export async function getHistoryByUserId(userId: string): Promise<UserHistory[]> {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from("user_history")
        .select("*")
        .eq("id", userId)
        .order("created_at", { ascending: false })


    if (error) {
        throw error
    }

    return (data ?? []) as UserHistory[]
}
