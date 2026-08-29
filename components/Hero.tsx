import Image from "next/image";
import { heroKeywords, profile } from "@/lib/content";

export default function Hero() {
  return (
    <header className="border-b border-[var(--border)]">
      <div className="mx-auto grid max-w-[1080px] grid-cols-1 items-center gap-12 px-6 py-16 md:grid-cols-[280px_1fr] md:py-24">
        <div className="flex flex-col items-center gap-4 md:items-start">
          <div className="h-56 w-56 overflow-hidden rounded-2xl border border-[var(--border)] shadow-sm">
            <Image
              src="/profile.jpg"
              alt={profile.name}
              width={224}
              height={224}
              priority
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-raised)] px-3 py-1.5 font-mono text-[13px] text-[var(--text-muted)]">
            <span className="h-2 w-2 rounded-full bg-[var(--accent-green)]" />
            {profile.location} · open to new roles
          </div>
        </div>

        <div>
          <p className="eyebrow">
            {profile.title} · {profile.tagline}
          </p>
          <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
            Frontend interfaces that are <span className="text-[var(--accent-green)]">fast</span>,{" "}
            <span className="text-[var(--accent-blue)]">tested</span>, and built to scale.
          </h1>
          <p className="mt-5 max-w-xl text-[15px] text-[var(--text-muted)]">
            4+ years building responsive, high-performance web applications with React and
            Next.js. Expert in component architecture, state management, performance
            optimization, and modern CSS — currently leading frontend architecture for a B2B
            eCommerce platform.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {heroKeywords.map((kw) => (
              <span key={kw} className="kw-pill">
                {kw}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contact" className="btn-primary">
              Get in touch →
            </a>
            <a href="#work" className="btn-ghost">
              See my experience
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
