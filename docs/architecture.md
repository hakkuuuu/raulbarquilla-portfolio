# Architecture - dev.haku Portfolio

**Stack:** Next.js 16 (App Router) - React 19 - Tailwind CSS 3.4 - Motion 12 - Phosphor Icons 2
**Last reviewed:** 2026-10-04

---

## 1. Current architecture (pre-rehaul)

### Tree

```
app/
├── layout.js                  RootLayout, Poppins, metadata, ThemeProvider, BackToTop
├── page.js                    'use client' - the entire page
├── globals.css                Tailwind entry plus ad-hoc utility classes
├── context/ThemeContext.js    'use client'
└── components/
    ├── NavBar.jsx             'use client'
    ├── Hero.jsx               'use client'
    ├── About.jsx              'use client'
    ├── Skills.jsx             'use client'
    ├── Projects.jsx           'use client'
    ├── Contact.jsx            'use client' - also contains the footer
    ├── LoadingScreen.jsx      blocking splash
    ├── CustomCursor.jsx       replaces the system cursor
    └── BackToTop.jsx          floating scroll button
assets/assets.js               content, icon imports, and JSX mixed together
```

### Problems identified in the audit

| # | Finding | Consequence |
|---|---|---|
| A1 | `page.js` is `'use client'`, so the whole tree ships as client JS | No server rendering benefit; every section is hydrated whether or not it is interactive |
| A2 | `LoadingScreen` gates the render tree behind `isLoading` state | Nothing paints for roughly 3.5s. LCP, SEO, and perceived speed all suffer |
| A3 | `page.js` injects `<style>{'* { cursor: none !important }'}</style>` | Global side effect from a page component; breaks caret and selection affordances |
| A4 | `window.addEventListener('scroll')` in `NavBar` and `BackToTop` | Unbatched work on every scroll frame, with React state writes |
| A5 | Nav `activeItem` is click-only state | Navigation misreports the current section |
| A6 | `page.js` wraps each section in an animating `motion.div`, and each section animates internally | Double animation; `scale: 0.95` on a whole section blurs text mid-transition |
| A7 | Duplicate anchors: `page.js` renders `id="hero"` while `Hero.jsx` renders `id="home"` | Two IDs for one destination, one of which nothing links to |
| A8 | `ThemeProvider` applies the theme in `useEffect`, while `globals.css` hard-codes `background: #070707` on `body` | Wrong-theme flash on load; light mode sits on a dark body |
| A9 | `assets.js` references `assets.project_2` through `assets.project_9`, none of which are exported | Every project's `project` field is `undefined`. Dead data |
| A10 | `public/project_*.png` are logos from projects no longer listed | Stale assets, no usable cover art |
| A11 | Three icon libraries (`react-icons/fi`, `react-icons/fa`, `lucide-react`) plus a hand-drawn SVG | Inconsistent stroke weights and optical sizes; needless bundle |
| A12 | Container width alternates between `max-w-3xl`, `5xl`, `6xl`, `7xl` across sections | Content edges move on scroll |
| A13 | `viewport.maximumScale = 1` | Blocks pinch zoom. WCAG 2.1 SC 1.4.4 failure |
| A14 | Form labels are not bound to inputs; no `id`, no `htmlFor`, no error state | Clicking a label does nothing; failures are invisible to assistive tech |
| A15 | `dark:text-gray-500` on secondary copy | 4.1:1 against the dark background. Below AA |
| A16 | `Hero.jsx` closes a fixed-position gradient `div` inside the social-links flex row | Stray element inheriting the wrong positioning context |
| A17 | Skills render 21 animated SVG rings driven by invented percentages | Heaviest section on the page, carrying the least trustworthy information |
| A18 | `tailwind.config.mjs` imports `Poppins` from `next/font/google` and declares an unused `primary` palette | Dead configuration; a font import in a build config does nothing |

## 2. Proposed architecture

### Principles

1. **Server by default.** Sections are Server Components. `'use client'` appears only on leaves that need state, effects, or event handlers.
2. **Content is data.** Every string and URL lives in `app/data/site.js`. Components receive data; they do not contain it.
3. **Tokens are CSS.** Colour, radius, elevation, and motion are custom properties in `globals.css`, exposed to Tailwind semantically. Components never write a hex value.
4. **Primitives over repetition.** A utility string repeated three times becomes a component in `components/ui/`.
5. **One source per concern.** One container width, one icon family, one motion library, one theme mechanism.

### Tree

