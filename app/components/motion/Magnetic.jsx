'use client';

import { useEffect, useRef } from 'react';

/**
 * Magnetic pointer attraction. Taste Skill section 5.
 *
 * Why it exists: it confirms the pointer has acquired the control before the
 * click, which on a page with only two primary actions is worth the bytes.
 *
 * Three rules this follows, all of which the obvious implementation breaks:
 *
 *  1. The pointer position never enters React state. `gsap.quickTo` writes
 *     straight to the transform, off the render cycle. Tracking a continuous
 *     pointer value in `useState` re-renders the tree on every mousemove and
 *     collapses on mid-range hardware.
 *  2. Fine pointers only. On touch there is no hover, so the effect would fire
 *     on tap and fight the press.
 *  3. Nothing runs under reduced motion.
 *
 * `strength` is the fraction of the distance to the pointer the element
 * travels. Past about 0.4 the control stops feeling attached to the cursor and
 * starts feeling broken.
 */
export default function Magnetic({ children, strength = 0.28, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (!window.matchMedia('(pointer: fine)').matches) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let cleanup = () => {};
    let cancelled = false;

    (async () => {
      const { gsap } = await import('gsap');
      if (cancelled) return;

      const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
      const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });

      const onMove = (event) => {
        const r = el.getBoundingClientRect();
        xTo((event.clientX - (r.left + r.width / 2)) * strength);
        yTo((event.clientY - (r.top + r.height / 2)) * strength);
      };
      const onLeave = () => {
        xTo(0);
        yTo(0);
      };

      el.addEventListener('pointermove', onMove);
      el.addEventListener('pointerleave', onLeave);
      // Keyboard users never fire pointer events, so reset on blur too.
      el.addEventListener('blur', onLeave, true);

      cleanup = () => {
        el.removeEventListener('pointermove', onMove);
        el.removeEventListener('pointerleave', onLeave);
        el.removeEventListener('blur', onLeave, true);
        gsap.killTweensOf(el);
        gsap.set(el, { x: 0, y: 0 });
      };
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [strength]);

  return (
    <span ref={ref} className={`inline-block will-change-transform ${className}`.trim()}>
      {children}
    </span>
  );
}
