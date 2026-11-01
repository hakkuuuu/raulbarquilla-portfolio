'use client';

import { Moon, Sun } from '@phosphor-icons/react';
import { useTheme } from '../context/ThemeContext';

/**
 * Light/dark switch. The icon is swapped with CSS, not React state, so it is
 * correct in the first paint with no flicker.
 */
export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Dark theme. Switch to light.' : 'Light theme. Switch to dark.'}
      className={
        'inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line-strong ' +
        'bg-card text-ink transition-colors duration-100 hover:border-ink ' +
        className
      }
    >
      <Moon size={17} aria-hidden="true" className="block dark:hidden" />
      <Sun size={17} aria-hidden="true" className="hidden dark:block" />
    </button>
  );
}
