import { createClient } from "@/lib/supabase/server"
import { signOut } from "@/app/[locale]/auth/sign-out/action"
import Link from "next/link"

interface HeaderProps {
    locale: string;
}

export default async function Header({ locale }: HeaderProps) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    return (
        <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <Link 
                            href={`/${locale}`}
                            className="text-xl font-semibold text-black dark:text-zinc-50 hover:opacity-80 transition-opacity"
                        >
                            cloudtyping.com
                        </Link>
                    </div>
                    
                    <nav className="flex items-center gap-3 sm:gap-4 flex-wrap justify-end">
                        {user ? (
                            <>
                                <span className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 hidden sm:inline">
                                    Logged in as <span className="font-medium text-black dark:text-zinc-50">{user.email}</span>
                                </span>
                                <span className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 sm:hidden">
                                    <span className="font-medium text-black dark:text-zinc-50">✓</span>
                                </span>
                
                                <form action={signOut} className="inline">
                                    <input type="hidden" name="locale" value={locale} />
                                    <button
                                        type="submit"
                                        className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors"
                                    >
                                        Sign Out
                                    </button>
                                </form>
                            </>
                        ) : (
                            <>
                                <span className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 hidden sm:inline">
                                    Not logged in
                                </span>
                                <Link
                                    href={`/${locale}/auth/login`}
                                    className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    href={`/${locale}/auth/register`}
                                    className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    )
}

