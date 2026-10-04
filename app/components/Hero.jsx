import { DownloadSimple, EnvelopeSimple } from '@phosphor-icons/react/ssr';
import { hero, profile } from '../data/site';
import Button from './ui/Button';
import HeroIntro from './motion/HeroIntro';
import Magnetic from './motion/Magnetic';

/**
 * Terminal hero. design_system.md section 17.
 *
 * The prompt line replaces the plain name eyebrow. It is a real shell prompt
 * carrying real information (user, host, command), not a fake terminal window
 * built out of divs, which is the pattern the Taste Skill bans in 4.8.
 *
 * Headline is monospace, which is the whole point of the direction: a
 * developer's medium used as the display face rather than as decoration.
 *
 * Four text elements, which is the cap: prompt, headline, lead, actions.
 */
export default function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="home-heading"
      className="flex items-center border-t border-transparent pb-16 pt-24 md:pb-20 md:pt-28"
    >
      <HeroIntro className="container-page grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-8">
          <p data-hero-item className="font-mono text-label text-fg-subtle">
            <span className="text-accent">{hero.promptUser}</span>
            <span className="text-fg-subtle">:</span>
            <span className="text-fg-muted">~</span>
            <span className="text-fg-subtle">$ </span>
            {hero.promptCommand}
          </p>

          <div data-hero-mask className="mt-5">
            <h1 id="home-heading" className="max-w-[22ch] font-mono text-display text-fg">
              {hero.headlineBefore}
              <span className="text-accent-alt">{hero.headlineAccent}</span>
              {hero.headlineAfter}
            </h1>
          </div>

          <p data-hero-item className="mt-5 max-w-prose text-body text-fg-muted">
            {hero.lead}
          </p>

          <div data-hero-item className="mt-8 flex flex-wrap items-center gap-3">
            <Magnetic>
              <Button href="#contact" variant="primary" icon={EnvelopeSimple}>
                Get in touch
              </Button>
            </Magnetic>
            <Magnetic>
              <Button href={profile.resume} variant="secondary" icon={DownloadSimple} external>
                View resume
              </Button>
            </Magnetic>
          </div>
        </div>

        {/* Key/value block in the manner of a shell system-info readout. It
            exists because DENSITY 8 cannot carry a dead half-screen, and it
            earns the space by holding what the left column does not: current
            focus and availability, kept disjoint from the About facts. */}
        <dl
          data-hero-item
          className="self-end border-t border-line pt-4 font-mono text-label lg:col-span-4"
        >
          {hero.meta.map(({ key, value }) => (
            <div
              key={key}
              className="flex items-baseline gap-3 border-b border-line py-2 last:border-b-0"
            >
              <dt className="w-24 shrink-0 text-accent">{key}</dt>
              <dd className="text-fg-muted">{value}</dd>
            </div>
          ))}
        </dl>
      </HeroIntro>
    </section>
  );
}
