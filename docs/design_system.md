# Design System - dev.haku Portfolio

**Scope:** every surface of the single-page portfolio.
**Authority:** this file defines the tokens. `app/globals.css` implements them. `tailwind.config.mjs` exposes them. Components consume them and never redefine them.
**Last reviewed:** 2026-10-04

---

## 1. Design read and dials

> **Reading this as:** a developer portfolio for hiring managers and engineering leads, with an **editorial-technical** language, leaning toward Tailwind plus Geist and Geist Mono, a single-accent token system, and restrained, motivated motion.

**Mode:** Redesign - overhaul. The visual language is rebuilt; content, information architecture, anchors, nav labels, and the blue brand hue are preserved.

| Dial | Before | After | Reason |
|---|---|---|---|
| `DESIGN_VARIANCE` | 2 | **8** | Every section was centred and identically composed. The page had no landmarks. The bento and the directional reveals need the headroom. |
| `MOTION_INTENSITY` | 7 | **8** | Raised deliberately after the rehaul landed. The old motion blocked content and fought the pointer; this is scroll choreography that serves reading order. Every instance is listed in section 19 with its reason. |
| `VISUAL_DENSITY` | 4 | **8** | Raised for the terminal direction (ADR-020). Cockpit density: tight padding, 1px rules instead of boxes, monospace carrying structure. Large empty fields are the thing this direction exists to remove. |

## 2. Design principles

1. **Hierarchy before decoration.** If something is more important, it is larger, heavier, or higher on the page. Never a gradient, a glow, or a badge.
2. **A container must earn itself.** Group with spacing and hairlines first. A card is used only where elevation communicates that the content is a separate, actionable object.
3. **Honest information.** No invented figures, no proficiency percentages, no fake scarcity, no "trusted by" without customers.
4. **One of each.** One accent, one neutral family, one type pairing, one icon family, one container width, one radius scale, one motion library.
5. **The page is the work sample.** Speed, keyboard support, and contrast are design decisions, not engineering afterthoughts.
6. **Both themes are the real product.** Nothing ships verified in only one.

## 3. Visual direction

Unix terminal. A shell session rather than a marketing page. Characterised by:

- **Monospace is structural, not decorative.** It carries the hero headline, every section heading, and all metadata. A developer's actual medium used as the display face.
- **Shell motifs that hold real content.** The hero prompt (`raul@dev.haku:~$ whoami`) and the `~/about` path labels name things in the page's own idiom. No fake terminal window built out of divs: the Taste Skill bans that in 4.8 and it is a different thing from using the idiom honestly.
- **One global background texture.** A fixed engineering grid behind all content, `pointer-events-none`, painted once rather than bolted onto each section. Sections alternate between two grounds inside the same theme family so no band of the page is a blank field.
- Left-aligned, asymmetric composition with a consistent left edge.
- Hairline rules doing the grouping that cards used to do.
- One accent, for interaction and a single point of emphasis.

**Explicitly retired:** blurred radial glow blobs, translucent `backdrop-blur` on every container, pill badges, animated status dots, gradient text, the custom cursor, the typewriter splash screen, decorative flag emoji, and uppercase tracked eyebrows (replaced by `~/path` labels).

**Deliberately not adopted,** despite being terminal clichés: scanlines over text (they cost legibility for nothing), CRT curvature, hacker-green, blinking cursors, and fake `$ ls` output listing things that are not files. The brand blue stays; the direction comes from type and structure, not from a colour swap.

## 4. Color system

Implemented as CSS custom properties on `:root` and `.dark`, surfaced to Tailwind as semantic names. **Components use semantic tokens only.** No raw hex, no `zinc-800`, no `blue-600` in component code.

### 4.1 Tokens

