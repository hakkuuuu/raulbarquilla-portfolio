# PRD - dev.haku Portfolio

**Owner:** Raul B. Barquilla Jr.
**Surface:** `raulbarquilla-portfolio.vercel.app` - single-page personal portfolio
**Status:** Source of truth for the UI/UX rehaul. Update this file when product direction changes.
**Last reviewed:** 2026-10-04

---

## 1. Product goals

1. **Convert a scan into a conversation.** The site exists to turn a 30-second skim by a recruiter or client into an email, a resume download, or a GitHub click. Every other goal is subordinate.
2. **Make the work legible in under a minute.** A visitor should be able to name what Raul builds, with which stack, and at what level of finish, without reading a paragraph.
3. **Be the proof, not just the claim.** The site is itself a work sample. If it is slow, inconsistent, or inaccessible, it contradicts its own copy.
4. **Stay honest.** No invented metrics, no manufactured scarcity, no proficiency theatre. Credibility is the product.

## 2. Target users

| User | Context | What they need in the first 30s | Primary action |
|---|---|---|---|
| **Technical recruiter / hiring manager** (primary) | Reviewing 20-60 portfolios, often on desktop, often tab-switching | Role, seniority signal, stack, location/availability, resume | Download resume, send email |
| **Engineering lead / interviewer** (primary) | Follows up on a shortlisted candidate, checks depth | Real repos, real deployments, stack per project, code quality signal | Open GitHub, open live demo |
| **Prospective freelance client** (secondary) | Looking for someone to build a product | Evidence of shipped, complete products; ease of contact | Use the contact form |
| **Peer developer** (tertiary) | Arrived from GitHub or a community link | Interesting work, stack overlap | Open GitHub |

All four are **task-driven, impatient, and arriving cold.** None of them came to be entertained.

## 3. Core user problems

Observed in the pre-rehaul implementation. These are the problems the rehaul must solve.

| # | Problem | Impact |
|---|---|---|
| P1 | A typewriter loading gate blocks **all** content for roughly 3.5s on every visit | Highest-cost problem. Recruiters bounce; LCP and SEO both suffer; nothing is interactive until it finishes |
| P2 | Project titles are set at 14px with no imagery, so the most important content on the site has the weakest hierarchy | Visitors cannot scan the work, which is the entire point of a portfolio |
| P3 | Skills are presented as invented percentages ("CSS 95%", "Laravel 70%") | Reads as self-assessment theatre; technical readers discount it, and it crowds out the useful information (what he actually works with) |
| P4 | Every section is centred, with the same eyebrow + coloured-word heading and the same translucent card | The page has no landmarks; sections are indistinguishable while scrolling |
| P5 | Nav highlight updates only on click, never on scroll | The navigation misreports where the user is |
| P6 | A custom cursor replaces the system cursor site-wide (`cursor: none !important`) | Breaks text-selection and caret affordances, hurts pointer accuracy, and is hostile to assistive and low-vision users |
| P7 | Contact form has no inline validation, no field-level errors, and no success state in the page | Submission feels unreliable; failures are easy to miss |
| P8 | `maximum-scale=1` blocks pinch zoom | Fails WCAG 2.1 SC 1.4.4; actively excludes low-vision users |
| P9 | Content container width changes on nearly every section (3xl / 5xl / 6xl / 7xl) | Text edges jump on scroll, which reads as unfinished |
| P10 | Theme is applied after hydration, while the stylesheet hard-codes a dark body | Light mode flashes dark on load and light-mode backgrounds are unreliable |

## 4. Key features and workflows

The site is one page with five anchored sections. The IA is **unchanged** by the rehaul: existing anchors and nav labels are load-bearing for links already shared in applications.

### Information architecture

```
/  (single page)
├── #home      Hero          Who, what, where, and the two primary actions
├── #about     About         Short bio plus scannable facts
├── #skills    Skills        Stack grouped by domain
├── #projects  Projects      Shipped work, each with repo and live demo
└── #contact   Contact       Direct channels plus a message form
     └── footer
```

### Workflow A - Recruiter qualifies the candidate (primary)
1. Lands on `#home`. Reads role, one-line positioning, location, availability.
2. Clicks **View resume** (opens the PDF in a new tab) or **Get in touch**.
3. If still evaluating, scrolls to `#projects`, opens one live demo and one repo.
4. Exits to email or returns to their ATS.

