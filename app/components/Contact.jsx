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
import Magnetic from './motion/Magnetic';
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
 * Direct channels only. The message form was removed (ADR-017): it had no
 * credentials behind it, so it could not send, and a contact form that
 * silently fails is worse than no form at all.
 *
 * Email is promoted out of the list and set at heading scale, because it is
 * the one path this section exists to push people down. The rest are a
 * hairline list, ordered by relevance to the primary audience.
 */
export default function Contact() {
  const [primary, ...rest] = channels;
  const PrimaryIcon = ICONS[primary.icon];

  return (
    <Section id="contact" path={contact.path} title={contact.title} lead={contact.lead}>
      <Reveal from="left">
        <a
          href={primary.href}
          className="group flex items-center justify-between gap-6 border-y border-line py-8 transition-colors duration-base ease-inout hover:bg-sunken"
        >
          <span className="flex min-w-0 items-center gap-5">
            <PrimaryIcon
              size={28}
              aria-hidden="true"
              className="shrink-0 text-fg-subtle transition-colors duration-fast ease-inout group-hover:text-accent"
            />
            <span className="min-w-0">
              <span className="block font-mono text-label uppercase text-fg-subtle">
                {primary.label}
              </span>
              <span className="mt-2 block truncate text-h3 text-fg transition-colors duration-fast ease-inout group-hover:text-accent">
                {primary.handle}
              </span>
            </span>
          </span>
          <Magnetic strength={0.4}>
            <ArrowUpRight
              size={28}
              aria-hidden="true"
              className="shrink-0 text-fg-subtle transition-colors duration-fast ease-inout group-hover:text-fg"
            />
          </Magnetic>
        </a>
      </Reveal>

      <ul className="mt-10 grid gap-x-10 sm:grid-cols-2">
        {rest.map(({ icon, label, handle, href }, i) => {
          const Icon = ICONS[icon];
          return (
            <li key={label}>
              <Reveal from={i % 2 === 0 ? 'left' : 'right'} delay={(i % 2) * 0.06}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 border-b border-line py-4 transition-colors duration-fast ease-inout hover:bg-sunken"
                >
                  <Icon
                    size={20}
                    aria-hidden="true"
                    className="shrink-0 text-fg-subtle transition-colors duration-fast ease-inout group-hover:text-accent"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block text-body-sm text-fg">{label}</span>
                    <span className="block truncate font-mono text-label text-fg-subtle">
                      {handle}
                    </span>
                  </span>
                  <ArrowUpRight
                    size={16}
                    aria-hidden="true"
                    className="shrink-0 text-fg-subtle transition-colors duration-fast ease-inout group-hover:text-fg"
                  />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
