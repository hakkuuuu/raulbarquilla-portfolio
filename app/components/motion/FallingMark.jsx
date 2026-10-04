'use client';

import { useEffect, useRef } from 'react';
import { TerminalWindow } from '@phosphor-icons/react';

/**
 * A terminal mark that falls down the right gutter as the page scrolls.
 *
 * Why it exists: it is the page's only purely playful element, and it doubles
 * as a scroll-progress indicator. Position tracks scroll, so it tells you how
 * far down you are without a progress bar.
 *
 * Scrubbed, not timed: it is tied to scroll position rather than running on
 * its own, so it never animates while the reader is still.
 *
 * Hidden below `lg` (no gutter to fall down), under reduced motion, and for
 * assistive technology. `pointer-events-none` throughout, and it sits below
 * the header in the z-order so it can never occlude navigation.
 */
export default function FallingMark() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    if (!window.matchMedia('(min-width: 1024px)').matches) return undefined;

    let ctx;
    let cancelled = false;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.set(el, { opacity: 1 });
        gsap.to(el, {
          // Falls the height of the viewport, minus its own size and the
          // header, so it lands just above the footer rather than off-screen.
          y: () => window.innerHeight - 180,
          rotation: 540,
          ease: 'none',
          scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
      }, el);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-falling-mark
      className="pointer-events-none fixed right-6 top-24 z-sticky hidden opacity-0 lg:block"
    >
      <TerminalWindow size={22} weight="bold" className="text-accent" />
    </div>
  );
}