| Token | Light | Dark | Use |
|---|---|---|---|
| `--bg` | `#F7F7F8` | `#0A0A0B` | Page background |
| `--surface` | `#FDFDFD` | `#121214` | Raised panels, cards, form container |
| `--surface-sunken` | `#EFEFF1` | `#1A1A1D` | Inputs, inset wells, image frame backing |
| `--border` | `#E4E4E7` | `#26262A` | Hairlines, dividers, card edges |
| `--border-strong` | `#8E8E99` | `#5E5E66` | Form-control boundaries (3:1 non-text contrast) |
| `--text` | `#18181B` | `#FAFAFA` | Headings and primary body |
| `--text-muted` | `#52525B` | `#A1A1AA` | Secondary body, descriptions |
| `--text-subtle` | `#6B6B75` | `#808089` | Metadata, mono labels, captions |
| `--accent` | `#1D4ED8` | `#6E97F7` | Links, active state, focus ring, single emphasis |
| `--accent-weak` | `#E8EDFC` | `#161C2E` | Accent-tinted backing, used sparingly |
| `--invert-bg` | `#18181B` | `#FAFAFA` | Primary button fill |
| `--invert-text` | `#FAFAFA` | `#0A0A0B` | Primary button label |
| `--danger` | `#B42318` | `#F97066` | Form error text and error border |

### 4.2 Verified contrast

Measured against the token's own background. WCAG 2.1 AA requires 4.5:1 for body text, 3:1 for large text and UI boundaries.

| Pair | Light | Dark |
|---|---|---|
| `--text` on `--bg` | 16.6:1 | 19.0:1 |
| `--text-muted` on `--bg` | 7.2:1 | 7.7:1 |
| `--text-subtle` on `--bg` | 4.9:1 | 5.1:1 |
| `--accent` on `--bg` | 6.3:1 | 7.0:1 |
| `--invert-text` on `--invert-bg` | 17.0:1 | 19.0:1 |
| `--border-strong` on `--bg` | 3.0:1 | 3.1:1 |
| `--text-muted` on `--surface-sunken` (stack tags) | 6.7:1 | 6.8:1 |

Every pair clears AA; body-weight pairs clear AAA. The accent is legible as text in both themes, which is why it can serve as link colour, active-state colour, and focus ring with a single value per theme.

### 4.3 Colour rules

- **One accent.** Blue is the inherited brand hue and it stays. It is never used as a decorative background, a glow, a gradient, or a border on resting elements.
- The accent has exactly four jobs: link text, active navigation state, focus ring, and one emphasised word in the hero headline.
- **The primary button is neutral-inverted,** not accent-filled: near-black on light, near-white on dark. This guarantees maximum contrast in both themes and keeps the accent from becoming the generic glowing-blue CTA.
- Shadows are tinted with the neutral hue (`24 24 27`), never pure black.
- No gradients. The only permitted gradient is none.
- `--danger` is a semantic state colour, not a second accent. It appears only on invalid form fields and their messages.

## 5. Typography

### 5.1 Families

| Role | Family | Loaded via |
|---|---|---|
| Display and body | **Geist** | `next/font/google`, variable `--font-sans` |
| Metadata, labels, stack names | **Geist Mono** | `next/font/google`, variable `--font-mono` |

Geist replaces Poppins. Poppins is a geometric display face that reads as consumer marketing; at body sizes its wide round counters cost legibility. Geist is a neutral grotesque with a true monospace companion, which is what an editorial-technical direction needs. No serif is used: nothing in this brief is editorial-publication, luxury, or heritage.

### 5.2 Scale

| Token | Size | Line height | Tracking | Weight | Use |
|---|---|---|---|---|---|
| `display` | `clamp(2.5rem, 1.1rem + 5.4vw, 4.25rem)` | 1.04 | -0.03em | 600 | Hero headline, once per page |
| `h2` | `clamp(2rem, 1.5rem + 2vw, 2.75rem)` | 1.1 | -0.02em | 600 | Section headings |
| `h3` | `clamp(1.5rem, 1.25rem + 1vw, 2rem)` | 1.2 | -0.015em | 600 | Featured project title |
| `h4` | `1.25rem` | 1.3 | -0.01em | 600 | Project card title, sub-headings |
| `lead` | `clamp(1.0625rem, 1rem + 0.3vw, 1.1875rem)` | 1.6 | 0 | 400 | Hero and section intro paragraphs |
| `body` | `1rem` | 1.65 | 0 | 400 | Default body |
| `body-sm` | `0.875rem` | 1.6 | 0 | 400 | Card descriptions, helper text |
| `label` | `0.75rem` | 1.4 | 0.08em | 500 | Mono uppercase labels |

### 5.3 Typographic rules

