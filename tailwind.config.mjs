/* eslint-disable import/no-anonymous-default-export */

/**
 * Token surface. Values live in app/globals.css as CSS custom properties;
 * this file only gives them utility names.
 *
 * `colors` is overridden, not extended, so a stray `bg-zinc-800` fails to
 * generate instead of drifting into a component.
 */

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,jsx,mjs}'],
  darkMode: 'class',
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      inherit: 'inherit',
      black: '#000000',

      paper: 'var(--paper)',
      'paper-2': 'var(--paper-2)',
      card: 'var(--card)',
      translucent: 'var(--paper-translucent)',

      ink: 'var(--ink)',
      muted: 'var(--muted)',
      faint: 'var(--faint)',

      line: 'var(--line)',
      'line-strong': 'var(--line-strong)',

      accent: 'var(--accent)',
      'accent-ink': 'var(--accent-ink)',
      'accent-soft': 'var(--accent-soft)',

      green: 'var(--green)',
      purple: 'var(--purple)',

      night: 'var(--night)',
      'night-2': 'var(--night-2)',
      'night-line': 'var(--night-line)',
      'night-ink': 'var(--night-ink)',
      'night-muted': 'var(--night-muted)',
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'ui-monospace', 'monospace'],
        pixel: ['var(--font-pixel)', 'monospace'],
      },
      borderRadius: {
        DEFAULT: 'var(--radius-sm)',
        card: 'var(--radius)',
      },
      zIndex: {
        header: '50',
      },
      maxWidth: {
        prose: '65ch',
      },
    },
  },
  plugins: [],
};
