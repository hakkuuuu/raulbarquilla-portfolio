<h1 align="center">dev.haku</h1>

<p align="center">Personal portfolio for <strong>Raul B. Barquilla Jr.</strong>, full-stack developer.</p>

<p align="center">
  <a href="https://raulbarquilla-portfolio.vercel.app/"><strong>Live site</strong></a>
</p>

---

## Stack

Next.js 16 (App Router) · React 19 · Tailwind CSS 3.4 · GSAP 3 + ScrollTrigger · Lenis · Phosphor Icons · Deployed on Vercel

Server Components by default. Client islands are limited to the navigation, the theme toggle, the contact form and the scroll-reveal wrapper.

## Getting started

```bash
npm install
npm run dev
```


```bash
npm run build   # production build
npm run lint
```

## Documentation

These four files are the source of truth. Read them before changing anything.

| File | Covers |
| --- | --- |
| [docs/PRD.md](docs/PRD.md) | Goals, users, requirements, success criteria, scope, open tasks |
| [docs/design_system.md](docs/design_system.md) | Tokens, type scale, spacing, components, accessibility, motion |
| [docs/architecture.md](docs/architecture.md) | Component tree, client boundary, data flow, architectural decisions |
| [docs/agents.md](docs/agents.md) | Conventions, hard bans, and the pre-flight checklist for AI agents |
| [docs/motion-plan.md](docs/motion-plan.md) | Planned interaction upgrades, not yet implemented |

## Content

All copy, links and project data live in [`app/data/site.js`](app/data/site.js). Adding a project means editing that file, not a component.
