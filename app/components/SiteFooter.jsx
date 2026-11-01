import { channels, navItems, profile } from '../data/site';

/**
 * Night footer, dark in both themes, as in the reference. A mono link row
 * and a copyright line. No version strings, no build metadata.
 */
export default function SiteFooter() {
  const year = new Date().getFullYear();
  const external = channels.filter((channel) => channel.icon !== 'email');

  const link = 'font-mono text-[0.8rem] text-night-muted transition-colors duration-100 hover:text-night-ink';

  return (
    <footer className="mt-10 border-t border-night-line bg-night text-night-ink">
      <div className="wrap flex flex-col gap-8 pb-10 pt-12">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
          <div>
            <p className="pixel text-[1.4rem]">dev.haku</p>
            <p className="mt-2 max-w-[38ch] text-[0.92rem] text-night-muted">
              {profile.role} in {profile.location}.
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-4 sm:flex-row sm:gap-12">
            <ul className="flex flex-col gap-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={link}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <ul className="flex flex-col gap-2">
              {external.map((channel) => (
                <li key={channel.label}>
                  <a href={channel.href} target="_blank" rel="noopener noreferrer" className={link}>
                    {channel.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-2 border-t border-night-line pt-6 sm:flex-row sm:justify-between">
          <p className="font-mono text-[0.78rem] text-night-muted">
            &copy; {year} {profile.name}
          </p>
          <a href={profile.sourceUrl} target="_blank" rel="noopener noreferrer" className={link}>
            This site on GitHub
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
