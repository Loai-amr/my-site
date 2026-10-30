// Shared Tailwind classes for the admin pages.
export const btn =
  "inline-flex h-9 items-center rounded-[var(--radius)] border border-[var(--border)] px-3 text-sm font-medium text-[var(--text)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-raised)]";
export const btnPrimary =
  "inline-flex h-9 items-center rounded-[var(--radius)] bg-[var(--accent-blue)] px-3 text-sm font-semibold text-[var(--on-accent)] hover:bg-[var(--accent-blue)]/90";
export const btnDanger = `${btn} !text-[var(--accent-red)] !border-[var(--accent-red)]/40`;
export const input =
  "w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--bg-card)] px-3 py-2.5 text-base text-[var(--text)] outline-none focus:border-[var(--accent-blue)] focus:ring-2 focus:ring-[var(--accent-blue)]/20";
export const label = "text-sm font-semibold";
export const hint = "text-[13px] text-[var(--text-dim)]";
export const flashBox = "rounded-[var(--radius)] border border-[var(--accent-blue)]/30 bg-[var(--accent-blue)]/10 px-4 py-3 text-sm";
export const errorBox = "rounded-[var(--radius)] border border-[var(--accent-red)]/30 bg-[var(--accent-red)]/10 px-4 py-3 text-sm text-[var(--accent-red)]";
export const badge = (status: string) =>
  `rounded-full px-2.5 py-0.5 text-xs font-semibold ${
    status === "published" ? "bg-[var(--accent-green)]/15 text-[var(--accent-green)]" : "bg-[var(--accent-yellow)]/15 text-[var(--accent-yellow)]"
  }`;
export const fmt = (iso: string | null) =>
  iso ? new Date(iso).toLocaleString("en-GB", { timeZone: "Africa/Cairo", dateStyle: "medium", timeStyle: "short" }) : "—";
