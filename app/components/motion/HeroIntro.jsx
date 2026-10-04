'use client';

import { useEffect, useRef } from 'react';

/**
 * Hero entrance, driven by one GSAP timeline.
 *
 * Why it exists: the hero is the one screen where nothing else establishes
 * reading order, so the sequence does it. Headline first out of its mask, then
 * the supporting lines, then the actions.
 *
 * A client wrapper only. `children` arrive pre-rendered from the server, so the
 * hero stays a Server Component and the markup is in the HTML for crawlers
 * whether or not this ever runs.
 *
 * GSAP is dynamically imported. The hero is above the fold, so the library must
 * not sit in the critical path; the start states are CSS, so there is no flash
 * while it loads.
 *
 * Contract with the markup:
 *   [data-hero-mask]  a clipping wrapper whose single child slides up
 *   [data-hero-item]  anything that fades and rises, in DOM order
 */
export default function HeroIntro({ children, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let ctx;
    let cancelled = false;

    (async () => {
      const { gsap } = await import('gsap');
      if (cancelled) return;

      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

        tl.to('[data-hero-mask] > *', {
          y: '0%',
          duration: 1.1,
          stagger: 0.08,
        }).to(
          '[data-hero-item]',
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.09,
          },
          // Overlap, so the supporting copy is already arriving as the
          // headline lands. Sequential reads as slow.
          '-=0.75',
        );
      }, root);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
