# agents.md - Instructions for AI agents working on this repository

Read this before writing any code. Then read `design_system.md` before writing any markup.

**Document order of authority:** `PRD.md` (what and why) → `design_system.md` (how it looks) → `architecture.md` (how it is built) → this file (how to work). If an instruction here conflicts with one of those, those win, and you should fix this file.

---

## 1. Project context

A single-page personal portfolio for Raul B. Barquilla Jr., a full-stack developer in the Philippines, published as `dev.haku`.

- **Audience:** technical recruiters, engineering leads, and prospective clients. Task-driven, impatient, arriving cold. Not an audience looking to be entertained.
- **Job of the site:** turn a 30-second scan into a resume download, an email, or a GitHub click.
- **Stack:** Next.js 16 App Router, React 19, Tailwind CSS 3.4, GSAP 3 with ScrollTrigger, Lenis, Phosphor Icons 2. JavaScript, not TypeScript. **Motion was removed; do not reintroduce it** (ADR-018).
- **Deployment:** Vercel.
- **Design direction:** editorial-technical. Dials are `DESIGN_VARIANCE 6`, `MOTION_INTENSITY 4`, `VISUAL_DENSITY 4`. These are reasoned in `design_system.md` section 1; do not silently move them.

The repository has `.claude/skills/taste-skill/` installed. Its anti-slop rules are the baseline for any UI work here and the pre-flight checklist in section 8 is derived from it.

## 2. Coding conventions

### Language and files
- JavaScript with JSX. `.jsx` for components, `.js` for everything else. Do not introduce TypeScript without updating `architecture.md`.
- Components are `PascalCase.jsx` and use a default export. Data and utility modules use named exports.
- Import alias `@/` maps to the repository root (`jsconfig.json`).
- Two-space indent, single quotes, semicolons. Match the surrounding file.

### Server and client components
- **Server Component is the default.** Do not add `'use client'` to a file unless it uses state, an effect, a ref, a browser API, or an event handler.
- Push `'use client'` to the smallest possible leaf. If a section needs one animated wrapper, wrap it in `ui/Reveal`; do not convert the section.
- A client component may receive server-rendered `children`. Use that instead of converting a subtree.
- Currently client: `NavBar`, `ThemeToggle`, `ContactForm`, `ui/Reveal`, `context/ThemeContext`. Adding a sixth needs a reason you can state in one sentence.

### State
- `useState` or `useReducer` at the smallest scope that works.
- No global state library. Theme is the only context, and it is genuinely cross-cutting.
- **Never put continuous pointer or scroll values in React state.** Use `useMotionValue` and `useTransform` from `motion/react`.
- **`window.addEventListener('scroll')` is banned.** Use `IntersectionObserver`, or `useScroll` from `motion/react`.
- Every `useEffect` that subscribes, observes, or times must return a cleanup function.

### Content
- **All copy and URLs live in `app/data/site.js`.** No string literals in components beyond structural markup and `aria-label` text.
- `site.js` is pure data: no JSX, no icon imports, no components. Icons are selected in the rendering component from a string key.
- Adding a project means adding an object to `site.js`. It must not mean touching `ProjectCard`.

### Dependencies
- Check `package.json` before importing anything. Never assume a package is installed.
- Adding a dependency requires a line in `architecture.md`. Removing one does too.
- Current intentional constraints: one icon family (`@phosphor-icons/react`), one motion library (`motion`), no UI component library, no CSS-in-JS.

## 3. UI/UX rules

These are rules, not preferences. Each one exists because of a defect found in the audit (`architecture.md` section 1) or a rule in the Taste Skill.

### Hard bans

