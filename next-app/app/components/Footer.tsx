import Link from "next/link";

const FOOTER_LINKS = [
  { href: "/info/privacy-policy", label: "Privacy Policy" },
  { href: "/info/terms-service", label: "Terms of Service" },
] as const;

interface FooterProps {
  locale: string;
}

export default function Footer({ locale }: FooterProps) {
  return (
    <footer className="w-full border-t border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
          <div className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
            © {new Date().getFullYear()} cloudtyping.com. All rights reserved.
          </div>
          <nav className="flex items-center gap-4">
            {FOOTER_LINKS.map((link, index) => (
              <>
                {index > 0 && (
                  <span className="h-3 w-px bg-zinc-300 dark:bg-zinc-700" aria-hidden="true" />
                )}
                <Link
                  key={link.href}
                  href={`/${locale}${link.href}`}
                  className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors font-medium"
                >
                  {link.label}
                </Link>
              </>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}

