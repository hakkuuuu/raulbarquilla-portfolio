import { ArrowUpRight } from '@phosphor-icons/react/ssr';
import { profile } from '../data/site';

/**
 * Lifted out of Contact.jsx, where it previously lived inside the section.
 * No version strings, no locale strip, no build metadata.
 */
export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="container-page flex flex-col gap-3 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-body-sm text-fg-subtle">
          &copy; {year} {profile.name}
        </p>

        <a
          href={profile.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 self-start rounded-md text-body-sm text-fg-muted transition-colors duration-fast ease-inout hover:text-fg sm:self-auto"
        >
          This site on GitHub
          <ArrowUpRight size={14} aria-hidden="true" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </div>
    </footer>
  );
}
