'use client';

import { useEffect, useRef } from 'react';

const GLYPHS = '01<>/\\[]{}#$%&*+=~^|';

/**
 * Decode-on-reveal for section headings. Taste Skill section 10, "Text
 * Scramble Effect".
 *
 * Why it exists: it gives each section a distinct arrival in the page's own
 * idiom, which a uniform fade does not. It replaces the masked slide on
 * headings rather than stacking on top of it, because running both makes the
 * heading the busiest thing on screen.
 *
 * Accessibility: the real text is on the parent heading as `aria-label`, and
 * this span is `aria-hidden`, so assistive technology never sees the scrambled
 * intermediate characters. The span also renders the real text on the server,
 * so it is correct with no JS and correct for crawlers.
 *
 * The animation runs on requestAnimationFrame and writes to `textContent`
 * directly. Nothing enters React state: a per-frame setState here would
 * re-render the whole section tree sixty times a second.
 */
export default function ScrambleText({ text, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let raf = 0;
    let ctx;
    let cancelled = false;

    const run = () => {
      const start = performance.now();
      const duration = 420 + text.length * 26;

      const tick = (now) => {
        const progress = Math.min(1, (now - start) / duration);
        const settled = Math.floor(progress * text.length);

        let out = '';
        for (let i = 0; i < text.length; i += 1) {
          const ch = text[i];
          if (i < settled || ch === ' ') out += ch;
          else out += GLYPHS[(Math.random() * GLYPHS.length) | 0];
        }
        el.textContent = out;

        if (progress < 1) raf = requestAnimationFrame(tick);
        else el.textContent = text;
      };

      raf = requestAnimationFrame(tick);
    };

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 82%',
          once: true,
          onEnter: run,
        });
      }, el);
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      ctx?.revert();
      // Always leave the real text behind, never a half-decoded frame.
      if (el) el.textContent = text;
    };
  }, [text]);

  return (
    <span ref={ref} aria-hidden="true" className={className}>
      {text}
    </span>
  );
}
