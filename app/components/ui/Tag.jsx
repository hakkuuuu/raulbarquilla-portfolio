/**
 * Stack tag. design_system.md section 7.1 (radius sm) and 5.3 (mono metadata).
 *
 * Deliberately not a pill and deliberately not accent-coloured: a stack name is
 * metadata, not a status and not a link.
 *
 * Uses `text-fg-muted`, not `text-fg-subtle`. The tag sits on `--surface-sunken`
 * rather than on the page, and subtle-on-sunken measures 4.44:1 in dark mode,
 * which is below AA. Muted-on-sunken is 6.78:1 dark and 6.73:1 light.
 */
export default function Tag({ children }) {
  return (
    <span className="inline-flex items-center rounded-sm border border-line bg-sunken px-2 py-1 font-mono text-label text-fg-muted">
      {children}
    </span>
  );
}