- Exactly one `<h1>` per page. Heading levels never skip.
- Prose measure is capped at `65ch`; the hero lead is capped at `44ch` so it never exceeds three lines.
- Monospace is for labels, stack names, and metadata. Never for running prose.
- Emphasis inside a headline uses colour or weight of the **same family**. Never a second font family, never italic plus a different face.
- Uppercase is only ever applied to the `label` token, which carries the tracking that makes uppercase legible.
- No gradient text, no text shadows, no outlined text.

### 5.4 Section labels

Uppercase tracked eyebrows are gone. Each section carries one **path label** instead: a mono `~/about` rendered by the `.path-label` primitive, where the `~/` is an `::before` in the accent colour.

One per section, and only via `Section`'s `path` prop. It is not decoration: it names the section in the page's own idiom and replaces, rather than adds to, the old eyebrow. Mono labels **inside** a section body (domain names in Skills, keys in the hero meta block, stack tags) are not section labels and are not budgeted.

## 6. Spacing

4px base unit. Only these steps are used.

| Step | Value | Typical use |
|---|---|---|
| 1 | 4px | Icon-to-text in dense controls |
| 2 | 8px | Label to input, tag gutters |
| 3 | 12px | Related inline items |
| 4 | 16px | Default internal padding, list-item gaps |
| 5 | 20px | Mobile page gutter |
| 6 | 24px | Card padding, grid gaps |
| 8 | 32px | Sub-group separation, desktop gutter |
| 10 | 40px | Large gutter at `lg` |
| 12 | 48px | Heading to content |
| 16 | 64px | Major block separation |
| 20 | 80px | Section padding, mobile |
| 28 | 112px | Section padding, desktop |

### 6.1 Layout container

**One container width for the entire site.** The previous build alternated between `max-w-3xl`, `5xl`, `6xl`, and `7xl`, so text edges moved on every scroll.

```
max-width: 78rem (1248px)
padding-inline: 16px → 24px (sm) → 32px (lg)
```

Wider and tighter than the editorial build: at DENSITY 8 content runs closer to the rules that organise it.

Hero may extend its image to the container edge. Nothing extends beyond it except full-bleed borders.

### 6.2 Section rhythm

- Section padding: `56px` block, rising to `80px` at `md`.
- Section heading to body: `32px`.
- Adjacent sections are separated by a top hairline, not by a background change. Background changes between sections are banned; see the theme lock in section 18.

## 7. Borders and radii

### 7.1 Radii - the documented rule

Three steps. Every element maps to exactly one.

| Token | Value | Applies to |
|---|---|---|
| `sm` | 4px | Stack tags, small inline chips |
| `md` | 8px | Buttons, inputs, textareas, icon buttons, nav items |
| `lg` | 12px | Cards, panels, image frames, the form container |

**Fully-rounded (`rounded-full`) is not in the system.** Pill shapes read as status chips; nothing on this site is a status. This is the shape consistency lock: if an element is interactive it is 8px, if it is a container it is 12px, if it is a tag it is 4px. No exceptions without updating this table.

### 7.2 Borders

- Default border is `1px solid var(--border)`. It is a hairline, not an outline.
- Form controls use `var(--border-strong)` so the control boundary itself meets 3:1.
- Dividers use the same hairline. Never apply both `border-t` and `border-b` to rows of the same list; pick one edge.

## 8. Shadows

Elevation is deliberately shallow. In dark mode a shadow is nearly invisible, so **depth is carried by the surface-value step plus the hairline**, and shadows only reinforce it.

| Token | Light | Dark |
|---|---|---|
| `--shadow-sm` | `0 1px 2px rgb(24 24 27 / 0.04)` | `0 1px 2px rgb(0 0 0 / 0.4)` |
| `--shadow-md` | `0 4px 12px rgb(24 24 27 / 0.06), 0 1px 2px rgb(24 24 27 / 0.04)` | `0 4px 14px rgb(0 0 0 / 0.5)` |

Rules: shadows are tinted to the neutral hue, never pure black on light. No coloured shadows, no glows, no `shadow-blue-500/30`. `--shadow-md` appears only on hover of an interactive card.

## 9. Icons

