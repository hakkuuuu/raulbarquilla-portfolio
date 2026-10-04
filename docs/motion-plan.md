# Motion upgrade plan - GSAP-era interaction layer

**Reference:** https://huyml.co/ (Huy Phan, art director, Ho Chi Minh City)
**Governing filter:** `.claude/skills/taste-skill/SKILL.md`, applied section by section below.
**Status:** plan only. Nothing in this document is implemented yet.
**Last reviewed:** 2026-10-04

---

## 0. Framing

We are adapting **techniques**, not cloning a site. Layout conventions, scroll mechanics and motion patterns are fair to learn from. The reference site's copy, identity, type licences, photography and bespoke artwork are not ours to take, and taking them would also defeat the point of a portfolio.

There is a practical reason a 1:1 copy fails here regardless. huyml.co is an **art director's** portfolio: its structure is a delivery mechanism for large campaign imagery and video. This is a **full-stack developer's** portfolio with, at time of writing, zero project images. Copy the format without the assets and you get a beautifully engineered empty shell. Section 2 deals with that head on.

## 1. Design read and dial change

Taste Skill section 0.B requires a stated read before any build:

> **Reading this as:** a developer portfolio for hiring managers, moving from a restrained editorial language to a **kinetic editorial** one, leaning toward Motion for the UI layer plus GSAP ScrollTrigger in isolated leaves, with real project imagery doing the heavy lifting.

Dial change under Taste Skill section 1. This is a conversational override, which the skill permits, and it must be recorded because `design_system.md` section 1 is the source of truth:

| Dial | Now | Proposed | Justification |
|---|---|---|---|
| `DESIGN_VARIANCE` | 6 | **8** | Asymmetric work index and a pinned sequence need the headroom. Skill table: "playful / Awwwards / experimental" sits at 9-10; we stop at 8 because the audience is still a recruiter, not a jury. |
| `MOTION_INTENSITY` | 4 | **8** | This is the whole request. Band 8-10 is "advanced choreography: scroll-triggered reveals, scroll-driven animation". |
| `VISUAL_DENSITY` | 4 | **4** | Unchanged. Still a daily-app density. |

**Skill section 5, "Motion claimed, motion shown":** at 8 the page must genuinely move. A half-built motion layer is worse than the current clean static one. If any phase below cannot be finished properly, the correct move is to stop and leave the dial at 4, not to ship broken ScrollTriggers.

## 2. The asset blocker, and the fix

Taste Skill section 4.8 is unambiguous: real images first, hand-rolled SVG and div-based fake screenshots never, and if neither is possible, leave labelled slots and say so.

The hover-preview work index, the pinned project sequence and the full-bleed media moments **all** depend on project imagery. Without it, none of them can ship.

**Fix, and it is already achievable in this repo:** five of the six personal projects have live deployments. Playwright is installed and working in this session. Capture real screenshots:

| Project | URL | Host | Capture risk |
|---|---|---|---|
| Travelis | travel-app-w4qg.onrender.com | Render free | Cold start, may need a warm-up request and a long timeout |
| Hakoverse | hakoverse.vercel.app | Vercel | None |
| HakoStore | hakostore.onrender.com | Render free | Cold start |
| Hakomovies | hakomovies.vercel.app | Vercel | None |
| KapeTabi | kapewinika.vercel.app | Vercel | None |
| Hakomerch | hakomerch-product-store.onrender.com | Render free | Cold start |

Capture spec: 1600x1000 (16:10), `deviceScaleFactor: 2`, light theme where the app supports it, above-the-fold only, no cookie banners. Output to `public/projects/<slug>.png`, wire to the existing `cover` field in `app/data/site.js`. **The `cover` slot and its `next/image` path already exist** (ADR-008), so this is a content drop, not a code change.

The confidential client project gets no screenshot, by design. It keeps the typographic cell.

**This phase gates everything else. Do it first.**

## 3. Technique audit: reference site to this site

Each row is checked against the Taste Skill before it is allowed in.