```
app/
├── layout.js                  RSC - fonts, metadata, JSON-LD, theme script, header, footer
├── page.js                    RSC - composes the five sections
├── globals.css                tokens, base layer, primitive classes
├── sitemap.js                 RSC - generated sitemap
├── robots.js                  RSC - generated robots.txt
├── data/
│   └── site.js                all content, pure data, no JSX and no icon imports
├── context/
│   └── ThemeContext.js        'use client' - reads the pre-painted theme, persists changes
└── components/
    ├── NavBar.jsx             'use client' - scroll-spy, drawer, focus management
    ├── ThemeToggle.jsx        'use client' - leaf
    ├── Hero.jsx               RSC
    ├── About.jsx              RSC
    ├── Skills.jsx             RSC
    ├── Projects.jsx           RSC
    ├── ProjectCard.jsx        RSC
    ├── Contact.jsx            RSC - section shell
    ├── ContactForm.jsx        'use client' - form state and submission
    ├── SiteFooter.jsx         RSC
    └── ui/
        ├── Button.jsx         RSC - polymorphic button / anchor
        ├── Section.jsx        RSC - section landmark, container, heading slot
        ├── Reveal.jsx         'use client' - scroll reveal wrapper
        └── Tag.jsx            RSC - stack tag
```

Deleted: `LoadingScreen.jsx`, `CustomCursor.jsx`, `BackToTop.jsx`.

### The client boundary

```
layout.js  (server)
└── page.js  (server)
    ├── NavBar            CLIENT  scroll-spy, drawer, theme toggle
    ├── Hero              server
    │   └── Reveal        CLIENT  wrapper only; children arrive pre-rendered
    ├── About             server
    ├── Skills            server
    ├── Projects          server
    │   └── ProjectCard   server
    ├── Contact           server
    │   └── ContactForm   CLIENT  form state, validation, fetch
    └── SiteFooter        server
```

`Reveal` is a thin client wrapper that receives server-rendered `children` as props. The children themselves are never converted to client components, so the animation island costs a wrapper and nothing more.

## 3. Page structure

One route, `/`. Five anchored sections. Anchors and nav labels are frozen; see `PRD.md` section 8.

| Anchor | Section | Layout family | Heading level |
|---|---|---|---|
| `#home` | Hero | Asymmetric split, image right | `h1` |
| `#about` | About | Split, image left, with a definition grid | `h2` |
| `#skills` | Skills | Hairline-separated domain groups, no containers | `h2` |
| `#projects` | Projects | Featured entry plus a 2-column grid, 6 cells for 6 items | `h2` |
| `#contact` | Contact | Channel list beside a form panel | `h2` |

Five distinct layout families across five sections. No family repeats, and no more than two consecutive sections use an image-plus-text split.

## 4. Component hierarchy

```
RootLayout
├── ThemeScript                    blocking inline script, pre-paint
├── SkipLink
├── ThemeProvider                  client context
│   ├── NavBar
│   │   ├── Logo link
│   │   ├── nav links + active underline   (IntersectionObserver)
│   │   ├── ThemeToggle
│   │   └── MobileDrawer + scrim           (focus trap, Escape, scroll lock)
│   ├── main
│   │   └── Home page
│   │       ├── Hero         → Reveal, Button ×2, next/image
│   │       ├── About        → Section, Reveal, next/image
│   │       ├── Skills       → Section, Reveal, Tag
│   │       ├── Projects     → Section, Reveal, ProjectCard → Tag, next/image
│   │       └── Contact      → Section, Reveal, ContactForm → Button
│   └── SiteFooter
└── JSON-LD (Person)
```

## 5. Shared components

| Component | Kind | Contract | Replaces |
|---|---|---|---|
| `ui/Button` | server | `variant: 'primary' \| 'secondary' \| 'ghost'`, `size: 'md' \| 'sm'`, `href?`, `icon?`, `iconPosition?`. Renders `<a>` when `href` is present, otherwise `<button>`. External URLs automatically receive `target="_blank"`, `rel="noopener noreferrer"`, and a new-tab hint in the accessible name. | `.primary-btn` / `.secondary-btn` in `globals.css`, plus five hand-written button class strings |
| `ui/Section` | server | `id`, `title`, `lead?`, `eyebrow?`, `children`. Emits `<section aria-labelledby>` with the container, the heading block, and the top hairline. | Four near-identical hand-built section headers |
| `ui/Reveal` | client | `delay?`, `as?`, `children`. Opacity plus 16px y-offset, `once: true`, honours `useReducedMotion`. | 24 per-element `motion.*` declarations with locally redefined variants |
| `ui/Tag` | server | `children`. The stack tag. | Three different inline tag class strings |

