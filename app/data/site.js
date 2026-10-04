/**
 * Single source of content for the site.
 *
 * Pure data only: no JSX, no icon imports, no components. Icons are referenced
 * by string key and resolved in the component that renders them, which keeps
 * this module usable from Server Components.
 *
 * See docs/agents.md section 2.
 */

export const profile = {
  name: 'Raul B. Barquilla Jr.',
  shortName: 'Raul Barquilla Jr.',
  brand: 'dev.haku',
  role: 'Full-stack developer',
  location: 'Albay, Philippines',
  email: 'raulbarquilla003@gmail.com',
  resume: '/barquilla_raul_resume.pdf',
  siteUrl: 'https://raulbarquilla-portfolio.vercel.app',
  sourceUrl: 'https://github.com/hakkuuuu/raulbarquilla-portfolio',
};

/** Frozen. Links to these anchors exist outside this repository. See ADR-010. */
export const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

/**
 * Editorial hero: four text elements, which is the cap. Headline is five words
 * so it holds two lines at the top of the display scale; lead is 18 words,
 * under the 20-word cap.
 */
export const hero = {
  promptUser: 'raul@dev.haku',
  promptCommand: 'whoami',
  headlineBefore: 'I build ',
  headlineAccent: 'production',
  headlineAfter: ' web apps.',
  lead:
    'Full-stack developer in Albay, Philippines. I work in TypeScript across Next.js, Postgres, and the kind of third-party integrations that only ever fail at 2am. I like systems that exit zero and say nothing.',
  /* Right column of the hero. Deliberately NOT the same facts as About: this
     is what I do now, About is background. Keeping them disjoint is why
     `focus` and `availability` were removed from about.facts. */
  meta: [
    { key: 'focus', value: 'TypeScript, Next.js, Postgres' },
    { key: 'currently', value: 'CRM and lead-pipeline integrations' },
    { key: 'status', value: 'Open to full-time and contract' },
    { key: 'uptime', value: 'Shipping since 2023, no unplanned reboots' },
  ],
};

export const about = {
  path: 'about',
  title: 'About me',
  body:
    "I'm a full-stack developer from Albay, Philippines. I finished Computer Science at Bicol University in 2023 and now build production systems for a living, mostly TypeScript on Next.js with Postgres behind it.",
  bodyExtra:
    'Lately that has meant integration work: webhooks, CRM syncing, and the unglamorous reliability details that decide whether a pipeline can be trusted at 3am. Idempotency keys. Signature verification. What happens on the second delivery of an event you already handled. None of it demos well and all of it is the job.',
  bodyClose:
    'I take the old unix idea seriously, that a program should do one thing well and stay quiet when it works. Most of what I ship is small and composable on purpose, because the parts you can reason about in isolation are the parts that survive a bad deploy.',
  facts: [
    { term: 'Based in', detail: 'Albay, Philippines' },
    { term: 'Education', detail: 'BS Computer Science, Bicol University, 2023' },
  ],
};

/**
 * Six groups, which fills both a 2-column and a 3-column grid exactly.
 * Contents reflect what is actually in the repositories, not an aspirational
 * list. Refreshed 2026-10-04 from a scan of the active projects.
 */
export const skills = {
  path: 'stack',
  title: 'Tech stack',
  lead:
    'What I reach for, grouped by where it sits in the stack. No percentages next to anything: a number beside a language name has never once predicted whether someone can ship, and you would be right not to believe mine.',
  groups: [
    {
      name: 'Languages & frameworks',
      items: ['TypeScript', 'JavaScript', 'React', 'Next.js', 'Node.js', 'Express', 'Laravel', 'Vue'],
    },
    {
      name: 'Interface',
      items: ['Tailwind CSS', 'shadcn/ui', 'Radix UI', 'Base UI', 'HeroUI', 'Motion', 'Recharts'],
    },
    {
      name: 'Data',
      items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Supabase', 'Sanity'],
    },
    {
      name: 'Integrations',
      items: ['Salesforce', 'Resend', 'Svix webhooks', 'Clerk', 'REST APIs', 'TanStack Query'],
    },
    {
      name: 'Testing & quality',
      items: ['Vitest', 'Biome', 'ESLint'],
    },
    {
      name: 'Tooling & deploy',
      items: ['Docker', 'Git', 'pnpm', 'Vite', 'Vercel', 'Figma', 'Postman'],
    },
  ],
};

export const work = {
  path: 'work',
  title: 'Recent work',
  lead:
    'Production systems built under contract, and the personal projects behind them. The client work is redacted down to what I can show. The rest is open source and deployed, so you can read the commits and judge for yourself rather than taking my word for it.',
  professionalLabel: 'Professional work',
  personalLabel: 'Personal projects',
  professionalNote:
    'Client work, so repositories and deployments are not public. Descriptions cover what I built and nothing identifying.',
};

/**
 * Client engagements. Redacted on purpose: no client name, no repository, no
 * deployment URL, no screenshots. `confidential: true` makes ProjectCard drop
 * the link row and render the role summary instead.
 *
 * TODO: the GTM pipeline project is not represented here. It was not found in
 * the local working copies and the pandrdev organisation has no public
 * repositories, so there were no facts to write from. Add it with a two-line
 * description of what you built and its stack.
 */
