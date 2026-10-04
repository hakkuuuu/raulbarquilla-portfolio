import Image from 'next/image';
import { ArrowUpRight, GithubLogo, LockSimple } from '@phosphor-icons/react/ssr';
import Tag from './ui/Tag';

/**
 * A bento tile. design_system.md section 13.
 *
 * The media frame clips, and the screenshot inside scales past the clip on
 * hover. That is the whole overflow effect: `overflow-hidden` on the frame,
 * `scale` on the image, 700ms. It reads as the screenshot moving behind a
 * window rather than the tile growing, so nothing reflows and no neighbour
 * is disturbed. `media-zoom` is the hook globals.css uses to kill the
 * transform under reduced motion.
 *
 * The tile is not a single click target. A repository and a live demo are two
 * destinations, so they are two labelled links (PRD FR-5).
 *
 * A null `cover` renders a text-only tile. Never an empty image box, never a
 * screenshot faked out of divs. See ADR-008.
 */

const MEDIA_ASPECT = {
  4: 'aspect-[16/9]',
  3: 'aspect-[16/10]',
  2: 'aspect-[4/3]',
};

const MEDIA_SIZES = {
  4: '(min-width: 1024px) 46vw, (min-width: 640px) 50vw, 100vw',
  3: '(min-width: 1024px) 35vw, (min-width: 640px) 50vw, 100vw',
  2: '(min-width: 1024px) 24vw, (min-width: 640px) 50vw, 100vw',
};

/* Written out in full on purpose. Tailwind scans source for literal class
   strings, so `lg:col-span-${span}` would generate nothing at all. */
export const SPAN_CLASS = {
  4: 'lg:col-span-4',
  3: 'lg:col-span-3',
  2: 'lg:col-span-2',
};

export default function ProjectCard({ project, index }) {
  const { title, summary, role, stack, repo, demo, cover, slug, confidential, span = 3 } =
    project;
  const titleId = `project-${slug}`;
  const ordinal = String(index + 1).padStart(2, '0');

  const tags = stack.length === 0 ? null : (
    <ul className="flex flex-wrap gap-2">
      {stack.map((item) => (
        <li key={item}>
          <Tag>{item}</Tag>
        </li>
      ))}
    </ul>
  );

  const links = confidential ? (
    <p className="inline-flex items-center gap-2 font-mono text-label uppercase text-fg-subtle">
      <LockSimple size={14} aria-hidden="true" />
      Client work, not public
    </p>
  ) : (
    <div className="flex flex-wrap items-center gap-2">
      <a
        href={repo}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-md border border-line px-3 py-2 text-body-sm text-fg-muted transition-colors duration-fast ease-inout hover:border-line-strong hover:text-fg active:translate-y-px"
      >
        <GithubLogo size={16} aria-hidden="true" />
        Code
        <span className="sr-only">for {title} on GitHub (opens in a new tab)</span>
      </a>
      <a
        href={demo}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-md border border-line px-3 py-2 text-body-sm text-accent transition-colors duration-fast ease-inout hover:border-line-strong active:translate-y-px"
      >
        Live demo
        <ArrowUpRight size={16} aria-hidden="true" />
        <span className="sr-only">of {title} (opens in a new tab)</span>
      </a>
    </div>
  );

  const heading = (
    <div className="flex items-baseline gap-3">
      <span aria-hidden="true" className="font-mono text-label text-fg-subtle">
        {ordinal}
      </span>
      {/* h4, not h3: the group label above the bento is the h3. */}
      <h4 id={titleId} className="text-h4 text-fg">
        {title}
      </h4>
    </div>
  );

  const tile =
    'group flex flex-col overflow-hidden rounded-lg border border-line bg-surface ' +
    'transition-colors duration-base ease-inout hover:border-line-strong';

  if (confidential) {
    return (
      <article aria-labelledby={titleId} className={`${tile} h-full w-full`}>
        {cover && (
          <div className="relative aspect-[21/9] overflow-hidden border-b border-line bg-sunken">
            <Image
              src={cover}
              alt={`${title}, admin console with client data redacted`}
              fill
              sizes="(min-width: 1024px) 70vw, 100vw"
              className="media-zoom object-cover object-top transition-transform duration-[700ms] ease-out group-hover:scale-[1.04]"
            />
          </div>
        )}
        <div className="grid gap-8 p-6 sm:p-8 md:grid-cols-12">
          <div className="md:col-span-7">
            {heading}
            <p className="mt-4 max-w-prose text-lead text-fg-muted">{summary}</p>
            {role && (
              <div className="mt-6 border-t border-line pt-4">
                <p className="font-mono text-label uppercase text-fg-subtle">What I built</p>
                <p className="mt-2 max-w-prose text-body-sm text-fg-muted">{role}</p>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-6 md:col-span-5">
            {tags}
            {links}
          </div>
        </div>
      </article>
    );
  }

  return (
    <article aria-labelledby={titleId} className={`${tile} h-full w-full`}>
      <div className={`relative ${MEDIA_ASPECT[span]} overflow-hidden border-b border-line bg-sunken`}>
        {cover ? (
          <Image
            src={cover}
            alt={`${title}, screenshot of the live deployment`}
            fill
            sizes={MEDIA_SIZES[span]}
            className="media-zoom object-cover object-top transition-transform duration-[700ms] ease-out group-hover:scale-[1.06]"
          />
        ) : (
          /* Placeholder, not a fake screenshot. Rendered from theme tokens
             rather than shipped as an image, so it follows light, dark and
             terminal automatically and costs no bytes. It states plainly that
             there is no capture instead of inventing a product UI. */
          <div
            aria-hidden="true"
            className="absolute inset-0 flex flex-col justify-between p-5 font-mono"
            style={{
              backgroundImage:
                'linear-gradient(to right, var(--grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          >
            <span className="text-label text-fg-subtle">~/{slug}</span>
            <span className="flex items-baseline gap-2 text-label">
              <span className="text-accent">$</span>
              <span className="text-fg-muted">open {slug}</span>
              <span className="h-[1em] w-[0.55em] animate-pulse bg-fg" />
            </span>
            <span className="text-label text-fg-subtle">no capture available</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {heading}
        <p className="mt-3 text-body-sm text-fg-muted">{summary}</p>
        <div className="mt-5">{tags}</div>
        {/* mt-auto keeps the action row on the baseline across tiles of
            different description lengths. */}
        <div className="mt-auto pt-6">{links}</div>
      </div>
    </article>
  );
}