`Section` is the component that enforces the container width and the eyebrow budget. Because every section renders through it, the width cannot drift again.

## 6. State management

No global state library. Three categories, each handled at the smallest scope that works.

| State | Scope | Mechanism | Why |
|---|---|---|---|
| Theme | App | React context over a `localStorage` value and a `documentElement` class | Needed by the toggle in two places; genuinely cross-cutting |
| Active nav section | `NavBar` | `useState`, written by an `IntersectionObserver` callback | Local to the nav. Observer fires on intersection change, not per scroll frame |
| Drawer open | `NavBar` | `useState` | Local |
| Form values, errors, status | `ContactForm` | `useState` with a `status` union: `idle` / `submitting` / `success` / `error` | Local; never leaves the form |

**Rules.** Continuous pointer and scroll values never enter React state; `useMotionValue` and `useTransform` are used instead. No `window.addEventListener('scroll')` anywhere in the codebase.

### Theme sequence

1. `ThemeScript` runs inline in `<head>`, before first paint. It reads `localStorage.theme`, falls back to `prefers-color-scheme`, falls back to dark, and sets the class on `<html>` plus `style.colorScheme`.
2. CSS custom properties resolve against that class. The correct theme is in the first paint.
3. `ThemeProvider` mounts and reads the class that is already applied, rather than assuming a default.
4. `ThemeToggle` writes the class, writes `localStorage`, and updates context.

This removes defect A8. `suppressHydrationWarning` on `<html>` is required because the script mutates the element before React hydrates.

## 7. Data flow

```
app/data/site.js   (pure data: strings, URLs, groupings)
        │
        │  static import, resolved at build time
        ▼
Server Components   render markup on the server
        │
        │  pre-rendered children as props
        ▼
Client islands      Reveal / NavBar / ContactForm
        │
        │  ContactForm only, on submit
        ▼
POST https://api.web3forms.com/submit
```

Everything except the contact submission is static. The page is fully prerenderable.

`site.js` exports: `profile`, `navItems`, `heroActions`, `aboutFacts`, `skillGroups`, `projects`, `socialChannels`, `formFields`. It contains no JSX and imports no icon components, so it stays serialisable and usable from server components. Icon selection happens in the component that renders it, keyed by a string `icon` field.

## 8. API boundaries

| Boundary | Direction | Contract |
|---|---|---|
| Web3Forms | Client → third party | `POST multipart/form-data` to `NEXT_PUBLIC_WEB3FORMS_API_URL` with `access_key`, `fullName`, `email`, `message`. Returns `{ success: boolean, message: string }`. |
| Resume PDF | Browser → static asset | `/barquilla_raul_resume.pdf`, served from `public/` |
| External profiles | Browser → third party | GitHub, LinkedIn, and project demo URLs, all `target="_blank" rel="noopener noreferrer"` |

**Notes.**

- The Web3Forms access key is a publishable key by design; the service rate-limits and validates server-side. It is still kept in an environment variable so it is not committed.
- There is no Next.js Route Handler and no server action. Adding one would be the correct move if spam becomes a problem, because it would allow a server-side token and a honeypot check. Recorded as a future option, not a current need.
- If either environment variable is missing, `ContactForm` renders its `unconfigured` state rather than a control that silently fails.

## 9. Routing

- App Router, single static route `/`.
- Navigation within the page is anchor-based against frozen IDs: `#home`, `#about`, `#skills`, `#projects`, `#contact`.
- `scroll-behavior: smooth` is set on `<html>` and disabled under `prefers-reduced-motion`.
- `scroll-margin-top` is set on every section so anchored content clears the fixed header. This replaces the inconsistent `scroll-mt-32` / `scroll-mt-40` that was previously applied per wrapper.
- `app/sitemap.js` and `app/robots.js` generate their files at build time.

## 10. Design-system to component mapping