**Requirement:** steps 1 and 2 must be possible without scrolling, on a 1366x768 laptop and on a 390px phone.

### Workflow B - Interviewer checks depth
1. Arrives with intent, jumps straight to `#projects` via nav.
2. Scans six projects by title, one-line summary, and stack.
3. Opens repos in new tabs.

**Requirement:** repo and demo are two distinct, labelled, separately reachable targets per project. Never a single ambiguous "view" link.

### Workflow C - Client makes contact
1. Reaches `#contact`.
2. Either picks a direct channel (email, LinkedIn, GitHub) or fills the form.
3. Submits; receives confirmation **in the page**.

**Requirement:** every form state is represented: idle, invalid-per-field, submitting, succeeded, failed-with-reason.

## 5. Functional requirements

### FR-1 Navigation
- Fixed header, single line at desktop, height <= 72px.
- Five links: Home, About, Skills, Projects, Contact. Labels and anchor IDs are frozen.
- Active section is derived from scroll position via `IntersectionObserver`, not from clicks.
- Below `md`, links collapse into a drawer that traps focus, closes on `Escape`, on outside click, and on selection.
- Logo returns to top and is the only "back to top" affordance.

### FR-2 Hero
- States role, name, one-line positioning, location, and availability.
- Exactly two actions: **Get in touch** (primary) and **View resume** (secondary).
- Type-led, with no portrait. See ADR-011.
- Fits within the initial viewport at >= 768px wide.

### FR-3 About
- One short bio paragraph, maximum 60 words.
- A scannable fact list: location, education, focus, current availability.

### FR-4 Skills
- Stack grouped into named domains: Frontend, Backend, Data, Tooling.
- **No proficiency scores, percentages, star ratings, or progress rings.**
- Absorbs the "Tools I use" content that previously duplicated inside About.

### FR-5 Projects
- Two labelled groups: **Professional work** (client engagements, redacted) and **Personal projects** (six, open source).
- Professional entries carry a summary plus a "What I built" note, and no repository or deployment link.
- Personal entries carry title, one-sentence summary, stack list, repo URL and live demo URL.
- Personal projects render as a six-column bento whose spans read 4+2, 3+3, 2+4, filling every row with no empty cell.
- Each project supports an optional cover image, rendered through `next/image` when present and degrading to a text-only tile when absent. Never an empty image box, never a faked screenshot.
- External links open in a new tab with `rel="noopener noreferrer"` and are individually labelled for screen readers.

### FR-6 Contact

- Direct channels only. The message form was removed; see ADR-017.
- Email is promoted out of the channel list and set at heading scale, because it is the single path this section exists to drive.
- Remaining channels list their actual handles, not generic labels, ordered by relevance to the primary audience.
- External links open in a new tab with `rel="noopener noreferrer"` and announce that in their accessible name.

### FR-7 Theme
- Light and dark are both first-class.
- Resolution order: stored user choice, then `prefers-color-scheme`, then dark.
- Applied before first paint. No flash of the wrong theme.
- Toggle is reachable in both the desktop header and the mobile drawer.

## 6. Non-functional requirements

### Performance
- LCP < 2.5s, INP < 200ms, CLS < 0.1 on a mid-tier mobile device over 4G.
- **No blocking splash, loader, or intro animation.** Content is the first paint.
- Hero image uses `priority`; all other images are lazy with reserved dimensions.
- Only leaf components that need interactivity are Client Components; sections render on the server.

### Accessibility - WCAG 2.1 AA
- Text contrast >= 4.5:1; large text and UI boundaries >= 3:1. Verified in both themes.
- Pinch zoom is never blocked.
- Every interactive element has a visible `:focus-visible` ring that meets 3:1 against its background.
- Full keyboard operability, including the mobile drawer and the theme toggle.
- All motion is suppressed under `prefers-reduced-motion: reduce`.
- The system cursor is never hidden or replaced.
- One `<h1>`; heading levels descend without skipping.

### Responsive
- Supported from 320px up.
- Breakpoints: `sm 640`, `md 768`, `lg 1024`, `xl 1280`.
- Every multi-column layout declares its single-column fallback explicitly.
- Touch targets >= 44x44px.

