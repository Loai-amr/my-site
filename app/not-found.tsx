import type { Metadata } from "next";
import Link from "next/link";
import MissingPath from "@/components/MissingPath";
import { getDict } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getDict();
  return { title: t.notFound.metaTitle, robots: { index: false } };
}

export default async function NotFound() {
  const { t } = await getDict();
  const nf = t.notFound;
  return (
    <main className="mx-auto max-w-[1080px] px-6 py-20 md:py-28">
      <div className="grid items-center gap-12 md:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="eyebrow font-mono">{nf.eyebrow}</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl md:leading-[1.1]">{nf.title}</h1>
          <p className="mt-4 max-w-xl text-[15px] text-[var(--text-muted)] md:text-base">{nf.lead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/" className="btn-primary">
              {nf.home}
            </Link>
            <Link href="/blog" className="btn-ghost">
              {nf.blog}
            </Link>
            <Link href="/#contact" className="btn-ghost">
              {nf.contact}
            </Link>
          </div>
        </div>

        {/* A tiny "terminal" diagnosing the missing route; always LTR, like real output. */}
        <div className="calc-terminal overflow-x-auto" dir="ltr" lang="en" aria-hidden>
          <div className="text-[var(--text-dim)]">{nf.termComment}</div>
          <div className="mt-2">
            <span className="prompt">$</span> curl -I loaiamr.com
            <MissingPath />
          </div>
          <div className="term-out text-[var(--accent-red)]">{nf.termStatus}</div>
          <div className="mt-2">
            <span className="prompt">$</span> git log --oneline -- <MissingPath />
          </div>
          <div className="term-out">fatal: ambiguous argument: unknown revision or path</div>
          <div className="mt-2">
            <span className="prompt">$</span> loai --explain 404
          </div>
          <div className="term-out">{nf.termCause}</div>
          <div className="term-out ok">{nf.termFix}</div>
          <div className="mt-2">
            <span className="prompt">$</span> <span className="inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-[var(--text-muted)]" />
          </div>
        </div>
      </div>
    </main>
  );
}
