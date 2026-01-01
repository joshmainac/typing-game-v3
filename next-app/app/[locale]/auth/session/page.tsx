import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { signOut } from "../sign-out/action"

export default async function SessionPage({
    params,
}: {
    params: Promise<{ locale: string }>
}) {
    const { locale } = await params
    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black px-8">
                <div className="w-full max-w-md">
                    <h1 className="text-3xl font-semibold text-black dark:text-zinc-50 mb-2 text-center">
                        Session
                    </h1>
                    <p className="text-zinc-600 dark:text-zinc-400 mb-8 text-center">
                        ❌ Not logged in
                    </p>
                    
                    {error && (
                        <div className="mb-4 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                            <p className="text-sm text-red-800 dark:text-red-200 text-center">
                                {error.message}
                            </p>
                        </div>
                    )}
                    
                    <div className="mt-6 text-center">
                        <Link
                            href={`/${locale}/auth/login`}
                            className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black px-8">
            <div className="w-full max-w-md">
                <h1 className="text-3xl font-semibold text-black dark:text-zinc-50 mb-2 text-center">
                    Session
                </h1>
                <p className="text-zinc-600 dark:text-zinc-400 mb-8 text-center">
                    ✅ Logged in
                </p>
                
                <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 mb-4">
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                                Email
                            </label>
                            <p className="text-black dark:text-zinc-50 mt-1">
                                {user.email}
                            </p>
                        </div>
                        
                        <div>
                            <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                                User ID
                            </label>
                            <p className="text-black dark:text-zinc-50 mt-1 font-mono text-xs break-all">
                                {user.id}
                            </p>
                        </div>
                        
                        {user.created_at && (
                            <div>
                                <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                                    Created At
                                </label>
                                <p className="text-black dark:text-zinc-50 mt-1">
                                    {new Date(user.created_at).toLocaleString()}
                                </p>
                            </div>
                        )}
                        
                        {user.last_sign_in_at && (
                            <div>
                                <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                                    Last Sign In
                                </label>
                                <p className="text-black dark:text-zinc-50 mt-1">
                                    {new Date(user.last_sign_in_at).toLocaleString()}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                
                <div className="flex flex-col gap-4">
                    <form action={async (formData: FormData) => {
                        formData.set('locale', locale)
                        await signOut(formData)
                    }} className="w-full">
                        <button
                            type="submit"
                            className="w-full flex h-12 items-center justify-center rounded-full bg-foreground px-8 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium"
                        >
                            Sign Out
                        </button>
                    </form>
                </div>
                
                <div className="mt-6 text-center">
                    <Link
                        href={`/${locale}`}
                        className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    )
}

