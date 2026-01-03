import Footer from "../components/Footer";
import QuickLinks from "../components/QuickLinks";
import AnimatedHint from "../components/game/AnimatedHint";
import Link from "next/link";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-50 via-zinc-100 to-zinc-50 font-sans dark:from-black dark:via-zinc-950 dark:to-black relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-zinc-200 dark:bg-zinc-900 rounded-full blur-3xl opacity-20"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-zinc-200 dark:bg-zinc-900 rounded-full blur-3xl opacity-20"></div>
        </div>
        
        <main className="flex flex-col items-center gap-8 text-center px-8 max-w-md w-full py-16 relative z-10">
          {/* Welcome message / Tagline */}
          <p className="text-lg font-medium text-zinc-600 dark:text-zinc-400">
            Start playing and improve your typing skills
          </p>
          
          {/* Animated Hint */}
          <AnimatedHint className="mb-2" />
          
          {/* Visual separator/icon area - Focus point */}
          <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-black to-zinc-800 dark:from-zinc-50 dark:to-zinc-200 flex items-center justify-center shadow-2xl ring-4 ring-zinc-300/50 dark:ring-zinc-700/50 ring-offset-4 ring-offset-zinc-50 dark:ring-offset-black animate-pulse-slow mb-2">
            <div className="text-5xl">⌨️</div>
          </div>
          
          <div className="flex flex-col gap-4 w-full">
            <Link
              href={`/${locale}/game/time-base/easy`}
              className="px-8 py-4 bg-black dark:bg-zinc-50 text-white dark:text-black font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 w-full text-center"
            >
              Play Now
            </Link>
            <Link
              href={`/${locale}/info/how-to-play`}
              className="px-8 py-4 bg-zinc-200 dark:bg-zinc-800 text-black dark:text-zinc-50 font-semibold rounded-xl hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 w-full text-center"
            >
              How to Play
            </Link>
            <Link
              href={`/${locale}/settings`}
              className="px-8 py-4 bg-zinc-200 dark:bg-zinc-800 text-black dark:text-zinc-50 font-semibold rounded-xl hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 w-full text-center"
            >
              Settings
            </Link>
          </div>

          <QuickLinks locale={locale} />
        </main>
      </div>
      <Footer locale={locale} />
    </>
  );
}
