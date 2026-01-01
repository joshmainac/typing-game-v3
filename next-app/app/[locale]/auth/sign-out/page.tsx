import { signOut } from "./action"

export default function SignOut() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black px-8">
            <div className="w-full max-w-md">
                <h1 className="text-3xl font-semibold text-black dark:text-zinc-50 mb-2 text-center">
                    Sign Out
                </h1>
                <p className="text-zinc-600 dark:text-zinc-400 mb-8 text-center">
                    Are you sure you want to sign out?
                </p>
                
                <form action={signOut} className="flex flex-col gap-4">
                    <button
                        type="submit"
                        className="w-full flex h-12 items-center justify-center rounded-full bg-foreground px-8 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium"
                    >
                        Sign Out
                    </button>
                </form>
                
                <div className="mt-6 text-center">
                    <a
                        href="/"
                        className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors"
                    >
                        Cancel
                    </a>
                </div>
            </div>
        </div>
    )
}