- **Family:** `@phosphor-icons/react`. Single family, no exceptions. `react-icons`, `lucide-react`, and hand-rolled SVG paths have been removed.
- **Weight:** `regular` everywhere. `bold` is permitted only inside a filled primary button, where the heavier stroke is needed against the inverted fill.
- **Sizes:** `16` inline with `body-sm`, `18` inline with `body`, `20` for standalone icon buttons, `24` maximum.
- Icons are decorative by default and carry `aria-hidden`. An icon that is the sole content of a control requires an `aria-label` on the control.
- Never draw an icon by hand. If a glyph is missing, it does not go in.

## 10. Buttons

Three variants. No others.

| Variant | Light | Dark | Use |
|---|---|---|---|
| `primary` | `--invert-bg` fill, `--invert-text` label | inverted | The single most important action in a view |
| `secondary` | `--surface` fill, `--border-strong` edge, `--text` label | same tokens | Alternative action beside a primary |
| `ghost` | transparent, `--text-muted` label | same tokens | Icon buttons, nav controls, low-emphasis actions |

**Specification**

- Height: 44px default, 36px compact. Both clear the 44px touch target at their full hit area.
- Padding: `12px 20px` default.
- Radius: `md` (8px).
- Label: `body-sm`, weight 500. **Maximum three words, one line at every breakpoint.** A wrapped button label is a defect.
- Hover: `secondary` and `ghost` shift to `--surface-sunken`; `primary` drops to 92% opacity.
- Active: `translate-y-[1px]`. This is the tactile feedback for every button.
- Focus: `outline: 2px solid var(--accent); outline-offset: 2px`.
- Disabled: 50% opacity, `cursor: not-allowed`, `aria-disabled`.

**Contrast check:** `primary` is 17.0:1 light and 19.0:1 dark. `secondary` label is 16.6:1 and 19.0:1. No button relies on a background image or a translucent fill for its contrast.

**CTA intent:** one label per intent across the whole page. The contact intent is **"Get in touch"**, used in the hero and as the contact heading. "Let's talk", "Contact me", and "Reach out" do not appear. "Send message" is the form's submit action, a different intent, and is permitted.

## 11. Forms

The site has no forms. The contact form was removed in ADR-017: it had no credentials behind it, so it could not send, and a form that silently fails is worse than no form.

If one returns, the rules are: label above the input bound with `htmlFor`/`id`, never placeholder-as-label; `--surface-sunken` fill with a `--border-strong` edge at radius `md` and 44px minimum height; a 2px accent focus ring at 2px offset; errors in `--danger` below the field, linked by `aria-describedby` with `aria-invalid` on the control; validation on blur and again on submit, never on every keystroke; and the result announced in a persistent `aria-live` region rather than a toast, because the person who just submitted is looking at the form.

## 12. Tables

The site contains no tabular data and should not acquire any. If a future comparison is needed, use a definition list or a two-column grid. Should a genuine table become necessary: `<caption>`, `<th scope>`, hairline row separators on one edge only, mono numerals with `tabular-nums`, right-aligned numeric columns, and horizontal overflow contained in its own scroll region so the page body never scrolls sideways.

## 13. Cards

A card is justified only when its content is **a separate object the user can act on**. On this site that is true in exactly two places: a project tile and the contact form panel.

**Specification**

- `--surface` fill, 1px `--border`, radius `lg`, padding 20-24px.
- Hover: border shifts to `--border-strong` over 200ms. This is a grouping cue, not a click affordance: a tile holds two distinct links (repository and live demo), so the tile itself is never a single click target.
- No `backdrop-blur`. No translucent fills. No accent-tinted borders at rest.

**Bento media frame.** A tile with a cover clips it: `overflow-hidden` on the frame, and the image scales to 1.06 over 700ms on tile hover. The screenshot moves behind a fixed window, so nothing reflows and no neighbour is disturbed. The image carries `.media-zoom`, which `globals.css` uses to drop the transform entirely under reduced motion, because the global transition override would otherwise make the scale snap instead of animate.

**Media aspect follows span,** which is what gives the bento its rhythm: span 4 is `16/9`, span 3 is `16/10`, span 2 is `4/3`.

**A missing cover renders a text-only tile.** Never a grey placeholder box, and never a screenshot assembled from `div` elements.