| Banned | Why |
|---|---|
| Blocking splash, intro, or loading gate | ADR-001. Content is the first paint. |
| Custom cursors, `cursor: none` | Breaks caret and selection affordance; hostile to low-vision and assistive users. |
| `window.addEventListener('scroll')` | Unbatched per-frame work. Use `IntersectionObserver`. |
| `h-screen` for full-height regions | Mobile browser chrome makes `100vh` wrong. Use `min-h-[100svh]`. |
| Raw hex, `rgb()`, or palette utilities (`bg-zinc-800`, `text-blue-600`) in components | Tokens only. See section 4. |
| `rounded-full` | Not in the radius scale. Pills read as status chips; nothing here is a status. |
| Gradients, glows, coloured shadows, `backdrop-blur` | One documented exception: the scrolled header blur. |
| Em-dash (`—`) and en-dash (`–`) in any user-visible string | Use a hyphen, a comma, a colon, or two sentences. |
| Emoji in UI copy | Use a Phosphor glyph, or nothing. |
| Decorative status dots, animated pings, pill badges | Not semantic state, so not shown. |
| Invented statistics, percentages, proficiency scores, "trusted by" | ADR-005. Honesty is the product. |
| Hand-drawn SVG icon paths | Use Phosphor. If the glyph does not exist, the idea does not ship. |
| Fake product screenshots built from `div` elements | The single clearest tell of a generated interface. |
| `maximum-scale` in viewport config | WCAG 2.1 SC 1.4.4. |
| Three equal feature cards in a row | Use asymmetry, or hairline groups. |
| Toasts for form results | ADR-007. There is no form now (ADR-017), but the rule stands if one returns. |
| Importing `motion` / `framer-motion` | ADR-018. GSAP is the only animation library. Two of them fight over the same frames. |
| Importing GSAP or Lenis statically | They must be dynamically imported inside the leaf that uses them, or they land in the initial bundle. |
| Background texture on a scrolling container | ADR-021. One fixed, `pointer-events-none` layer only. A repainting texture destroys mobile frame rate. |
| Scanlines or CRT effects over text | Costs legibility for nothing. The terminal feel comes from type and structure. |
| Duplicating a fact between the hero meta block and About | ADR-022. The hero is what he does now; About is background. Keep them disjoint. |
| Hiding reveal start states in inline styles | ADR-019. Use the `js-motion` CSS gate, so a skipped animation degrades to visible content. |
| A live local-time or city strip in the header | Taste Skill 9.F. A single-location solo developer is exactly the case that rule targets. |
| An interpolated Tailwind class (`lg:col-span-${n}`) | Tailwind scans for literal strings and generates nothing. Use a lookup map of full class names. |
| An empty image box where a screenshot is missing | ADR-008. Render the text-only tile instead. |

### Required on every change

- **Both themes.** Verify light and dark. A change seen in only one theme is not finished.
- **Keyboard.** Tab to it, operate it, see the focus ring. `:focus-visible` is never removed.
- **Reduced motion.** Anything animated calls `useReducedMotion()` and degrades to a static, fully-visible end state.
- **Mobile fallback declared.** Every multi-column layout states its sub-768px behaviour in the same component. No "Tailwind will handle it".
- **Contrast.** Body text at 4.5:1, large text and UI boundaries at 3:1, in both themes. If you introduce a colour, compute the ratio and add it to the table in `design_system.md`.

### Composition rules

- **One container width.** `ui/Section` owns it. Do not set `max-w-*` on a section.
- **Layout families do not repeat.** Each of the five sections uses a distinct composition. Before adding a section, check that its layout is not already used.
- **No portraits of the site owner in the page body.** ADR-011. The hero is type-led.
- **One `~/path` label per section,** via `Section`'s `path` prop. Uppercase tracked eyebrows are retired (ADR-020).
- **One label per CTA intent.** The contact intent is "Get in touch", everywhere. Do not introduce "Let's talk", "Contact me", or "Reach out".
- **Cards only where elevation means something.** Project entries and the contact form panel. Everything else groups with hairlines and spacing.

## 4. Component usage guidelines

### Use the primitive, do not re-create it

| Need | Use | Never |
|---|---|---|
| Any button or call-to-action link | `ui/Button` | A hand-written `<a className="px-7 py-3.5 bg-...">` |
| A page section | `ui/Section` | A hand-built `<section>` with its own container and heading block |
| Scroll-reveal animation | `ui/Reveal` | A locally-defined `motion.div` with locally-defined variants |
| A stack or technology tag | `ui/Tag` | An inline `<span>` with tag classes |
| A project entry | `ProjectCard` | A bespoke card |
| Any image | `next/image` with explicit dimensions | `<img>` |

If a primitive does not fit, extend the primitive. Do not fork it inline. A utility string that appears three times is a missing component.

