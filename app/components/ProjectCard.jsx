import Image from 'next/image';
import { ArrowUpRight, GithubLogo, LockSimple } from '@phosphor-icons/react/ssr';
import Tag from './ui/Tag';

/**
 * A flat paper card. The screenshot sits in an inset frame and scales a
 * little on hover behind its clip, so nothing reflows.
 *
 * The card is not a single click target. A repository and a live demo are
 * two destinations, so they are two labelled links.
 *
 * A null `cover` renders an honest placeholder that says there is no
 * capture. Never a faked product UI.
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

const ZOOM = 'object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]';

function Placeholder({ slug }) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 flex flex-col items-center justify-center gap-2 font-mono text-[0.78rem] text-faint"
      style={{
        backgroundImage: 'radial-gradient(var(--line-strong) 1px, transparent 1px)',
        backgroundSize: '14px 14px',
      }}
    >
      <span className="pixel text-[1.1rem] text-muted">{slug}</span>
      <span>no capture available</span>
    </div>
  );
}

export default function ProjectCard({ project, index }) {
  const { title, summary, role, stack, repo, demo, cover, slug, confidential, span = 3 } = project;
  const titleId = `project-${slug}`;
  const ordinal = String(index + 1).padStart(2, '0');

  const tags =
    stack.length === 0 ? null : (
      <ul className="flex flex-wrap gap-1.5">
        {stack.map((item) => (
          <li key={item}>
            <Tag>{item}</Tag>
          </li>
        ))}
      </ul>
    );

  const heading = (
    <div className="flex items-baseline gap-3">
      <span aria-hidden="true" className="font-mono text-[0.78rem] text-faint">
        {ordinal}
      </span>
      {/* h4, not h3: the group label above the grid is the h3. */}
      <h4 id={titleId} className="text-[1.2rem] font-bold tracking-[-0.015em] text-ink">
        {title}
      </h4>
    </div>
  );

  const frame = 'relative overflow-hidden rounded-[10px] border border-line bg-paper-2';

  if (confidential) {
    return (
      <article aria-labelledby={titleId} className="card group h-full p-3 sm:p-4">
        {cover && (
          <div className={`${frame} aspect-[21/9]`}>
            <Image
              src={cover}
              alt={`${title}, admin console with client data redacted`}
              fill
              sizes="(min-width: 1120px) 1070px, 100vw"
              // Presentation only: the identifying data is already barred in
              // the file itself. The blur keeps attention on the label.
              className={`${ZOOM} blur-[3px]`}
            />
            {/* The confidentiality label sits on the capture itself, where a
                "redacted" stamp would go, instead of beside the title. */}
            <span className="chip chip-on absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-3.5 py-1.5 text-[0.74rem] shadow-[0_6px_22px_rgb(0_0_0/0.35)]">
              <LockSimple size={13} weight="bold" aria-hidden="true" />
              Client work, not public
            </span>
          </div>
        )}
        <div className="grid gap-8 p-3 pt-5 sm:p-4 sm:pt-6 md:grid-cols-12">
          <div className="md:col-span-7">
            {heading}
            <p className="mt-3 max-w-prose text-muted">{summary}</p>
            {role && (
              <div className="mt-5 border-t border-line pt-4">
                <p className="eyebrow mb-2">What I built</p>
                <p className="max-w-prose text-[0.95rem] text-muted">{role}</p>
              </div>
            )}
          </div>
          <div className="flex flex-col items-start gap-5 md:col-span-5">
            {/* Without a cover there is nowhere to overlay the label, so it
                stays in the side column. */}
            {!cover && (
              <span className="chip chip-on">
                <LockSimple size={12} weight="bold" aria-hidden="true" />
                Client work, not public
              </span>
            )}
            {tags}
          </div>
        </div>
      </article>
    );
  }

  return (
    <article aria-labelledby={titleId} className="card group flex h-full flex-col p-3">
      <div className={`${frame} ${MEDIA_ASPECT[span]}`}>
        {cover ? (
          <Image
            src={cover}
            alt={`${title}, screenshot of the live deployment`}
            fill
            sizes={MEDIA_SIZES[span]}
            className={ZOOM}
          />
        ) : (
          <Placeholder slug={slug} />
        )}
      </div>

      <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
        {heading}
        <p className="mt-2 text-[0.95rem] text-muted">{summary}</p>
        <div className="mt-4">{tags}</div>
        {/* mt-auto keeps the action row on one baseline across cards. */}
        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          <a href={repo} target="_blank" rel="noopener noreferrer" className="btn btn-sm">
            <GithubLogo size={16} aria-hidden="true" />
            Code
            <span className="sr-only">for {title} on GitHub (opens in a new tab)</span>
          </a>
          <a href={demo} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
            Live demo
            <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
            <span className="sr-only">of {title} (opens in a new tab)</span>
          </a>
        </div>
      </div>
    </article>
  );
}
