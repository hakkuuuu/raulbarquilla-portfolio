'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { navItems, profile } from '../data/site';
import ThemeToggle from './ThemeToggle';
import BrandMark from './ui/BrandMark';

const SECTION_IDS = navItems.map((item) => item.href.slice(1));

/**
 * Fixed 64px header on paper, with a hairline that strengthens once the
 * page scrolls. Mono links, theme switch, and one yellow call to action.
 *
 * Below `md` the links move into a drawer that drops down under the bar.
 * The drawer stays mounted and is hidden with `inert`, which takes it out of
 * the accessibility tree and the tab order without unmounting.
 *
 * Scroll state comes from IntersectionObserver, never a scroll listener.
 */
export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  const sentinelRef = useRef(null);
  const triggerRef = useRef(null);

  /* A 1px sentinel at the top of the document. When it leaves the viewport
     the page has scrolled. */
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

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  /* Escape closes the drawer and returns focus to the burger. */
  useEffect(() => {
    if (!menuOpen) return undefined;
    const trigger = triggerRef.current;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      trigger?.focus();
    };
  }, [menuOpen]);

  const linkClass = (isActive) =>
    `block whitespace-nowrap rounded-lg px-2.5 py-2 font-mono text-[0.78rem] transition-colors duration-100 ${
      isActive ? 'bg-paper-2 text-ink' : 'text-muted hover:bg-paper-2 hover:text-ink'
    }`;

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" className="absolute top-0 h-px w-full" />

      <header
        className={`fixed inset-x-0 top-0 z-header border-b bg-translucent backdrop-blur-md transition-colors duration-200 ${
          scrolled || menuOpen ? 'border-line-strong' : 'border-line'
        }`}
      >
        <div className="wrap flex h-16 items-center justify-between gap-4">
          <a href="#home" className="flex shrink-0 items-center gap-2.5 text-ink">
            <BrandMark size={24} />
            <span className="pixel text-[0.95rem]">dev.haku</span>
            <span className="sr-only">{profile.shortName}, back to top</span>
          </a>

          <nav aria-label="Sections" className="ml-auto hidden md:block">
            <ul className="flex items-center gap-0.5">
              {navItems.map((item) => {
                const isActive = active === item.href.slice(1);
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      aria-current={isActive ? 'true' : undefined}
                      className={linkClass(isActive)}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle />
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm hidden sm:inline-flex"
            >
              Resume
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
              aria-controls="nav-drawer"
              className="flex h-10 w-10 flex-col justify-center gap-[5px] rounded-lg border border-line-strong bg-card p-2 md:hidden"
            >
              <span
                className={`block h-0.5 w-full rounded-sm bg-ink transition-transform duration-200 ${
                  menuOpen ? 'translate-y-[7px] rotate-45' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-full rounded-sm bg-ink transition-opacity duration-200 ${
                  menuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-full rounded-sm bg-ink transition-transform duration-200 ${
                  menuOpen ? '-translate-y-[7px] -rotate-45' : ''
                }`}
              />
            </button>
          </div>
        </div>

        <nav
          id="nav-drawer"
          aria-label="Sections"
          inert={menuOpen ? undefined : true}
          className={`${menuOpen ? 'flex' : 'hidden'} flex-col gap-0.5 border-t border-line bg-paper px-3.5 pb-4 pt-2.5 md:hidden`}
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              aria-current={active === item.href.slice(1) ? 'true' : undefined}
              className={`rounded-lg px-2.5 py-3 font-mono text-[0.9rem] ${
                active === item.href.slice(1) ? 'bg-paper-2 text-ink' : 'text-ink hover:bg-paper-2'
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            className="btn btn-primary mt-2 justify-center sm:hidden"
          >
            Resume
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </nav>
      </header>
    </>
  );
}
