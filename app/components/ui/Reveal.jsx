'use client';

import { useEffect, useRef } from 'react';

/**
 * Scroll fade-in. A thin client wrapper so a Server Component section can
 * animate without becoming a client component.
 *
 * The hidden start state lives in globals.css, gated on the `js-motion` class
 * that ThemeScript sets before paint. This component only adds `is-in` once
 * the element enters the viewport. Reduced motion or no JS: the class is
 * never set, so the content is visible from the start.
 */
export default function Reveal({ children, delay = 0, as: Tag = 'div', className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.classList.add('is-in');
        io.disconnect();
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      className={className}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  );
}