**Not cards:** About facts, skill groups, contact channels, and footer content. These are grouped with hairlines and spacing, which is the system default.

## 14. Modals

The site has one overlay surface: the mobile navigation drawer. There are no dialogs.

**Drawer specification**

- Right-anchored, 288px wide, full height, `--surface` fill, left hairline.
- Scrim: `rgb(0 0 0 / 0.5)`, closes on click.
- Focus moves into the drawer on open and returns to the trigger on close. Focus is trapped while open.
- `Escape` closes. Background scroll is locked while open.
- `role="dialog"`, `aria-modal="true"`, `aria-label="Site navigation"`.
- Enters by translating on the x-axis over 200ms; reduced motion renders it instantly.

## 15. Navigation

- Fixed to the top, full width, `z-index: 50`, height 64px.
- Transparent at the top of the page; at scroll it gains `--surface` at 80% with a backdrop blur and a bottom hairline. This is the only use of backdrop blur on the site, and it earns itself: it keeps the nav legible over arbitrary content beneath.
- Single line at desktop, always. Five links at `body-sm`.
- **Active state is derived from scroll position** using `IntersectionObserver`, never from click state. The active link takes `--text` plus a 2px accent underline; inactive links take `--text-muted`.
- Below `md`, links collapse to the drawer in section 14. The logo and the theme toggle remain visible at every width.
- The logo is the only return-to-top affordance. The previously separate floating back-to-top button is removed: two controls for one destination is redundant, and the logo is always on screen.

## 16. Empty, loading, and error states

| Surface | State | Treatment |
|---|---|---|
| Page load | - | **No loading state exists.** The page is server-rendered; content is the first paint. A splash screen is a defect, not a feature. |
| Project cover image | absent | A designed typographic tile on `--surface-sunken`: project name in mono, stack beneath. Not a grey box, and not a fake screenshot built from divs. |
| Project cover image | loading | `next/image` with explicit dimensions reserves the box, so nothing shifts. |
| Contact form | submitting | Button label changes to "Sending", button disables, an inline spinner-free progress message appears in the live region. |
| Contact form | succeeded | Form resets; a persistent success message replaces the submit affordance until the user edits a field again. |
| Contact form | failed | Persistent error message naming the cause, with the email address as a fallback path. |
| Contact form | unconfigured | Form is replaced by a notice with a direct mailto link. |

## 17. Responsive behavior

Breakpoints: `sm 640`, `md 768`, `lg 1024`, `xl 1280`. Supported from **320px**.

| Section | `< 768px` | `>= 768px` |
|---|---|---|
| Header | Logo, theme toggle, menu button. Links in drawer. | Logo, five links, theme toggle. One line. |
| Hero | Single column, type-led. | Full-width editorial. Headline capped at 18ch so it holds two lines. |
| About | Single column. Bio, then facts stacked. | Bio at prose measure; facts as a 4-cell strip with shared hairlines. |
| Skills | One group per row, stacked. | 2 columns at `sm`, 3 at `lg`. Six groups fill both exactly. |
| Projects | Single column tiles. | 2 equal columns at `sm`; the authored 6-column bento spans from `lg`. |
| Contact | Single column. Channels, then form. | 5fr channels / 7fr form. |
| Footer | Stacked, centred. | Single row, space-between. |

Rules:

- Full-height regions use `min-h-[100svh]`, never `h-screen`. The iOS address bar makes `100vh` wrong.
- Multi-column layouts are built with CSS Grid, never with flexbox percentage arithmetic.
- Every multi-column layout declares its single-column fallback in the same component.
- Horizontal overflow on `<body>` is a defect. Wide content scrolls inside its own container.
- Pinch zoom is never restricted. `maximum-scale` does not appear in the viewport configuration.

## 18. Accessibility

Target: **WCAG 2.1 AA**, with AAA on body text contrast where the tokens already reach it.

