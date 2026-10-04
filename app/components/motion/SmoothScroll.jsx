'use client';

import { useEffect } from 'react';

/**
 * Lenis smooth scroll, wired to GSAP ScrollTrigger.
 *
 * This is the single place scroll is driven from. Taste Skill 5.D: no
 * `window.addEventListener('scroll')` anywhere in the codebase; Lenis owns the
 * loop and ScrollTrigger reads from it.
 *
 * Does nothing at all under `prefers-reduced-motion`, so native scrolling and
 * the browser's own anchor jumps stay intact. GSAP is imported dynamically so
 * it never lands in the initial bundle and cannot delay LCP.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let lenis;
    let cleanup = () => {};
    let cancelled = false;

    (async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import('lenis'),
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      lenis = new Lenis({
        duration: 1.05,
        // Slightly eased, not floaty. A portfolio is scanned, not cruised.
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        // Never hijack touch: native momentum is what phone users expect.
        smoothTouch: false,
      });

      lenis.on('scroll', ScrollTrigger.update);

      const raf = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      // Anchor links must still work with Lenis driving the scroll position.
      const onAnchorClick = (event) => {
        const link = event.target.closest('a[href^="#"]');
        if (!link) return;
        const id = link.getAttribute('href').slice(1);
        const target = document.getElementById(id);
        if (!target) return;
        event.preventDefault();
        // No offset here. Lenis already honours the `scroll-margin-top` that
        // globals.css sets on every `section[id]` to clear the fixed header.
        // Passing the header height again lands the section twice as far down.
        lenis.scrollTo(target);
        // Keep the hash so the URL stays shareable and history still works.
        history.pushState(null, '', `#${id}`);
      };
      document.addEventListener('click', onAnchorClick);

      cleanup = () => {
        document.removeEventListener('click', onAnchorClick);
        gsap.ticker.remove(raf);
        lenis.destroy();
      };
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return null;
}