| `design_system.md` | Implementation |
|---|---|
| Colour tokens (4.1) | `:root` and `.dark` custom properties in `globals.css`; exposed to Tailwind as `bg-surface`, `text-muted`, `border-default`, and similar |
| Type scale (5.2) | `fontSize` entries in `tailwind.config.mjs` carrying size, line height, tracking, and weight together |
| Spacing and container (6) | `.container-page` primitive in `globals.css`; section padding applied by `ui/Section` |
| Radii (7.1) | `borderRadius` theme keys `sm` / `md` / `lg`; `rounded-full` is not available in the system |
| Shadows (8) | `--shadow-sm` and `--shadow-md`, theme-aware, exposed as `shadow-sm` and `shadow-md` |
| Icons (9) | `@phosphor-icons/react`, imported per-glyph |
| Buttons (10) | `ui/Button` |
| Forms (11) | `ContactForm` plus the `.field-input` primitive |
| Cards (13) | `ProjectCard` and the contact form panel. Nothing else |
| Navigation (15) | `NavBar` |
| Motion (19) | `ui/Reveal` plus the duration and easing custom properties |
| Z-index scale (19) | Documented values only; no arbitrary `z-*` in components |

The flow is one-directional: `design_system.md` defines a token, `globals.css` implements it, `tailwind.config.mjs` names it, a component consumes it. A component never introduces a value that is not in the design system.

## 11. Architectural decisions

### ADR-001 - Delete the loading screen rather than optimise it
**Decision.** Remove `LoadingScreen` entirely.
**Context.** It blocked all content behind roughly 3.5s of typewriter animation on every visit, including repeat visits.
**Rationale.** The primary audience is a recruiter comparing many portfolios. A blocking splash costs LCP, costs crawlable first paint, and spends the visitor's attention before any content is delivered. There is no shortening of it that makes it a net positive.
**Consequence.** Content is the first paint. The "click to skip" affordance, which existed only to undo the component's own cost, goes with it.

### ADR-002 - Stay on Tailwind v3
**Decision.** Do not migrate to Tailwind v4 as part of this rehaul.
**Context.** The project runs Tailwind 3.4 with the PostCSS plugin and a `.mjs` config.
**Rationale.** A v4 migration changes the PostCSS pipeline, the configuration format, and a set of utility names. None of that moves any goal in `PRD.md`. Coupling a toolchain migration to a design rehaul means a regression in either one is hard to attribute.
**Consequence.** Tokens are defined as CSS custom properties and referenced from the v3 config, which is forward-compatible: a later v4 migration can adopt `@theme` without rewriting a single component.

### ADR-003 - Semantic CSS custom properties, not Tailwind `dark:` pairs
**Decision.** Theme through custom properties that swap under `.dark`, rather than pairing every utility with a `dark:` variant.
**Context.** The previous build carried roughly 180 `dark:` variants across nine components.
**Rationale.** Paired variants mean every colour decision is made twice, in two places, by hand. Drift is inevitable, and A15 is evidence that it happened. A semantic token is decided once and verified once.
**Consequence.** `bg-surface` is correct in both themes by construction. The trade-off is one layer of indirection between the utility name and the hex value, which `design_system.md` documents.

### ADR-004 - Server Components by default, client islands at the leaves
**Decision.** Invert the client boundary. `page.js` becomes a Server Component.
**Rationale.** Four of the five sections are static content. Shipping them as client JS bought nothing.
**Consequence.** `Reveal` exists specifically so a section can animate without becoming a client component. Interactivity is confined to `NavBar`, `ThemeToggle`, and `ContactForm`.

### ADR-005 - Remove proficiency percentages
**Decision.** Replace 21 numeric skill ratings and their progress rings with four named domain groups.
**Rationale.** The numbers were self-assigned and unverifiable. Technical readers discount them, and they displaced the information that is actually useful: which tools he works with, grouped so they can be scanned. The rings were also the heaviest render on the page.
**Consequence.** The `level` field is dropped from the data model. Skills become `{ group, items[] }`. The "Tools I use" content that previously duplicated inside About is absorbed into the Tooling group.

### ADR-006 - One icon family: Phosphor
**Decision.** Standardise on `@phosphor-icons/react`; remove `react-icons`, `lucide-react`, and the hand-drawn SVG.
**Rationale.** Three families meant three stroke weights and three optical sizes in one viewport. `lucide-react` was a dependency with zero imports.
**Consequence.** One weight (`regular`) and a four-step size scale. Brand glyphs for GitHub, LinkedIn, Instagram, Facebook, and Behance all exist in Phosphor, so nothing needed hand-drawing.

### ADR-007 - Inline form status instead of toasts
**Decision.** Remove `react-toastify`; render submission status inside the form in an `aria-live` region.
**Rationale.** A toast is transient and anchored to a corner. The user who just submitted is looking at the form. A toast that auto-dismisses can be missed entirely, and failure is the state that must not be missed.
**Consequence.** One fewer dependency and one fewer stylesheet. The status message persists until the user acts again.

