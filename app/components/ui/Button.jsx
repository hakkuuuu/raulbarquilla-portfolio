import { ArrowUpRight } from '@phosphor-icons/react/ssr';

/**
 * The only button in the system. Styling lives in globals.css (.btn).
 * Renders <a> when `href` is set, otherwise <button>.
 */

const VARIANTS = {
  primary: 'btn btn-primary',
  secondary: 'btn',
};

const SIZES = {
  sm: 'btn-sm',
  md: '',
  lg: 'btn-lg',
};

export default function Button({
  href,
  variant = 'primary',
  size = 'md',
  external = false,
  icon: Icon,
  className = '',
  children,
  ...props
}) {
  const classes = `${VARIANTS[variant]} ${SIZES[size]} ${className}`.replace(/\s+/g, ' ').trim();

  const content = (
    <>
      {Icon && <Icon size={18} weight="bold" aria-hidden="true" />}
      {children}
      {external && !Icon && <ArrowUpRight size={16} weight="bold" aria-hidden="true" />}
    </>
  );

  if (href) {
    const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
    return (
      <a href={href} className={classes} {...externalProps} {...props}>
        {content}
        {external && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {content}
    </button>
  );
}