| Reference technique | Skill verdict | Decision |
|---|---|---|
| Line-by-line mask reveal on the hero headline | Allowed. Section 10 "Text Mask Reveal", motivated by hierarchy | **Adopt.** Highest impact per byte, needs no assets. Clip each headline line, translate up, stagger 80ms |
| Smooth scroll (Lenis) | Allowed. Not a scroll hijack, and it is the substrate ScrollTrigger expects | **Adopt**, with `prefers-reduced-motion` disabling it entirely |
| Work index rows with a cursor-following image preview | Allowed. Section 10 "Hover Image Trail". Motivated: shows the work without leaving the index | **Adopt after phase 2.** Must use `useMotionValue`, never `useState`, per section 3.B. Desktop pointer only; touch gets a static thumbnail |
| Pinned / sticky project sequence | Allowed with the canonical skeleton, section 5.A | **Adopt one, once.** `start: "top top"`, `pin: true`, correct scrub. One pinned moment on the page, not three |
| Scroll-velocity skew on media | Allowed at MOTION 8, transform-only | **Adopt, subtly.** Cap at about 4 degrees. Easy to overdo |
| Magnetic / directional-fill buttons | Allowed at MOTION > 5 for premium or agency reads | **Adopt on the two hero CTAs only.** `useMotionValue` and `useTransform`, outside the render cycle |
| Horizontal scroll hijack | Allowed with skeleton 5.B, but | **Skip.** We already have one pinned section. A second scroll-hijack on a five-section page is filler, and section 5 requires each one to be justifiable in a sentence |
| Persistent header with live local time and city ("HCMC, 15:26") | **Banned.** Section 9.F: locale, city, time and weather strips are banned for 99% of briefs, allowed only for genuinely distributed studios or place-based brands | **Reject.** A single-location solo developer is exactly the case the rule targets |
| Custom cursor | **Banned.** Section 9.A, and we deliberately removed one in this rehaul (ADR-003 territory, PRD P6) | **Reject.** It was an accessibility regression the first time |
| Marquee / kinetic word strip | Max one per page, section 5 | **Hold.** Only if a section genuinely needs breadth. Currently nothing does |
| Full-screen page transitions | Allowed, but | **Skip.** This is a single-route page. There is nothing to transition between, and a fake one is a loading gate by another name (ADR-001) |
| Decoration text strip at hero bottom | **Banned.** Section 9.F | **Reject** |
| Scroll cue ("scroll to explore") | **Banned.** Section 9.F | **Reject** |

Net: eight adopted, six rejected. Every rejection traces to a specific skill rule, not to taste.

## 4. Library decision

**Do not add GSAP for everything.** Motion 12 is already installed and handles mask reveals, stagger, hover physics and scroll-linked transforms through `useScroll` and `useTransform`. GSAP earns its place only for genuine **pin and scrub** work.

Taste Skill section 10 is explicit: **never mix GSAP and Motion in the same component tree**, they fight over the same frames. So:

- Motion stays the default for everything in `app/components/`.
- GSAP ScrollTrigger lives in exactly one dedicated leaf component that contains no Motion at all.
- Lenis is initialised once, at the root, and wired to `ScrollTrigger.update()`.

Cost, gzipped, approximate:

| Package | Version | Added |
|---|---|---|
| `lenis` | 1.3.26 | ~4 KB |
| `gsap` (core + ScrollTrigger) | 3.15.0 | ~28 KB |
| `split-type` | 0.3.4 | ~2 KB |
| **Total** | | **~34 KB** |

Against a budget of LCP < 2.5s on 4G. Acceptable **only** if the GSAP leaf is dynamically imported with `ssr: false` and the pinned section sits below the fold. If the hero needed GSAP, the answer would be no.

SplitType is optional. Splitting the headline into lines by hand in the data layer avoids the dependency and avoids a layout shift on font load. Prefer that.

## 5. Phases

Each phase is independently shippable and independently revertible.

**Phase 1 - Assets.** Playwright capture script for the five live demos, warm the Render hosts first, write to `public/projects/`, populate `cover`. Verify the existing cover path renders. *No new dependencies.* Gates phases 4 and 5.

