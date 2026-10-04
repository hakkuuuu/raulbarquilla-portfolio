'use client';

import { Moon, Sun, TerminalWindow } from '@phosphor-icons/react';
import { useTheme } from '../context/ThemeContext';

const LABEL = {
  light: 'Light theme. Switch to dark.',
  dark: 'Dark theme. Switch to terminal green.',
  't-green': 'Terminal green theme. Switch to terminal blue.',
  't-blue': 'Terminal blue theme. Switch to terminal amber.',
  't-amber': 'Terminal amber theme. Switch to terminal red.',
  't-red': 'Terminal red theme. Switch to light.',
};

/**
 * Six-state theme cycle. design_system.md section 10 (ghost variant).
 *
 * The icon is swapped with CSS, not React state, so it is correct in the very
 * first paint with no flicker. In a terminal variant the glyph takes the
 * accent, which is how the control previews the theme it is currently on.
 *
 * The accessible name names both the current theme and the next one. A
 * six-state control that only said "switch theme" would tell a screen-reader
 * user nothing about where they are in the cycle.
 */
export default function ThemeToggle({ className = '' }) {
  const { theme, cycleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={cycleTheme}
      aria-label={LABEL[theme]}
      className={
        'inline-flex h-10 w-10 items-center justify-center rounded-md border border-transparent ' +
        'text-fg-muted transition-colors duration-fast ease-inout hover:bg-sunken hover:text-fg ' +
        'active:translate-y-px ' +
        className
      }
    >
      <Moon size={18} aria-hidden="true" className="block dark:hidden" />
      <Sun size={18} aria-hidden="true" className="hidden dark:block [.t_&]:hidden" />
      <TerminalWindow
        size={18}
        aria-hidden="true"
        className="hidden text-accent [.t_&]:block"
      />
    </button>
  );
}
