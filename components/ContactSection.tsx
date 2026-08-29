import { profile } from "@/lib/content";

export default function ContactSection() {
  return (
    <section id="contact" className="mx-auto max-w-[1080px] px-6 py-20">
      <div className="mb-8">
        <p className="eyebrow">Get in touch</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight">
          Building a React or Next.js product?
        </h2>
        <p className="mt-3 max-w-xl text-[15px] text-[var(--text-muted)]">
          Open to senior frontend roles and React/Next.js projects — component architecture,
          performance, and clean TypeScript.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <a href={`mailto:${profile.email}`} className="btn-primary">
          {profile.email}
        </a>
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn-ghost">
          linkedin
        </a>
        <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn-ghost">
          github
        </a>
        <a href={profile.resumeHref} target="_blank" rel="noopener noreferrer" className="btn-ghost">
          résumé.pdf
        </a>
      </div>
    </section>
  );
}
