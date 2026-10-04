import Reveal from './Reveal';
import ScrambleText from '../motion/ScrambleText';

/**
 * The page section landmark. design_system.md sections 5.4 and 6.2.
 *
 * Owns the container width and the vertical rhythm so no section can drift.
 * Do not set max-w-* or py-* on a section; change it here instead.
 *
 * `path` is the terminal direction's section marker: a mono `~/about` label
 * that replaces the old uppercase eyebrow. It is not decoration, it is the
 * section's name in the page's own idiom, and it is the only label the section
 * carries, so the eyebrow budget still holds at one per section.
 *
 * The heading is a masked reveal: it slides up out of a clip rather than
 * fading, which gives each section a clear opening beat.
 */
export default function Section({ id, title, lead, path, children, className = '' }) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`border-t border-line py-14 md:py-20 ${className}`.trim()}
    >
      <div className="container-page">
        {title ? (
          <>
            <div className="max-w-prose">
              {path && (
                <Reveal from="left">
                  <p className="path-label mb-3">{path}</p>
                </Reveal>
              )}
              <h2 id={headingId} aria-label={title} className="font-mono text-h2 text-fg">
                <ScrambleText text={title} />
              </h2>
              {lead && (
                <Reveal from="up" delay={0.1}>
                  <p className="mt-3 text-body-sm text-fg-muted">{lead}</p>
                </Reveal>
              )}
            </div>
            <div className="mt-8">{children}</div>
          </>
        ) : (
          children
        )}
      </div>
    </section>
  );
}
