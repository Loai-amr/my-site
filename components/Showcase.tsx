"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type AnimationEvent, type CSSProperties } from "react";
import shots from "@/lib/shots.json";
import { siteDomain, type ProjectShot } from "@/lib/projects";
import styles from "./Showcase.module.css";

export type ShowcaseLabels = { prev: string; next: string; slide: string; visit: string; desktop: string; mobile: string };

const sizes: Record<string, number[]> = shots;

// Longer pages scroll for longer, so every site moves at a similar, readable pace.
function scrollTime(slug: string) {
  const ratio = (sizes[slug]?.[0] ?? 2700) / 1440;
  return `${Math.min(10, Math.max(4, 3 + (ratio - 0.625) * 2.5)).toFixed(1)}s`;
}

// Scroll-snap carousel: one site per slide (desktop browser frame + overlapping phone).
// The current slide's screens scroll once from top to bottom (CSS animation); when the desktop
// screen reaches the bottom, the carousel swipes to the next site and loops after the last one.
export default function Showcase({ sites, labels }: { sites: ProjectShot[]; labels: ShowcaseLabels }) {
  const track = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  // Only auto-play while the carousel is on screen, so visitors start at the first site.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setPlaying(entry.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => setIndex(Math.round(el.scrollLeft / el.clientWidth));
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const go = (i: number) => {
    const el = track.current;
    if (!el) return;
    const target = (i + sites.length) % sites.length;
    el.scrollTo({ left: target * el.clientWidth, behavior: "smooth" });
  };

  // Fired when the current slide's desktop screen finishes scrolling to the bottom.
  const onScrollAnimationEnd = (e: AnimationEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.dataset.primary !== "true") return;
    if (!target.closest(`.${styles.current}`)) return;
    go(index + 1);
  };

  return (
    <div ref={root} className={`${styles.carousel} ${playing ? styles.playing : ""}`}>
      {/* Screenshots only, so the track is always laid out left-to-right (also on the Arabic page). */}
      <div
        ref={track}
        className={styles.track}
        dir="ltr"
        tabIndex={0}
        aria-roledescription="carousel"
        onAnimationEnd={onScrollAnimationEnd}
      >
        {sites.map((site, i) => {
          const domain = siteDomain(site.url);
          // Current slide and its neighbours load right away, so the next site is ready when we swipe.
          const near = Math.abs(i - index) <= 1 || (index === sites.length - 1 && i === 0);
          return (
            <figure
              key={site.slug}
              className={`${styles.slide} ${i === index ? styles.current : ""}`}
              style={{ "--scroll-time": scrollTime(site.slug) } as CSSProperties}
              aria-roledescription="slide"
              aria-label={labels.slide.replace("{n}", String(i + 1)).replace("{total}", String(sites.length))}
            >
              <div className={styles.stage}>
                <div className={styles.browser}>
                  <div className={styles.bar} aria-hidden="true">
                    <span className={styles.dots}>
                      <i />
                      <i />
                      <i />
                    </span>
                    <span className={styles.url}>{domain}</span>
                  </div>
                  <div className={styles.screen}>
                    <Image
                      src={`/projects/${site.slug}-desktop.webp`}
                      alt={labels.desktop.replace("{name}", site.name)}
                      fill
                      sizes="(min-width: 1080px) 780px, 82vw"
                      loading={near ? "eager" : "lazy"}
                      className={styles.shot}
                      data-primary="true"
                    />
                  </div>
                </div>
                <div className={styles.phone}>
                  <div className={styles.phoneScreen}>
                    <Image
                      src={`/projects/${site.slug}-mobile.webp`}
                      alt={labels.mobile.replace("{name}", site.name)}
                      fill
                      sizes="(min-width: 1080px) 200px, 28vw"
                      loading={near ? "eager" : "lazy"}
                      className={styles.shot}
                    />
                  </div>
                </div>
              </div>
              <figcaption className={styles.caption} dir="auto">
                <strong>{site.name}</strong>
                {site.label && <span>{site.label}</span>}
                <a href={site.url} target="_blank" rel="noopener noreferrer">
                  {labels.visit}
                </a>
              </figcaption>
            </figure>
          );
        })}
      </div>

      {/* Controls follow the track direction (left-to-right), also on the Arabic page. */}
      <div className={styles.controls} dir="ltr">
        <button type="button" className={styles.arrow} onClick={() => go(index - 1)} aria-label={labels.prev}>
          ←
        </button>
        <span className={styles.counter} aria-live="polite">
          {index + 1} / {sites.length}
        </span>
        <div className={styles.pager}>
          {sites.map((site, i) => (
            <button
              key={site.slug}
              type="button"
              className={`${styles.dot} ${i === index ? styles.active : ""}`}
              onClick={() => go(i)}
              aria-label={site.name}
              aria-current={i === index ? "true" : undefined}
            />
          ))}
        </div>
        <button type="button" className={styles.arrow} onClick={() => go(index + 1)} aria-label={labels.next}>
          →
        </button>
      </div>
    </div>
  );
}
