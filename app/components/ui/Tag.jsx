/**
 * Stack tag. A technology name is metadata, so it never takes the accent.
 * Styling lives in globals.css (.tag).
 */
export default function Tag({ children }) {
  return <span className="tag">{children}</span>;
}
