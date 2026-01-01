import { resetPassword } from "./action"
import Link from "next/link"
import { getLoginDict } from "@/lib/i18n/getLoginDict"

type Props = {
    params: Promise<{ locale: string }>
    searchParams: Promise<{ error?: string; success?: string }> | { error?: string; success?: string }
}

export default async function ForgotPassword({ params, searchParams }: Props) {
    const { locale } = await params
    const searchParamsResolved = await Promise.resolve(searchParams)
    const error = searchParamsResolved.error
    const success = searchParamsResolved.success === "true"
    const dict = await getLoginDict(locale)

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black px-8">
            <div className="w-full max-w-md">
                <h1 className="text-3xl font-semibold text-black dark:text-zinc-50 mb-2 text-center">
                    {dict.forgotPassword}
                </h1>
                <p className="text-zinc-600 dark:text-zinc-400 mb-8 text-center">
                    {dict.forgotPasswordDescription}
                </p>
                
                {success && (
                    <div className="mb-4 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                        <p className="text-sm text-green-800 dark:text-green-200 text-center">
                            {dict.checkEmailMessage}
                        </p>
                    </div>
                )}
                
                {error && (
                    <div className="mb-4 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                        <p className="text-sm text-red-800 dark:text-red-200 text-center">
                            {error}
                        </p>
                    </div>
                )}
                
                <form action={resetPassword} className="flex flex-col gap-4">
                    <input type="hidden" name="locale" value={locale} />
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
                    
                    <button
                        type="submit"
                        className="w-full flex h-12 items-center justify-center rounded-full bg-foreground px-8 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium"
                    >
                        {dict.sendResetLink}
                    </button>
                </form>
                
                <div className="mt-6 text-center">
                    <Link
                        href={`/${locale}/auth/login`}
                        className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors"
                    >
                        {dict.backToSignIn}
                    </Link>
                </div>
            </div>
        </div>
    )
}

