"use client";

import { useEffect, useTransition, type FormEvent } from "react";
import { setLang } from "@/app/actions";
import type { Lang } from "@/lib/i18n";

const FADE_MS = 200;

// Without JavaScript this is a plain form posting to the server action. With it, the page fades
// out, the language (and text direction) flips while it's hidden, and the page fades back in.
export default function LangToggle({ lang, label, text }: { lang: Lang; label: string; text: string }) {
  const [, startTransition] = useTransition();
  const target = lang === "ar" ? "en" : "ar";

  // The new language has rendered: fade back in.
  useEffect(() => {
    document.documentElement.classList.remove("lang-switching");
  }, [lang]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const root = document.documentElement;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced) root.classList.add("lang-switching");
    // Never leave the page hidden if the request fails.
    const failsafe = setTimeout(() => root.classList.remove("lang-switching"), 5000);
    setTimeout(
      () =>
        startTransition(async () => {
          await setLang(data);
          clearTimeout(failsafe);
        }),
      reduced ? 0 : FADE_MS,
    );
  };

  return (
    <form action={setLang} onSubmit={onSubmit}>
      <input type="hidden" name="lang" value={target} />
      <button
        type="submit"
        title={label}
        aria-label={label}
        lang={target}
        className="h-8 rounded-[var(--radius)] border border-[var(--border)] px-2.5 text-[13px] text-[var(--text)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-raised)]"
      >
        {text}
      </button>
    </form>
  );
}
