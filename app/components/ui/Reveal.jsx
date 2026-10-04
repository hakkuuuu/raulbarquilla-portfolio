'use client';

import { useEffect, useRef } from 'react';

/**
 * Scroll reveal, driven by GSAP ScrollTrigger. design_system.md section 19.
 *
 * A thin client wrapper so a Server Component section can animate without
 * becoming a client component. `children` arrive pre-rendered from the server.
 *
 * Two modes:
 *
 *   mask={false}  the element fades and translates in from `from`.
 *   mask          the element clips, and its single child slides fully in from
 *                 outside the clip edge. Nothing fades; the content is simply
 *                 revealed. Use on headings, not on blocks that carry focus
 *                 rings or shadows, both of which an overflow clip will shear.
 *
 * `from` is not decoration. Direction follows the element's position in its
 * layout, so a left column enters from the left and a right column from the
 * right. Motion then reinforces the reading axis instead of cutting across it.
 *
 * The hidden start state is applied by CSS, gated on the `js-motion` class the
 * pre-paint script sets. That ordering is what makes a skipped animation
 * degrade to visible content rather than a blank page:
 *
 *   - reduced motion   -> class never set -> content visible, GSAP never runs
 *   - JS fails to load -> class never set -> content visible
 *   - normal           -> class set before paint -> no flash
 *
 * See ADR-014.
 */
export default function Reveal({
  children,
  delay = 0,
  from = 'up',
  mask = false,
  as: Tag = 'div',
  className = '',
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

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
        const target = mask ? el.firstElementChild : el;
        if (!target) return;

        gsap.to(target, {
          opacity: 1,
          x: 0,
          y: 0,
          duration: mask ? 1 : 0.7,
          delay,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: el,
            // Fire before the element is fully in view, so it is settled by
            // the time the reader's eye arrives.
            start: 'top 82%',
            once: true,
          },
        });
      }, el);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [delay, mask]);

  const attrs = mask ? { 'data-mask': from } : { 'data-reveal': from };

  return (
    <Tag ref={ref} {...attrs} className={className}>
      {children}
    </Tag>
  );
}
