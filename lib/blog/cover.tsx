import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { common, createLowlight } from "lowlight";
import { readingMinutes } from "@/lib/blog/posts";
import { formatPostDate, type Post } from "@/lib/blog/types";

// Generated 1200×630 cover for posts without their own cover_image: title, tags and a
// syntax-highlighted "screenshot" of the post's first code block. Posts tagged "about", or with no
// code, show the author photo instead. Rendered on request and cached by the CDN, so nothing is stored.

export const COVER_SIZE = { width: 1200, height: 630 };

const lowlight = createLowlight(common);
const MAX_LINES = 11;
const MAX_COLS = 42;

// github-dark token colours, keyed by highlight.js class.
const TOKEN_COLORS: [string[], string][] = [
  [["hljs-comment", "hljs-quote"], "#8b949e"],
  [["hljs-keyword", "hljs-selector-tag", "hljs-literal", "hljs-doctag"], "#ff7b72"],
  [["hljs-string", "hljs-regexp"], "#a5d6ff"],
  [["hljs-title", "hljs-section"], "#d2a8ff"],
  [["hljs-number", "hljs-attr", "hljs-attribute", "hljs-variable", "hljs-property", "hljs-selector-class", "hljs-selector-id"], "#79c0ff"],
  [["hljs-built_in", "hljs-type", "hljs-name", "hljs-tag"], "#7ee787"],
  [["hljs-symbol", "hljs-bullet", "hljs-meta", "hljs-link"], "#ffa657"],
];
const PLAIN = "#e6edf3";

type Token = { text: string; color: string };
type HastNode = { type: string; value?: string; properties?: { className?: string[] }; children?: HastNode[] };

function colorFor(classes: string[]): string {
  for (let i = classes.length - 1; i >= 0; i--) {
    const hit = TOKEN_COLORS.find(([names]) => names.includes(classes[i]));
    if (hit) return hit[1];
  }
  return PLAIN;
}

/** First fenced code block: its language and up to MAX_LINES lines, each cut to MAX_COLS columns. */
function firstCodeBlock(markdown: string): { lang: string; lines: Token[][] } | null {
  const match = /```([\w+-]*)[^\n]*\n([\s\S]*?)```/.exec(markdown);
  if (!match || !match[2].trim()) return null;
  const lang = match[1].toLowerCase();
  const source = match[2].replace(/\t/g, "  ").replace(/\n+$/, "").split("\n").slice(0, MAX_LINES).join("\n");

  let tree: HastNode;
  try {
    tree = (lang && lowlight.registered(lang) ? lowlight.highlight(lang, source) : lowlight.highlightAuto(source)) as HastNode;
  } catch {
    tree = { type: "root", children: [{ type: "text", value: source }] };
  }

  // Flatten the tree into coloured runs, split on newlines.
  const lines: Token[][] = [[]];
  const walk = (node: HastNode, classes: string[]) => {
    if (node.type === "text") {
      node.value!.split("\n").forEach((part, i) => {
        if (i > 0) lines.push([]);
        if (part) lines[lines.length - 1].push({ text: part, color: colorFor(classes) });
      });
      return;
    }
    const next = [...classes, ...(node.properties?.className ?? [])];
    for (const child of node.children ?? []) walk(child, next);
  };
  walk(tree, []);

  // Clip long lines so the panel never overflows.
  const clipped = lines.map((line) => {
    let left = MAX_COLS;
    const out: Token[] = [];
    for (const t of line) {
      if (left <= 0) break;
      out.push(t.text.length > left ? { ...t, text: t.text.slice(0, left - 1) + "…" } : t);
      left -= t.text.length;
    }
    return out;
  });
  return { lang: lang || "code", lines: clipped };
}

