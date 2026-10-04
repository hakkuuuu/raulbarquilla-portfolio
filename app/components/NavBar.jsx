'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { List, X } from '@phosphor-icons/react';
import { navItems, profile } from '../data/site';
import ThemeToggle from './ThemeToggle';

const SECTION_IDS = navItems.map((item) => item.href.slice(1));

/**
 * Fixed header. design_system.md section 15.
 *
 * Animation is GSAP only. Motion was removed from the project (ADR-018), so
 * the underline is positioned imperatively rather than with a `layoutId`, and
 * the drawer is a GSAP tween rather than AnimatePresence.
 *
 * The drawer stays mounted and is hidden with `inert`, which takes it out of
 * the accessibility tree and the tab order without unmounting. That keeps the
 * open and close animations symmetrical and avoids an exit-animation race.
 *
 * Scroll state comes from an IntersectionObserver sentinel, never a scroll
 * listener. Taste Skill 5.D.
 */
export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  const sentinelRef = useRef(null);
  const listRef = useRef(null);
  const underlineRef = useRef(null);
  const drawerRef = useRef(null);
  const scrimRef = useRef(null);
  const triggerRef = useRef(null);

  /* Header background: a 1px sentinel at the top of the document. When it
     leaves the viewport the page has scrolled. No per-frame work. */
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Scroll spy. A collapsed root at 45% of the viewport height; whichever
     section crosses that line is the one being read. */
  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -55% 0px', threshold: 0 },
    );
    sections.forEach((section) => io.observe(section));
    return () => io.disconnect();
  }, []);

  /* Slide the underline to the active item. Replaces Motion's layoutId. */
  useEffect(() => {
    const list = listRef.current;
    const bar = underlineRef.current;
    if (!list || !bar) return undefined;

    let cancelled = false;

    const move = async () => {
      const target = list.querySelector(`a[href="#${active}"]`);
      if (!target) return;
      const left = target.offsetLeft;
      const width = target.offsetWidth;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        bar.style.transform = `translateX(${left}px)`;
        bar.style.width = `${width}px`;
        bar.style.opacity = '1';
        return;
      }

      const { gsap } = await import('gsap');
      if (cancelled) return;
      gsap.to(bar, { x: left, width, opacity: 1, duration: 0.35, ease: 'power3.out' });
    };

    move();
    window.addEventListener('resize', move);
    return () => {
      cancelled = true;
      window.removeEventListener('resize', move);
    };
  }, [active]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  /* Drawer: GSAP slide, focus trap, Escape, scroll lock, focus restore. */
  useEffect(() => {
    const drawer = drawerRef.current;
    const scrim = scrimRef.current;
    if (!drawer || !scrim) return undefined;

    let cancelled = false;

    (async () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const { gsap } = await import('gsap');
      if (cancelled) return;
      const duration = reduce ? 0 : 0.3;
      gsap.to(scrim, { opacity: menuOpen ? 1 : 0, duration, ease: 'power2.out' });
      gsap.to(drawer, { xPercent: menuOpen ? 0 : 100, duration, ease: 'power3.out' });
    })();

    if (!menuOpen) {
      return () => {
        cancelled = true;
      };
    }

    const trigger = triggerRef.current;
    const focusable = () =>
      Array.from(drawer.querySelectorAll('a[href], button:not([disabled])'));

    focusable()[0]?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        return;
      }
      if (event.key !== 'Tab') return;
      const items = focusable();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      cancelled = true;
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      trigger?.focus();
    };
  }, [menuOpen]);

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" className="absolute top-0 h-px w-full" />

      <header
        className={`fixed inset-x-0 top-0 z-header border-b transition-colors duration-base ease-inout ${
          scrolled
            ? 'border-line bg-translucent backdrop-blur-md'
            : 'border-transparent bg-transparent'
        }`}
      >
        <div className="container-page flex h-16 items-center justify-between gap-4">
          <a
            href="#home"
            className="flex shrink-0 items-center gap-2 rounded-md text-body-sm font-semibold text-fg"
          >
            <Image src="/logo-square.png" alt="" width={20} height={20} aria-hidden="true" />
            <span>
              dev<span className="text-accent">.haku</span>
            </span>
            <span className="sr-only">{profile.shortName}, back to top</span>
          </a>

          <nav aria-label="Sections" className="hidden md:block">
            <ul ref={listRef} className="relative flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = active === item.href.slice(1);
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      aria-current={isActive ? 'true' : undefined}
                      className={`block rounded-md px-3 py-2 text-body-sm transition-colors duration-fast ease-inout ${
                        isActive ? 'text-fg' : 'text-fg-muted hover:text-fg'
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
              <span
                ref={underlineRef}
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-px left-0 h-0.5 w-0 bg-accent opacity-0"
              />
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-1">
            <ThemeToggle />
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-fg-muted transition-colors duration-fast ease-inout hover:bg-sunken hover:text-fg active:translate-y-px md:hidden"
            >
              <List size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <div
        ref={scrimRef}
        onClick={closeMenu}
        aria-hidden="true"
        className={`fixed inset-0 z-scrim bg-black/50 opacity-0 md:hidden ${
          menuOpen ? '' : 'pointer-events-none'
        }`}
      />

      <aside
        ref={drawerRef}
        inert={menuOpen ? undefined : 'true'}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className="fixed inset-y-0 right-0 z-drawer flex w-72 translate-x-full flex-col border-l border-line bg-surface md:hidden"
      >
        <div className="flex h-16 items-center justify-between border-b border-line px-5">
          <span className="text-body-sm font-semibold text-fg">
            dev<span className="text-accent">.haku</span>
          </span>
          <button
            type="button"
            onClick={closeMenu}
            aria-label="Close navigation menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-fg-muted transition-colors duration-fast ease-inout hover:bg-sunken hover:text-fg active:translate-y-px"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Sections" className="flex flex-col gap-1 p-4">
          {navItems.map((item) => {
            const isActive = active === item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                aria-current={isActive ? 'true' : undefined}
                className={`flex items-center gap-3 rounded-md px-4 py-3 text-body-sm transition-colors duration-fast ease-inout ${
                  isActive
                    ? 'bg-sunken font-medium text-fg'
                    : 'text-fg-muted hover:bg-sunken hover:text-fg'
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`h-4 w-0.5 rounded-sm ${isActive ? 'bg-accent' : 'bg-transparent'}`}
                />
                {item.label}
              </a>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
