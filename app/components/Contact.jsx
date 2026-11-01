import {
  ArrowUpRight,
  BehanceLogo,
  EnvelopeSimple,
  FacebookLogo,
  GithubLogo,
  InstagramLogo,
  LinkedinLogo,
} from '@phosphor-icons/react/ssr';
import { channels, contact } from '../data/site';
import Reveal from './ui/Reveal';
import Section from './ui/Section';

const ICONS = {
  email: EnvelopeSimple,
  github: GithubLogo,
  linkedin: LinkedinLogo,
  behance: BehanceLogo,
  instagram: InstagramLogo,
  facebook: FacebookLogo,
};

/**
 * Closing call to action, centered as in the reference. Direct channels
 * only: there is no message form (ADR-017), because a form with no
 * credentials behind it fails silently.
 *
 * Email is promoted to the one yellow button, because it is the path this
 * section exists to push people down. The rest are small cards.
 */
export default function Contact() {
  const [primary, ...rest] = channels;

  return (
    <Section id="contact" eyebrow={contact.path} title={contact.title} lead={contact.lead} align="center">
      <Reveal className="flex justify-center">
        <a href={primary.href} className="btn btn-primary btn-lg max-w-full">
          <EnvelopeSimple size={20} weight="bold" aria-hidden="true" className="shrink-0" />
          <span className="truncate">{primary.handle}</span>
        </a>
      </Reveal>

      <ul className="mx-auto mt-12 grid max-w-[880px] gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map(({ icon, label, handle, href }, i) => {
          const Icon = ICONS[icon];
          return (
            <Reveal as="li" key={label} delay={(i % 3) * 0.05}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="card group flex items-center gap-3.5 p-4 transition-colors duration-100 hover:border-ink"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line bg-paper-2 text-ink">
                  <Icon size={19} aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold leading-tight text-ink">{label}</span>
                  <span className="block truncate font-mono text-[0.78rem] text-faint">{handle}</span>
                </span>
                <ArrowUpRight
                  size={16}
                  aria-hidden="true"
                  className="shrink-0 text-faint transition-colors duration-100 group-hover:text-ink"
                />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