/** Loads a Google Font as TTF, subset to `text`. Returns null on failure (falls back to the default font). */
async function googleFont(family: string, weight: number, text: string): Promise<ArrayBuffer | null> {
  try {
    const url = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}:wght@${weight}&text=${encodeURIComponent(text)}`;
    const css = await (await fetch(url)).text();
    const src = /src: url\((.+?)\) format\('(?:opentype|truetype)'\)/.exec(css)?.[1];
    if (!src) return null;
    const res = await fetch(src);
    return res.ok ? await res.arrayBuffer() : null;
  } catch {
    return null;
  }
}

let avatar: Promise<string> | null = null;
function avatarDataUrl() {
  avatar ??= readFile(join(process.cwd(), "public/blog/avatar.jpg")).then((b) => `data:image/jpeg;base64,${b.toString("base64")}`);
  return avatar;
}

export async function renderCover(post: Post, headers?: Record<string, string>): Promise<ImageResponse> {
  const code = post.tags.includes("about") ? null : firstCodeBlock(post.content);
  const meta = [post.published_at ? formatPostDate(post.published_at) : null, `${readingMinutes(post.content)} min read`].filter(Boolean).join("  ·  ");
  const tags = post.tags.slice(0, 3).map((t) => `#${t}`).join("  ");
  const titleSize = post.title.length <= 45 ? 62 : post.title.length <= 75 ? 52 : 44;

  const monoText = `loai_ blog ${tags} ${code?.lang ?? ""} ${code?.lines.flat().map((t) => t.text).join("") ?? ""}…`;
  const [sans800, sans500, mono] = await Promise.all([
    googleFont("Plus Jakarta Sans", 800, post.title),
    googleFont("Plus Jakarta Sans", 500, `${meta} loaiamr.com/blog Loai Amr`),
    googleFont("JetBrains Mono", 500, monoText),
  ]);
  const fonts = [
    sans800 && { name: "Jakarta", data: sans800, weight: 800 as const, style: "normal" as const },
    sans500 && { name: "Jakarta", data: sans500, weight: 500 as const, style: "normal" as const },
    mono && { name: "Mono", data: mono, weight: 500 as const, style: "normal" as const },
  ].filter((f) => !!f);

  const photo = code ? null : await avatarDataUrl();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#ffffff",
          padding: "56px 64px",
          fontFamily: "Jakarta",
          color: "#0f172a",
          gap: 48,
        }}
      >
        {/* Left: brand, tags, title, meta */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <div style={{ display: "flex", alignItems: "baseline", fontFamily: "Mono", fontSize: 30 }}>
            <span style={{ fontWeight: 500 }}>loai</span>
            <span style={{ color: "#2563eb" }}>_</span>
            <span style={{ color: "#94a3b8", fontSize: 24, marginLeft: 14 }}>blog</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {tags && <div style={{ display: "flex", fontFamily: "Mono", fontSize: 22, color: "#2563eb" }}>{tags}</div>}
            <div style={{ display: "flex", fontSize: titleSize, fontWeight: 800, lineHeight: 1.12, letterSpacing: "-0.02em" }}>{post.title}</div>
          </div>
          <div style={{ display: "flex", fontSize: 22, fontWeight: 500, color: "#64748b" }}>
            loaiamr.com/blog{meta ? `  ·  ${meta}` : ""}
          </div>
        </div>

        {/* Right: code "screenshot", or the author photo */}
        {code ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 520,
              alignSelf: "center",
              background: "#0d1117",
              borderRadius: 18,
              border: "1px solid #1f2937",
              boxShadow: "0 24px 48px rgba(15, 23, 42, 0.25)",
              overflow: "hidden",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "14px 18px", background: "#161b22" }}>
              <div style={{ width: 13, height: 13, borderRadius: 13, background: "#ff5f57" }} />
              <div style={{ width: 13, height: 13, borderRadius: 13, background: "#febc2e" }} />
              <div style={{ width: 13, height: 13, borderRadius: 13, background: "#28c840" }} />
              <div style={{ display: "flex", marginLeft: "auto", fontFamily: "Mono", fontSize: 16, color: "#8b949e" }}>{code.lang}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", padding: "18px 22px 22px", fontFamily: "Mono", fontSize: 19, lineHeight: 1.55 }}>
              {code.lines.map((line, i) => (
                <div key={i} style={{ display: "flex", whiteSpace: "pre" }}>
                  {line.length === 0 ? (
                    <span> </span>
                  ) : (
                    line.map((t, j) => (
                      <span key={j} style={{ color: t.color }}>
                        {t.text}
                      </span>
                    ))
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 400 }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- rendered by Satori, not the browser */}
            <img
              src={photo!}
              width={340}
              height={340}
              alt=""
              style={{ borderRadius: 340, border: "8px solid #ffffff", boxShadow: "0 0 0 4px #2563eb, 0 24px 48px rgba(15, 23, 42, 0.2)" }}
            />
          </div>
        )}
      </div>
    ),
    { ...COVER_SIZE, fonts, headers },
  );
}
