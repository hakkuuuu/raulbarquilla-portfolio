import { ArrowUpRight } from '@phosphor-icons/react/ssr';

/**
 * The only button in the system. design_system.md section 10.
 *
 * Renders <a> when `href` is set, otherwise <button>.
 * Labels are three words maximum and must never wrap. The `whitespace-nowrap`
 * below enforces that visually; keeping the label short is the author's job.
 */

const VARIANTS = {
  primary:
    'bg-invert text-fg-invert hover:opacity-90 border border-transparent',
  secondary:
    'bg-surface text-fg border border-line-strong hover:bg-sunken',
  ghost:
    'bg-transparent text-fg-muted border border-transparent hover:bg-sunken hover:text-fg',
};

const SIZES = {
  md: 'h-11 px-5 text-body-sm',
  sm: 'h-9 px-3.5 text-body-sm',
  icon: 'h-10 w-10 justify-center',
};

export default function Button({
  as,
  href,
  variant = 'primary',
  size = 'md',
  external = false,
  icon: Icon,
  iconPosition = 'left',
  className = '',
  children,
  ...props
}) {
  const base =
    'inline-flex items-center gap-2 rounded-md font-medium whitespace-nowrap ' +
    'transition-[background-color,color,opacity,border-color] duration-fast ease-inout ' +
    'active:translate-y-px disabled:opacity-50 disabled:pointer-events-none';

  const classes = `${base} ${VARIANTS[variant]} ${SIZES[size]} ${className}`.trim();

  const glyph = Icon ? (
    <Icon size={18} weight={variant === 'primary' ? 'bold' : 'regular'} aria-hidden="true" />
  ) : null;

  const content = (
    <>
      {iconPosition === 'left' && glyph}
      {children}
      {iconPosition === 'right' && glyph}
      {/* The arrow stands in for the new-tab hint only when no icon was given,
          so a button never carries two glyphs. */}
      {external && !Icon && (
        <ArrowUpRight size={16} weight="bold" aria-hidden="true" className="opacity-60" />
      )}
    </>
  );

  if (href) {
    const externalProps = external
      ? { target: '_blank', rel: 'noopener noreferrer' }
      : {};

    return (
      <a href={href} className={classes} {...externalProps} {...props}>
        {content}
        {external && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    );
  }

  const Tag = as || 'button';
  return (
    <Tag className={classes} {...props}>
      {content}
    </Tag>
  );
}
