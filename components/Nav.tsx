import Link from "next/link";
import { profile } from "@/lib/content";

export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1080px] items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="font-mono text-lg font-semibold text-[var(--text)]">
          loai<span className="text-[var(--accent-blue)]">_</span>
        </Link>
        <div className="flex items-center gap-5 font-mono text-sm text-[var(--text-muted)]">
          <Link href="/#work" className="hidden hover:text-[var(--text)] sm:inline">
            work
          </Link>
          <Link href="/#stack" className="hidden hover:text-[var(--text)] sm:inline">
            stack
          </Link>
          <Link href="/#contact" className="hidden hover:text-[var(--text)] sm:inline">
            contact
          </Link>
          <Link href="/other-work" className="hidden hover:text-[var(--accent-blue)] md:inline">
            shopify &amp; wordpress work →
          </Link>
          <a
            href={profile.resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-[var(--radius)] border border-[var(--border)] px-3 py-1.5 text-[var(--text)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-raised)]"
          >
            résumé.pdf
          </a>
        </div>
      </div>
    </nav>
  );
}
