"use client";

import { useSyncExternalStore } from "react";
import { THEME_KEY } from "@/lib/theme";

type Theme = "light" | "dark";

// The theme lives on <html data-theme>, set before paint by the inline script in the layout.
const readTheme = (): Theme => (document.documentElement.dataset.theme === "dark" ? "dark" : "light");

function subscribe(onChange: () => void) {
  const root = document.documentElement;
  const observer = new MutationObserver(onChange);
  observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });

  // Follow the system setting until the visitor picks a theme themselves.
  const media = matchMedia("(prefers-color-scheme: dark)");
  const onSystemChange = (e: MediaQueryListEvent) => {
    try {
      if (localStorage.getItem(THEME_KEY)) return;
    } catch {}
    root.dataset.theme = e.matches ? "dark" : "light";
  };
  media.addEventListener("change", onSystemChange);

  return () => {
    observer.disconnect();
    media.removeEventListener("change", onSystemChange);
  };
}

export default function ThemeToggle({ toLight, toDark }: { toLight: string; toDark: string }) {
  const theme = useSyncExternalStore(subscribe, readTheme, () => "light");

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const root = document.documentElement;
    const next = theme === "dark" ? "light" : "dark";
    const apply = () => {
      root.dataset.theme = next;
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch {}
    };

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return apply();

    // Browsers without View Transitions: cross-fade the colours.
    if (!document.startViewTransition) {
      root.classList.add("theme-fading");
      apply();
      setTimeout(() => root.classList.remove("theme-fading"), 400);
      return;
    }

    // The new theme grows as a circle from the button until it covers the page.
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    document.startViewTransition(apply).ready.then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 500, easing: "cubic-bezier(0.4, 0, 0.2, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    });
  };

  const label = theme === "dark" ? toLight : toDark;
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="grid h-8 w-8 shrink-0 place-items-center rounded-[var(--radius)] border border-[var(--border)] text-[var(--text)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-raised)]"
    >
      {/* Both icons are rendered; CSS shows the right one, so there's no flash before hydration. */}
      <svg aria-hidden viewBox="0 0 24 24" className="theme-icon-moon h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>
      <svg aria-hidden viewBox="0 0 24 24" className="theme-icon-sun h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>
    </button>
  );
}