### ADR-008 - Cover-image slot built, content pending
**Decision.** Build `ProjectCard` around an optional `cover` field, with a designed typographic fallback.
**Context.** `public/project_*.png` are logos from projects no longer listed, and `assets.project_*` was never exported, so every reference resolved to `undefined`.
**Rationale.** Hand-built fake screenshots assembled from `div` elements are the clearest tell of a generated interface. A deliberate typographic tile is honest about the absence and still composes well.
**Consequence.** Dropping six screenshots into `public/projects/` and filling the `cover` field upgrades the section with no code change. Tracked in `PRD.md` section 9.

### ADR-009 - Remove the floating back-to-top button
**Decision.** Delete `BackToTop`; the logo is the single return-to-top affordance.
**Rationale.** The header is fixed and visible at every scroll position and every breakpoint, and a logo that returns to the top is a convention users already hold. Two permanently-floating controls for one destination is redundancy, and the floating button added a fourth fixed element competing for the same corner.
**Consequence.** One fewer scroll listener, one fewer z-index participant, and a clear bottom-right corner.

### ADR-010 - Freeze the information architecture
**Decision.** Anchor IDs and nav labels do not change.
**Rationale.** Links to `#projects` and `#contact` already exist in job applications, in the README, and in social profiles. Breaking them to satisfy a naming preference trades real reach for nothing.
**Consequence.** The Skills section is restructured but keeps `#skills` and the label "Skills". The duplicate `id="hero"` wrapper is removed in favour of the `#home` that the navigation actually targets.

### ADR-011 - Remove both portraits
**Decision.** Drop the hero and About photographs; the hero becomes type-led.
**Rationale.** The portrait duplicated what the resume and LinkedIn already carry, and in the hero it competed with the one thing that screen has to deliver, which is what this person builds. The remaining graduation portrait also dated the candidate as a new graduate.
**Consequence.** The hero is an editorial composition, full container width, headline capped at 18ch so it holds two lines at the top of the display scale. `public/hero_img.png` is retained as the Open Graph image, where a face is useful in a link preview and does not compete with anything.

### ADR-012 - Split projects into professional and personal
**Decision.** Two labelled groups rather than one list.
**Rationale.** Paid client work and personal projects answer different questions for a recruiter, and shuffling them together hides the stronger signal. It is also the honest frame for redacted work: the group label explains the absence of links.
**Consequence.** Professional entries carry a "What I built" note instead of a repository link and a lock-marked status. `projects` became `professionalProjects` and `personalProjects` in `app/data/site.js`.

### ADR-013 - Bento grid for personal projects
**Decision.** A six-column bento with authored spans, replacing the uniform card grid.
**Rationale.** Equal cards gave six comparable projects no hierarchy and read as a template. Spans of 4+2, 3+3, 2+4 give the grid rhythm while filling every row exactly, so no cell is ever empty.
**Consequence.** `span` is authored per project in the data. The span-to-class map is written out in full in `ProjectCard.jsx`, because Tailwind scans for literal class strings and would generate nothing from an interpolated `lg:col-span-${n}`. Below `lg` the spans are ignored: one column at mobile, two at `sm`.

### ADR-014 - Reduced motion is enforced in CSS, not only in JavaScript
**Decision.** Keep `useReducedMotion()` in `ui/Reveal`, and add a `[data-reveal]` rule in `globals.css` that forces the end state with `!important`.
**Context.** Testing with `prefers-reduced-motion: reduce` found five reveal wrappers in the projects section stranded at `opacity: 0`, permanently invisible.
**Rationale.** The hook does not always resolve before the motion element mounts. When it loses that race the element mounts at `opacity: 0`, the animation is skipped, and the content never appears. A CSS rule with `!important` beats Motion inline styles and cannot lose a race.
**Consequence.** Two mechanisms guard the same failure, deliberately. `.media-zoom` has the same treatment for the bento hover transform. Neither half may be removed without the other.

### ADR-015 - Real screenshots, captured from the live deployments
**Decision.** Capture covers from the deployed apps with Playwright rather than shipping placeholders.
**Rationale.** The Taste Skill requires real visual variation in a bento, and a tile grid carrying no imagery reads as the generated default it is trying not to be.
**Consequence.** Three covers are live (`travelis`, `hakomovies`, `kapetabi`). Three are not, and each for a reason worth knowing: two hosts are unreachable to an automated client, and one app has an empty database. Those render text-only tiles, which is why the component supports a null cover at all. Tracked in `PRD.md` section 9.