export const professionalProjects = [
  {
    slug: 'gtm-pipeline',
    title: 'GTM pipeline',
    summary:
      'An internal dashboard and the automation behind it for an outbound go-to-market pipeline. Saved-search sourcing feeds enrichment, a pre-send approval queue, sequenced outreach and reply triage, with a funnel view that attributes drop-off to the stage it happened in.',
    role:
      'Built the dashboard and the pipeline it reports on: saved-search sourcing, the enrichment step, the pre-send approval queue, suppression handling, and per-inbox send throttling that paces against a daily ceiling while sending domains warm up.',
    // TODO: confirm the stack for this one. It was not in the local working
    // copies, so nothing here is inferred from a screenshot.
    stack: [],
    cover: '/projects/gtm-pipeline.jpg',
    confidential: true,
  },
  {
    slug: 'lead-intake',
    title: 'Lead intake and CRM sync',
    summary:
      'A self-hosted service that turns inbound lead emails into CRM records. It verifies the webhook signature, parses each email, normalises phone numbers and addresses, routes the lead to the right franchise and specialist, then writes it to Salesforce.',
    role:
      'Built the full pipeline: signature verification, the parsing and routing modules, a Postgres lookup layer with atomic round-robin assignment and idempotency keys, Salesforce duplicate detection, fallback notification emails, an authenticated admin console, and a hermetic test suite that runs against an in-memory store with no database.',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Salesforce API', 'Resend', 'Svix', 'Vitest', 'Docker'],
    // Both dashboards are solid-barred over every identifying element FIRST,
    // then blurred at 25%. Bars remove the information; the blur is
    // presentation. At this blur level large text would otherwise still read.
    cover: '/projects/lead-intake.jpg',
    confidential: true,
  },
];

/**
 * Personal projects, ordered to compose the bento rather than by date, since
 * all six are comparable in scale.
 *
 * `span` is the column count on the 6-column bento at `lg`. Rows read 4+2,
 * 3+3, 2+4, which gives the grid rhythm and fills every row exactly. Below
 * `lg` the spans are ignored: 2 equal columns at `sm`, one at mobile.
 *
 * `cover` is a real screenshot of the live deployment, captured at 1600x1000.
 * Two are null because their hosts could not be captured; see the note in
 * docs/PRD.md section 9. A null cover renders a text-only tile, never an empty
 * image box and never a fake screenshot. See ADR-008.
 */
export const personalProjects = [
  {
    slug: 'travelis',
    title: 'Travelis',
    summary:
      'A travel booking platform with destination discovery, user authentication, booking management and an admin dashboard.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'MongoDB'],
    repo: 'https://github.com/hakkuuuu/travel-app',
    demo: 'https://travel-app-w4qg.onrender.com/',
    cover: '/projects/travelis.jpg',
    span: 4,
  },
  {
    slug: 'hakostore',
    title: 'HakoStore',
    summary: 'A full-stack inventory tool for managing products and stock levels.',
    stack: ['React', 'Vite', 'Express', 'PostgreSQL'],
    repo: 'https://github.com/hakkuuuu/Hakostore',
    demo: 'https://hakostore.onrender.com/',
    cover: null,
    span: 2,
  },
  {
    slug: 'hakomovies',
    title: 'Hakomovies',
    summary:
      'A movie browser on the TMDB API, with search, top-rated listings and detail pages.',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'TMDB API'],
    repo: 'https://github.com/hakkuuuu/hakomovies',
    demo: 'https://hakomovies.vercel.app/',
    cover: '/projects/hakomovies.jpg',
    span: 3,
  },
  {
    slug: 'hakoverse',
    title: 'Hakoverse',
    summary:
      'A Reddit-style social app, with Supabase handling the backend, authentication and database.',
    stack: ['React', 'TypeScript', 'TanStack Query', 'Supabase'],
    repo: 'https://github.com/hakkuuuu/hakoverse',
    demo: 'https://hakoverse.vercel.app/',
    // Capture exists at /projects/hakoverse.jpg but the deployed database has
    // no posts, so the screenshot is a mostly-empty "No posts yet" state that
    // makes the project read as abandoned. Seed the database, re-capture, and
    // set this to '/projects/hakoverse.jpg' to light the tile up.
    cover: null,
    span: 3,
  },
  {
    slug: 'kapetabi',
    title: 'KapeTabi',
    summary:
      'A coffee shop system with product listing and filtering, a shopping cart and user authentication.',
    stack: ['Vue', 'Vite', 'Vue Router', 'Tailwind CSS'],
    repo: 'https://github.com/hakkuuuu/Kapewinika',
    demo: 'https://kapewinika.vercel.app/',
    cover: '/projects/kapetabi.jpg',
    span: 4,
  },
  {
    slug: 'hakomerch',
    title: 'Hakomerch',
    summary: 'A merchandise management app built on the MERN stack.',
    stack: ['React', 'Tailwind CSS', 'Express', 'MongoDB'],
    repo: 'https://github.com/hakkuuuu/hakomerch-product-store',
    demo: 'https://hakomerch-product-store.onrender.com/',
    cover: null,
    span: 2,
  },
];

export const contact = {
  path: 'contact',
  title: 'Get in touch',
  lead:
    'Email is the fastest way to reach me. I read everything that lands there and reply to anything that is not automated. Nothing here routes through a form, so there is no silent failure between you and my inbox.',
};

/** Ordered by relevance to the primary audience. `icon` keys map in the component. */
export const channels = [
  { icon: 'email', label: 'Email', handle: profile.email, href: `mailto:${profile.email}` },
  { icon: 'github', label: 'GitHub', handle: 'hakkuuuu', href: 'https://github.com/hakkuuuu' },
  { icon: 'linkedin', label: 'LinkedIn', handle: 'raulbjr', href: 'https://www.linkedin.com/in/raulbjr/' },
  { icon: 'behance', label: 'Behance', handle: 'raulbarquillajr', href: 'https://behance.net/raulbarquillajr' },
  { icon: 'instagram', label: 'Instagram', handle: 'hqkuuuuu', href: 'https://instagram.com/hqkuuuuu' },
  { icon: 'facebook', label: 'Facebook', handle: 'raulbarquillajr', href: 'https://www.facebook.com/raulbarquillajr' },
];
