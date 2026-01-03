import { signInWithGoogle } from "../../login/action"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function GoogleOAuthPage({
    params,
    searchParams,
}: {
    params: Promise<{ locale: string }>
    searchParams: Promise<{ error?: string; code?: string }>
}) {
    const { locale } = await params
    const searchParamsResolved = await searchParams
    const supabase = await createClient()
    
    // Check if user is already logged in
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
        redirect(`/${locale}`)
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black px-8">
            <div className="w-full max-w-md">
                <h1 className="text-3xl font-semibold text-black dark:text-zinc-50 mb-2 text-center">
                    Sign in with Google
                </h1>
                <p className="text-zinc-600 dark:text-zinc-400 mb-8 text-center">
                    Continue with your Google account
                </p>
                
                {searchParamsResolved.error && (
                    <div className="mb-4 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                        <p className="text-sm text-red-800 dark:text-red-200 text-center">
                            {searchParamsResolved.error}
                        </p>
                    </div>
                )}
                
                <form action={signInWithGoogle} className="flex flex-col gap-4">
                    <input type="hidden" name="locale" value={locale} />
                    <button
                        type="submit"
                        className="w-full flex h-12 items-center justify-center rounded-full bg-foreground px-8 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium"
                    >
                        Continue with Google
                    </button>
                </form>
                
                <div className="mt-6 text-center">
                    <Link
                        href={`/${locale}/auth/login`}
                        className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors"
                    >
                        Back to Sign In
                    </Link>
                </div>
            </div>
        </div>
    )
}