### ADR-016 - Build configuration for a fully static page
**Decision.** Pin `turbopack.root`, enable `optimizePackageImports` for the icon package, serve AVIF and WebP, and cache images for a year.
**Rationale.** Every route prerenders, so there is no request-time render to tune; the only lever is what ships to the browser. The icon barrel was the largest avoidable client import. A lockfile above the project made Next infer the wrong workspace root and warn on every build.
**Consequence.** Clean build output, and screenshots served in modern formats.

### ADR-017 - Remove the contact form
**Decision.** Delete the form and the Web3Forms integration. Contact is direct channels only, with email promoted to heading scale.
**Rationale.** No access key was configured, so the form could not send. A contact form that fails silently costs more than no form: the visitor believes they have made contact and stops.
**Consequence.** One fewer client island, one fewer third-party boundary, and no environment variables required to run the site. `ContactForm.jsx`, `formFields`, the `.field-input` primitive and `.env.example` are all gone. If a form returns, prefer a Route Handler with a server-side token and a honeypot over a publishable client key.

### ADR-018 - One animation library: GSAP, and Motion removed
**Decision.** Rewrite the navigation in GSAP and drop the `motion` dependency.
**Context.** After GSAP arrived for scroll choreography, Motion remained solely for the nav underline (`layoutId`), the drawer (`AnimatePresence`) and a scroll threshold (`useScroll`).
**Rationale.** Two animation libraries competing for the same frames is the exact thing the Taste Skill warns against, and `motion` was the single largest client dependency. Shipping both to animate one underline could not be justified.
**Consequence.** Initial JS fell from 594KB to 313KB, roughly 47 percent. The underline is positioned imperatively against the active link rather than by `layoutId`. The drawer stays mounted and is hidden with `inert`, which keeps open and close symmetrical and avoids an exit-animation race. The header scroll state now comes from a 1px IntersectionObserver sentinel instead of a scroll subscription.

### ADR-019 - Motion start states live in CSS, gated on a class
**Decision.** Reveal elements start hidden via CSS gated on `js-motion`, a class the pre-paint script adds only when the user has not requested reduced motion.
**Rationale.** Hiding in inline styles means a skipped animation leaves content permanently invisible, which is exactly the bug ADR-014 records. Gating in CSS inverts the failure mode: no JS, or reduced motion, and the class is simply absent, so everything renders visible.
**Consequence.** Three paths all degrade to readable content: reduced motion, a JS failure, and a GSAP import that never resolves. Verified in both modes with zero stranded elements.

### ADR-020 - Unix terminal direction, and DENSITY raised to 8
**Decision.** Re-skin to a unix-terminal language and raise `VISUAL_DENSITY` from 4 to 8.
**Context.** The editorial build read as calm but empty: large white fields, generous padding, long gaps between content.
**Rationale.** Monospace display type, `~/path` section labels and a shell prompt give the page an identity that is native to the audience, and cockpit density removes the empty fields. The Taste Skill names "dark tech / hacker" as a legitimate aesthetic family with no official package, built from native CSS.
**Consequence.** Container widened to 78rem and gutters tightened; section padding roughly halved; light `--bg` deepened from `#f7f7f8` to `#ececed` so no part of the page is a blank white field. All 20 sampled colour pairs re-verified against the new palette and pass AA in both themes.

### ADR-021 - One global background texture, not per-section decoration
**Decision.** A single fixed grid on `body::before`, plus a two-value alternating section ground.
**Rationale.** The Taste Skill allows texture but requires it on a fixed, `pointer-events-none` layer, never on scrolling containers, because a repainting texture destroys mobile frame rate. One layer for the whole page also keeps it a material rather than decoration bolted onto each block.
**Consequence.** `html` carries the page background and `body` is transparent so the fixed layer can sit behind content at `z-index: -1`. Section alternation uses `nth-of-type(even)` with `--surface-alt`, which stays inside the active theme family so the page never inverts mid-scroll.

### ADR-022 - A hero meta block, overriding the four-element cap
**Decision.** Add a key/value readout to the hero, in the manner of a shell system-info command.
**Rationale.** The Taste Skill caps the hero at four text elements, written for marketing pages where a fifth is usually filler. At DENSITY 8 a dead half-screen is the larger defect. The block earns its place by holding what the left column does not.
**Consequence.** `focus` and `availability` were **removed from `about.facts`** so the two blocks stay disjoint: the hero says what he does now, About gives background. About's fact grid dropped from four cells to two and its grid from 4-column to 2-column, so it still fills exactly.
