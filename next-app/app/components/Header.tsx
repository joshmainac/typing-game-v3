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
        <header className="sticky top-0 z-50 w-full border-none border-zinc-200 dark:border-zinc-800 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 sm:px-0 lg:px-0">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <div className="relative group">
                            <Link 
                                href={`/${locale}`}
                                className="text-xl font-semibold text-black dark:text-zinc-50 hover:opacity-80 transition-opacity"
                            >
                                cloudtyping.com
                            </Link>
                            {/* Popup on hover */}
                            <div className="absolute left-0 top-full mt-2 w-80 p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none">
                                <h3 className="text-lg font-semibold text-black dark:text-zinc-50 mb-2">
                                    About cloudtyping.com
                                </h3>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                    A cloud-based typing and notes application. Create, store, and manage your notes securely in the cloud. Access your notes from anywhere, anytime.
                                </p>
                                <div className="mt-3 pt-3 border-t border-zinc-200 dark:border-zinc-800">
                                    <p className="text-xs text-zinc-500 dark:text-zinc-500">
                                        Practice your typing skills with various game modes and track your progress.
                                    </p>
                                </div>
                                {/* Arrow pointing up */}
                                <div className="absolute -top-2 left-6 w-4 h-4 bg-white dark:bg-zinc-900 border-l border-t border-zinc-200 dark:border-zinc-800 rotate-45"></div>
                            </div>
                        </div>
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