### `ui/Button`
```jsx
<Button href="#contact" variant="primary" icon="envelope">Get in touch</Button>
<Button href="/resume.pdf" variant="secondary" external>View resume</Button>
<Button variant="ghost" aria-label="Open menu" icon="list" />
```
Renders `<a>` when `href` is present, otherwise `<button>`. Pass `external` for off-site links; it applies `target`, `rel`, and the new-tab hint in the accessible name. Labels are three words maximum and must not wrap at any breakpoint.

### `ui/Section`
```jsx
<Section id="projects" title="Selected work" lead="Six shipped products...">
  {children}
</Section>
```
Emits the landmark, `aria-labelledby`, the container, the top hairline, and the section rhythm. The `eyebrow` prop exists but is budgeted; check section 3 before using it.

### `ui/Reveal`
```jsx
<Reveal delay={0.06}>{serverRenderedChildren}</Reveal>
```
Opacity plus a 16px y-offset, `once: true`, reduced-motion aware. Stagger by passing increasing `delay`, capped at six steps. **Never animate scale on text.**

## 5. Design-system rules

1. **Tokens are the only colour source.** The complete set of utility names, as implemented in `tailwind.config.mjs`:

   | Purpose | Utilities |
   |---|---|
   | Backgrounds | `bg-page`, `bg-surface`, `bg-sunken`, `bg-invert`, `bg-accent-weak`, `bg-line` (grid gaps only) |
   | Text | `text-fg`, `text-fg-muted`, `text-fg-subtle`, `text-fg-invert`, `text-accent`, `text-danger` |
   | Borders | `border-line`, `border-line-strong`, `border-accent`, `border-danger` |
   | Header | `bg-translucent` (the scrolled header only) |

   Nothing else. `bg-zinc-800`, `text-blue-600`, and every other palette utility are removed from the build and will fail.
2. **Adding a token** means: add it to `design_system.md` section 4.1 with both theme values, compute its contrast and add it to section 4.2, implement it in `globals.css` for both `:root` and `.dark`, and expose it in `tailwind.config.mjs`. All four, or none.
3. **The type scale is closed.** `display`, `h2`, `h3`, `h4`, `lead`, `body`, `body-sm`, `label`. No arbitrary `text-[17px]`.
4. **The spacing scale is closed.** The steps in `design_system.md` section 6. No `p-[13px]`.
5. **Three radii.** `sm` 4px for tags, `md` 8px for controls, `lg` 12px for containers. That is the whole rule, and it is in `design_system.md` section 7.1.
6. **One accent with four jobs:** link text, active nav state, focus ring, one emphasised word in the hero. Not a background, not a border at rest, not a glow.
7. **Monospace is for metadata only.** Labels, stack names, captions. Never running prose.
8. **The z-index scale is closed:** 10, 40, 50, 60, 70, with the meanings in `design_system.md` section 19. No arbitrary values.
9. **The motion inventory is closed.** `design_system.md` section 19 lists every animation on the site and its justification. Adding one means adding a row and a one-sentence reason. If you cannot write the sentence, do not add the animation.

## 6. Do's and don'ts

### Do
- Read `PRD.md` before changing behaviour, and `design_system.md` before changing appearance.
- Prefer deleting to adding. The largest wins in this rehaul were deletions.
- Put content in `app/data/site.js`.
- Group with spacing and hairlines before reaching for a container.
- Give the most important thing on screen the most visual weight, and verify that is what happened.
- Run `npm run build` and `npm run lint` before declaring work done.
- Update the four documents when you change what they describe. Stale documentation is worse than none.

### Don't
- Don't add a section, a dependency, or an animation without a stated product reason.
- Don't redesign for novelty. Every visual change traces to a UX or product rationale.
- Don't change anchor IDs (`#home`, `#about`, `#skills`, `#projects`, `#contact`) or nav labels. They are frozen; links to them exist in the wild. See ADR-010.
- Don't change form field `name` attributes. The Web3Forms submission depends on them.
- Don't rename the brand, the logo, or the blue brand hue.
- Don't reach for `backdrop-blur`, a gradient, or a glow to make something "feel designed".
- Don't add a second accent colour. `--danger` is a state, not an accent.
- Don't introduce a `dark:` utility pair for a colour. Add a token instead. See ADR-003.
- Don't commit a `.env` file.
- Don't ship copy you have not re-read for grammar, broken referents, and accidental em-dashes.

