import { signIn } from "./action"
import Link from "next/link"
import { getLoginDict } from "@/lib/i18n/getLoginDict"

export default async function SignIn({
    params,
}: {
    params: Promise<{ locale: string }>
}) {
    const { locale } = await params
    const dict = await getLoginDict(locale)
    
    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black px-8">
            <div className="w-full max-w-md">
                <h1 className="text-3xl font-semibold text-black dark:text-zinc-50 mb-2 text-center">
                    {dict.signIn}
                </h1>
                <p className="text-zinc-600 dark:text-zinc-400 mb-8 text-center">
                    {dict.signInDescription}
                </p>
                
                <form action={signIn} className="flex flex-col gap-4">
                    <input type="hidden" name="locale" value={locale} />
                    <input type="hidden" name="errorRedirect" value={`/${locale}/auth/sign-in`} />
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-sm font-medium text-black dark:text-zinc-50">
                            {dict.email}
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder={dict.emailPlaceholder}
                            required
                            className="w-full h-12 px-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-black dark:text-zinc-50 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-zinc-50 transition-colors"
                        />
                    </div>
                    
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="text-sm font-medium text-black dark:text-zinc-50">
                            {dict.password}
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder={dict.passwordPlaceholder}
                            required
                            className="w-full h-12 px-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-black dark:text-zinc-50 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-zinc-50 transition-colors"
                        />
                    </div>
                    
                    <button
                        type="submit"
                        className="w-full flex h-12 items-center justify-center rounded-full bg-foreground px-8 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium"
                    >
                        {dict.signInButton}
                    </button>
                </form>
                
                <div className="mt-6 text-center">
                    <Link
                        href={`/${locale}/auth/sign-up`}
                        className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors"
                    >
                        {dict.dontHaveAccount}
                    </Link>
                </div>
            </div>
        </div>
    )
}