- Landmarks: one `<header>`, one `<main>`, one `<footer>`, and a `<section>` per anchor, each labelled by its heading via `aria-labelledby`.
- A skip link is the first focusable element and becomes visible on focus.
- `:focus-visible` is 2px `--accent` at 2px offset on every interactive element. Focus styles are never removed.
- Keyboard: full traversal, logical order, no traps outside the drawer, which traps intentionally and releases on close.
- The system cursor is never hidden, replaced, or overridden.
- Every image has meaningful `alt`, or `alt=""` when purely decorative.
- Icon-only controls carry an `aria-label`.
- External links announce their destination; "opens in a new tab" is conveyed in the accessible name.
- Colour is never the only carrier of meaning: the active nav item has an underline as well as a colour change, and form errors have text as well as a red border.
- `prefers-reduced-motion: reduce` disables every transform and opacity transition on the site. The reduced-motion path is tested, not assumed.

### Theme lock

The page is one theme at a time. No section inverts, no section introduces a background outside the active theme's surface family. Theme resolves before first paint through a blocking inline script; there is no flash.

## 19. Interaction and motion

`MOTION_INTENSITY: 8`. GSAP ScrollTrigger plus Lenis smooth scroll. Still no scroll hijack, no pinning, no parallax, no infinite loops, no marquees: raising the dial bought choreography, not gimmicks.

**One animation library.** GSAP, everywhere. Motion was removed entirely (ADR-018), which settles the Taste Skill rule against mixing the two and cut 281KB from the initial bundle.

### Tokens

| Token | Value | Use |
|---|---|---|
| `--dur-fast` | 120ms | Hover, active, colour change |
| `--dur-base` | 200ms | Open, close, state transition |
| `--dur-slow` | 500ms | Entrance reveal |
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Entrances |
| `--ease-inout` | `cubic-bezier(0.4, 0, 0.2, 1)` | State transitions |
| stagger | 60ms | Sequential reveals, capped at 6 steps |

### The motion inventory

Every animation on the site, and the one-sentence reason it exists. Anything not on this list does not ship.

| Motion | Reason |
|---|---|
| Hero headline slides out of a mask, then the supporting lines follow | Establishes reading order on the one screen where nothing else sets priority. |
| Sections reveal once on scroll into view, from a direction that matches their position | A left column enters from the left, a right column from the right, so motion traces the layout instead of cutting across it. |
| Section headings slide out of a clip rather than fading | Gives each section a clear opening beat, so scrolling feels sectioned rather than continuous. |
| Nav active underline slides between items | Shows the relationship between the previous and current section rather than blinking between two states. |
| Hero CTAs and the email arrow lean toward the pointer | Confirms the pointer has acquired the control before the click, on the two actions the page exists to drive. |
| Lenis smooths the scroll itself | Makes the scroll-linked reveals read as one continuous surface rather than stepping with the wheel. Disabled entirely under reduced motion. |
| Buttons and links depress 1px on `:active` | Confirms the press landed. |
| Project card border and elevation shift on hover | Communicates that the whole card is a single click target. |
| Drawer translates in from the right | Shows where the panel came from, so the close affordance is predictable. |
| Bento cover scales 1.06 inside its clip on tile hover | Confirms which tile the pointer owns, and shows more of the screenshot without changing the layout. |

### Rules

- Animate `transform` and `opacity` only. Never `width`, `height`, `top`, or `left`. The nav underline animates `width`, which is the single documented exception: it is one 2px element, measured once per active-section change, not per frame.
- Pointer and scroll values never enter React state. `gsap.quickTo` writes straight to the transform.
- GSAP and Lenis are dynamically imported in every leaf that uses them, so neither reaches the initial bundle.
- Entrance reveals use opacity plus a 16px y-offset. **No scale on text**, which causes sub-pixel blur during the transition.
- `whileInView` always carries `once: true`. Content does not re-animate on every pass.
- `window.addEventListener('scroll')` is banned. Use `IntersectionObserver` or Motion's `useScroll`.
- Continuous pointer or scroll values never enter React state. Use `useMotionValue` and `useTransform`.
- Every animated component calls `useReducedMotion()` and degrades to a static, fully-visible end state.
- `useEffect` subscriptions clean up on unmount, without exception.

### Z-index scale

The only permitted values. No arbitrary `z-50` scattered through components.

| Layer | Value |
|---|---|
| Content | `auto` |
| Sticky section affordances | `10` |
| Drawer scrim | `40` |
| Header | `50` |
| Drawer | `60` |
| Skip link when focused | `70` |