## 7. Instructions for future AI agents

### Before you start
1. Read `PRD.md`, `design_system.md`, and `architecture.md`. They are short on purpose.
2. Read the component you are changing, and the primitive it consumes, in full.
3. Decide whether the task is a content change (`app/data/site.js` only), a token change (`design_system.md` plus `globals.css` plus `tailwind.config.mjs`), or a structural change (a component, plus an ADR).

### While working
4. Reuse before you create. Check `app/components/ui/` first.
5. Keep the client boundary where it is. If you must widen it, say why in your summary.
6. Change one layer at a time. Do not mix a token change with a layout change in the same pass; a regression becomes unattributable.
7. If you find a problem outside your task, report it. Do not silently expand scope.

### Before you finish
8. Run the pre-flight checklist in section 8. Every box.
9. Run `npm run build` and `npm run lint`. Both must pass.
10. Verify in both themes, at 320px, 768px, and 1440px, and with reduced motion enabled.
11. Update any of the four documents your change invalidated.
12. In your summary, state what you changed, what you deliberately did not change, and anything you could not verify.

### Changes that need the user's decision, not yours
- Anchor IDs, nav labels, URL structure.
- Brand name, logo, brand hue.
- Adding or removing a page section.
- Any new third-party service or analytics.
- Moving a dial in `design_system.md` section 1.
- Replacing real content with placeholder content.

## 8. Pre-flight checklist

Derived from the Taste Skill pre-flight, reduced to what applies to this site. Run every box. A box that cannot be honestly ticked means the work is not done.

**Tokens and consistency**
- [ ] No raw hex, `rgb()`, or palette utility in any component.
- [ ] One accent, used only for links, active state, focus ring, and the hero emphasis.
- [ ] One radius scale: 4 / 8 / 12. No `rounded-full`.
- [ ] One container width. No `max-w-*` outside `ui/Section` and `globals.css`.
- [ ] Type sizes come from the closed scale.
- [ ] Page is one theme throughout. No section inverts.

**Typography and copy**
- [ ] Zero em-dashes and en-dashes in any visible string.
- [ ] Eyebrow count across the page is two or fewer.
- [ ] Every visible string re-read for grammar, broken referents, and filler verbs.
- [ ] No invented numbers, percentages, or proficiency claims.
- [ ] One label per CTA intent.
- [ ] Exactly one `<h1>`; heading levels do not skip.

**Layout**
- [ ] Hero fits the initial viewport at 768px and above; headline is at most two lines; lead is at most 20 words.
- [ ] Hero top padding does not exceed `pt-24` at desktop.
- [ ] Hero has at most four text elements.
- [ ] No two sections share a layout family.
- [ ] No three consecutive image-plus-text splits.
- [ ] Grid cell count equals item count. No empty cells.
- [ ] Navigation is one line at desktop and at most 72px tall.
- [ ] No card where spacing and a hairline would do.

**Interaction and motion**
- [ ] Every animation appears in the motion inventory with its justification.
- [ ] `useReducedMotion` honoured everywhere; reduced-motion path actually tested.
- [ ] No `window.addEventListener('scroll')`.
- [ ] Every `useEffect` subscription cleans up.
- [ ] Buttons depress on `:active`.

**Accessibility**
- [ ] Contrast verified in both themes: 4.5:1 body, 3:1 large text and UI boundaries.
- [ ] Every button label fits on one line at every breakpoint.
- [ ] Form labels bound with `htmlFor`/`id`; errors below the field and linked by `aria-describedby`.
- [ ] Visible `:focus-visible` ring on every interactive element.
- [ ] Icon-only controls have `aria-label`.
- [ ] Pinch zoom is not blocked.
- [ ] Drawer traps focus, closes on `Escape`, and restores focus to its trigger.
- [ ] Colour is never the only carrier of meaning.
- [ ] System cursor is untouched.

**States and build**
- [ ] Form covers idle, invalid, submitting, success, error, and unconfigured.
- [ ] Images have reserved dimensions; hero image is `priority`.
- [ ] No blocking splash or loader exists.
- [ ] `npm run build` passes.
- [ ] `npm run lint` passes.
