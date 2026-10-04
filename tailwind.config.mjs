/* eslint-disable import/no-anonymous-default-export */

/**
 * Token surface for the design system.
 * Values live in app/globals.css as CSS custom properties.
 * This file only gives them semantic utility names.
 *
 * `colors`, `fontSize`, and `borderRadius` are overridden rather than extended.
 * That is deliberate: it makes `bg-zinc-800`, `text-[17px]`, and `rounded-full`
 * fail at build time instead of drifting into components.
 * See design_system.md sections 4, 5 and 7, and agents.md section 5.
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
      white: '#ffffff',
      black: '#000000',

      page: 'var(--bg)',
      surface: 'var(--surface)',
      'surface-alt': 'var(--surface-alt)',
      sunken: 'var(--surface-sunken)',
      translucent: 'var(--surface-translucent)',

      line: 'var(--border)',
      'line-strong': 'var(--border-strong)',

      fg: 'var(--text)',
      'fg-muted': 'var(--text-muted)',
      'fg-subtle': 'var(--text-subtle)',
      'fg-invert': 'var(--invert-text)',

      accent: 'var(--accent)',
      'accent-alt': 'var(--accent-alt)',
      'accent-weak': 'var(--accent-weak)',
      invert: 'var(--invert-bg)',
      danger: 'var(--danger)',
    },

    // The closed type scale. design_system.md 5.2
    fontSize: {
      label: ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.08em', fontWeight: '500' }],
      'body-sm': ['0.875rem', { lineHeight: '1.6' }],
      body: ['1rem', { lineHeight: '1.65' }],
      lead: ['clamp(1.0625rem, 1rem + 0.3vw, 1.1875rem)', { lineHeight: '1.6' }],
      h4: ['1.25rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
      h3: ['clamp(1.3rem, 1.1rem + 0.8vw, 1.65rem)', { lineHeight: '1.25', letterSpacing: '-0.02em', fontWeight: '600' }],
      h2: ['clamp(1.6rem, 1.2rem + 1.6vw, 2.25rem)', { lineHeight: '1.15', letterSpacing: '-0.03em', fontWeight: '600' }],
      display: ['clamp(1.9rem, 0.9rem + 4vw, 3.5rem)', { lineHeight: '1.08', letterSpacing: '-0.04em', fontWeight: '600' }],
    },

    // All sharp. design_system.md 7.1 names "all-sharp (radius 0)" as one of
    // the valid shape locks, and it is the one the terminal direction uses.
    // Every step maps to 0 so existing `rounded-*` classes stay valid and
    // simply resolve square; nothing needs to be hunted down per component.
    borderRadius: {
      none: '0px',
      sm: '0px',
      DEFAULT: '0px',
      md: '0px',
      lg: '0px',
    },

    boxShadow: {
      none: 'none',
      sm: 'var(--shadow-sm)',
      DEFAULT: 'var(--shadow-sm)',
      md: 'var(--shadow-md)',
    },

    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      transitionDuration: {
        fast: '120ms',
        base: '200ms',
        slow: '500ms',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
        inout: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      zIndex: {
        sticky: '10',
        scrim: '40',
        header: '50',
        drawer: '60',
        skip: '70',
      },
      maxWidth: {
        prose: '65ch',
        lead: '44ch',
      },
    },
  },
  plugins: [],
};