**Phase 2 - Hero mask reveal.** Split the headline into lines, clip, stagger up. Motion only. Reduced-motion falls back to the current static end state. *No new dependencies.* This alone is most of the perceived upgrade.

**Phase 3 - Smooth scroll.** Add Lenis in a root client leaf, disabled under reduced motion, destroyed on unmount. Verify anchor navigation and scroll-spy still work, because `IntersectionObserver` and Lenis can disagree about position.

**Phase 4 - Work index rebuild.** Replace the matrix with an index of rows: ordinal, title, stack, year. Cursor-following preview on desktop pointers, static thumbnail on touch. `useMotionValue` only. Requires phase 1.

**Phase 5 - One pinned sequence.** Featured project pins and scrubs through two or three states. GSAP leaf, canonical 5.A skeleton, `gsap.context()` with `ctx.revert()` cleanup. Requires phase 1.

**Phase 6 - Magnetic CTAs.** Hero buttons only. Pointer-driven translate via motion values, spring `stiffness: 100, damping: 20`.

**Phase 7 - Audit.** Full Taste Skill section 14 pre-flight, both themes, 320/768/1440, reduced motion, keyboard. Re-run the contrast script. Update `design_system.md`, `architecture.md`, `agents.md`.

## 6. Hard constraints carried from the existing system

These do not relax because the motion dial went up:

- `window.addEventListener('scroll')` stays banned. Lenis and ScrollTrigger only.
- No continuous pointer or scroll value enters React state.
- Animate `transform` and `opacity` only.
- **Every** new animation honours `prefers-reduced-motion` and degrades to a visible static end state. The `[data-reveal]` safety net in `globals.css` exists because the hook lost that race once already; apply the same belt-and-braces to new reveal mechanisms.
- Every `useEffect` that registers a ScrollTrigger or a Lenis instance cleans up. `gsap.context()` plus `ctx.revert()`.
- One accent, one radius scale, one container width, one icon family.
- Zero em-dashes.
- Focus rings survive. Pinned sections must not trap keyboard users or break anchor navigation.
- The system cursor stays untouched.

## 7. Risks

| Risk | Mitigation |
|---|---|
| Render free-tier demos cold-start and screenshot as a spinner | Warm each host with a request, wait for network idle, retry once, inspect every capture by eye before committing |
| Lenis and the `IntersectionObserver` scroll-spy disagree, so the nav lies again (PRD P5) | Test scroll-spy explicitly after phase 3. Lenis exposes a scroll callback if the observer proves unreliable |
| Pinned section breaks anchor jumps to `#contact` | `ScrollTrigger.refresh()` after layout, and test every nav link after phase 5 |
| Motion layer pushes LCP past 2.5s | GSAP leaf dynamically imported, `ssr: false`, below the fold. Measure before and after |
| Motion becomes decoration rather than communication | Section 5 rule: if the one-sentence justification cannot be written, the animation does not ship. Add each one to the motion inventory in `design_system.md` as it lands |

## 8. Documentation amendments required

The four governing documents are the source of truth, so this work is not done until they match:

- `design_system.md` section 1: dial table updated to 8 / 8 / 4 with the justification above.
- `design_system.md` section 19: every new animation added to the motion inventory with its one-sentence reason; new duration and easing tokens if any.
- `architecture.md`: new ADRs for the library split (Motion default, GSAP isolated), for Lenis at the root, and for the work-index rebuild. Client-boundary diagram updated.
- `agents.md` section 3: the rejected techniques in section 3 above become explicit entries in the hard-bans table, so a future agent does not reintroduce the live-time strip or the custom cursor.
- `PRD.md` section 9: project cover images move from open task to done.

## 9. Recommendation

Phases 1, 2 and 3 deliver most of the perceived difference, carry almost no risk, and add about 4 KB. Phases 4 and 5 are where the reference site's character actually lives, and they are entirely gated on having real screenshots.

**Start with phase 1.** If the captures come out clean, the rest is worth building. If the demos are dead or render badly, stop and reconsider, because an index of empty frames is worse than the typographic matrix that is there now.