### Maintainability
- One design-token source. No ad-hoc hex values in components.
- One icon family. One motion library. One container width.
- Content lives in `app/data/site.js`, never inline in components.

### SEO
- Existing anchors, nav labels, and route structure are preserved.
- Metadata, Open Graph, and Twitter cards remain populated; `metadataBase` stays set.
- `sitemap.xml` and `robots.txt` are generated.
- `Person` JSON-LD describes the site owner.

## 7. Success criteria

| # | Criterion | How it is measured |
|---|---|---|
| S1 | Hero content is the first meaningful paint; no blocking gate | View source and first-paint trace; no splash component exists |
| S2 | LCP < 2.5s, CLS < 0.1 | Lighthouse mobile run |
| S3 | Lighthouse Accessibility >= 95 | Lighthouse, both themes |
| S4 | A visitor can reach resume or email without scrolling at 1366x768 | Manual check |
| S5 | Project titles render at the `h4` step or larger and are the largest type inside their tile | Type scale audit |
| S6 | No invented statistic appears anywhere | Content audit |
| S7 | Nav active state matches the viewport section at all scroll positions | Manual scroll check |
| S8 | Every contact channel is reachable by keyboard and announces its destination | Keyboard and screen-reader walkthrough |
| S9 | Full keyboard traversal with a visible focus ring throughout | Tab-through, both themes |
| S10 | Page passes the Taste Skill pre-flight check in full | Checklist in `agents.md` |

## 8. Scope

### In scope
- Full visual and interaction rehaul of all five sections, the header, and the footer.
- Design-token system covering colour, type, spacing, radii, elevation, and motion.
- Shared UI primitives replacing duplicated utility strings.
- Conversion of the page tree from fully client-rendered to server-rendered with client islands.
- Content restructuring where the current structure misleads: removal of proficiency percentages, consolidation of duplicated tooling content.
- Accessibility remediation across keyboard, contrast, zoom, motion, and semantics.
- Removal of the loading gate, the custom cursor, and the floating back-to-top button.
- The four governing documents: `PRD.md`, `design_system.md`, `architecture.md`, `agents.md`.

### Out of scope
- Changing URL structure, anchor IDs, or nav labels. These are frozen; links to them already exist in the wild.
- Rewriting the copy voice. Copy is edited for clarity, length, and grammar, not re-authored.
- Changing the brand: the name `dev.haku`, the logo, and the blue brand hue are retained.
- A CMS, a blog, a case-study sub-page, or any additional route.
- Migrating Tailwind v3 to v4. See `architecture.md` ADR-002.
- Adding analytics, consent management, or i18n.
- Replacing the Web3Forms backend.
- Authoring new photography or project screenshots. The cover-image slot is built and wired; filling it is a content task tracked in `architecture.md`.

## 9. Open content tasks

Not blockers for the rehaul, but tracked.

1. **Two live demos are effectively broken for visitors.** `hakostore.onrender.com` returns a bot-detection error to non-interactive clients, and `hakomerch-product-store.onrender.com` did not finish a cold start in over four minutes. A recruiter clicking either "Live demo" gets nothing. Fix the hosting or drop the links. This matters more than the missing screenshots.
2. **Two project covers are missing** for that same reason, so those tiles render text-only. Re-capture once the hosts are healthy and set `cover` in `app/data/site.js`.
3. **Hakoverse has no seeded data.** A capture exists at `public/projects/hakoverse.jpg` but shows an empty "No posts yet" state, so its `cover` is deliberately `null`. Seed the database, re-capture, set `cover`.
4. **The GTM pipeline project is missing** from `professionalProjects`. It was not in the local working copies and the `pandrdev` organisation has no public repositories, so there were no facts to write from. Supply a two-line description and its stack.
5. **A screenshot of the lead-intake admin console** would strengthen that tile. Booting it needs pnpm, a Postgres instance, Salesforce JWT credentials, Resend keys and auth secrets. If attempted, run it against the repo own `data/samples` fixtures so the capture holds synthetic data only, rather than blurring real client records.
6. ~~Contact form credentials.~~ No longer needed: the form was removed in ADR-017 and the site now requires no environment variables to run.
