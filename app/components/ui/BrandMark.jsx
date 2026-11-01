import { BACKGROUND, pixels } from './brandPixels.mjs';

const PIXELS = pixels();

/**
 * The brand mark: a pixel-art night owl developer, drawn from the shared grid
 * in brandPixels.mjs. The favicon is generated from the same grid.
 *
 * Decorative only. The link around it carries the accessible name.
 */
export default function BrandMark({ size = 24, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <rect width="16" height="16" rx="3" fill={BACKGROUND} />
      {PIXELS.map(({ x, y, fill }) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={fill} />
      ))}
    </svg>
  );
}
