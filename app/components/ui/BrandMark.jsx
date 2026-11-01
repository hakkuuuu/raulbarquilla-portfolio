/**
 * The dev.haku mark: a pixel "H" on the accent square, drawn on a 9x9 grid
 * so it matches the Silkscreen wordmark. Accent and accent-ink do not change
 * between themes, so the mark reads the same in light and dark.
 *
 * Decorative only. The link around it carries the accessible name.
 */
export default function BrandMark({ size = 24, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 9 9"
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <rect width="9" height="9" rx="1.5" fill="var(--accent)" />
      <path d="M2 2h1v5H2zM6 2h1v5H6zM3 4h3v1H3z" fill="var(--accent-ink)" />
    </svg>
  );
}
