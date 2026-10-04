'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(null);

/**
 * Cycle order. The two conventional themes come first, then the four terminal
 * variants. Each terminal variant is monochromatic: one accent, text tinted
 * toward it, never several accents at once.
 */
export const THEMES = ['light', 'dark', 't-green', 't-blue', 't-amber', 't-red'];

const TERMINAL = new Set(['t-green', 't-blue', 't-amber', 't-red']);

export function applyTheme(theme) {
  const root = document.documentElement;
  const isTerminal = TERMINAL.has(theme);

  root.classList.toggle('dark', theme === 'dark' || isTerminal);
  root.classList.toggle('t', isTerminal);
  TERMINAL.forEach((name) => root.classList.toggle(name, name === theme));
  root.style.colorScheme = theme === 'light' ? 'light' : 'dark';
}

/**
 * Theme state. architecture.md section 6.
 *
 * The theme is already applied to <html> by ThemeScript before first paint.
 * This provider reads what is on the element rather than assuming a default,
 * which is what caused the wrong-theme flash in the original build (A8).
 *
 * Initial state is 'dark' so the server render and the first client render
 * agree. The effect below corrects it after hydration without a mismatch.
 */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const list = document.documentElement.classList;
    const found = THEMES.find((name) => TERMINAL.has(name) && list.contains(name));
    if (found) setTheme(found);
    else if (list.contains('dark')) setTheme('dark');
    else setTheme('light');
  }, []);

  const cycleTheme = useCallback(() => {
    setTheme((previous) => {
      const next = THEMES[(THEMES.indexOf(previous) + 1) % THEMES.length];
      applyTheme(next);
      try {
        localStorage.setItem('theme', next);
      } catch {
        // Private browsing or blocked storage. The theme still applies for this session.
      }
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, cycleTheme }}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
