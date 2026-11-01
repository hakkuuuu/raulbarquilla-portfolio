import Reveal from './Reveal';

/** Wraps the last word of a plain-text title in <em> for the highlighter. */
function Highlighted({ text }) {
  const cut = text.lastIndexOf(' ');
  if (cut < 0) return <em>{text}</em>;
  return (
    <>
      {text.slice(0, cut + 1)}
      <em>{text.slice(cut + 1)}</em>
    </>
  );
}

/**
 * The page section landmark. Owns the container width and the vertical
 * rhythm, so no section sets its own max-width or padding.
 *
 * Header pattern from the reference: mono eyebrow, bold heading, muted lead.
 * The last word of `title` takes the highlighter stroke, so content stays a
 * plain string in site.js. `align="center"` centers the header block.
 */
export default function Section({
  id,
  eyebrow,
  title,
  lead,
  align = 'left',
  className = '',
  children,
}) {
  const headingId = `${id}-heading`;
  const centered = align === 'center';

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`py-[clamp(48px,7vw,96px)] ${className}`.trim()}
    >
      <div className="wrap">
        <Reveal className={centered ? 'mx-auto max-w-[760px] text-center' : 'max-w-[720px]'}>
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h2 id={headingId} className="text-[clamp(1.65rem,3.6vw,2.4rem)]">
            <Highlighted text={title} />
          </h2>
          {lead && <p className="mt-4 text-muted">{lead}</p>}
        </Reveal>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
