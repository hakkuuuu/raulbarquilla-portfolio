'use client';

import { createContext, useCallback, useContext, useSyncExternalStore } from 'react';

const ThemeContext = createContext(null);

export function applyTheme(theme) {
  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
  root.style.colorScheme = theme;
}

/* The `dark` class on <html> is the source of truth. ThemeScript sets it
   before first paint; this store only reads it and listens for changes. */
function subscribe(onChange) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  return () => observer.disconnect();
}

const getSnapshot = () =>
  document.documentElement.classList.contains('dark') ? 'dark' : 'light';

/* Server render and hydration use 'light'; React then re-renders with the
   real class value without a hydration mismatch. */
const getServerSnapshot = () => 'light';

export function ThemeProvider({ children }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = useCallback(() => {
    const next = getSnapshot() === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try {
      localStorage.setItem('theme', next);
    } catch {
      // Private browsing or blocked storage. The theme still applies for this session.
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
