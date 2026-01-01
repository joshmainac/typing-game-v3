import Link from "next/link";

const QUICK_LINKS = [
  { href: "/notes", label: "Notes" },
  { href: "/auth/session", label: "Session" },
  { href: "/instruments", label: "Instruments" },
  { href: "/history", label: "History" },
  { href: "/auth/login", label: "Login" },
  { href: "/auth/register", label: "Register" },
  { href: "/auth/sign-out", label: "Sign Out" },
  { href: "/auth/forgot-password", label: "Forgot Password" },
  { href: "/auth/update-password", label: "Update Password" },
] as const;

interface QuickLinksProps {
  locale: string;
}

export default function QuickLinks({ locale }: QuickLinksProps) {
  return (
    <div className="border-t border-zinc-200 dark:border-zinc-800 pt-6 mt-8 w-full">
      <h2 className="text-lg font-medium text-black dark:text-zinc-50 mb-4">
        Quick Links
      </h2>
      <div className="flex flex-wrap gap-4 justify-center">
        {QUICK_LINKS.map((link) => (
          <Link
            key={link.href}
            href={`/${locale}${link.href}`}
            className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

