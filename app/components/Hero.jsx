import { DownloadSimple, EnvelopeSimple } from '@phosphor-icons/react/ssr';
import { hero, profile } from '../data/site';
import Button from './ui/Button';
import Reveal from './ui/Reveal';

/**
 * Centered hero in the reference's pattern: mono eyebrow, a heavy display
 * headline with one highlighted phrase, a lead, two buttons, then a row of
 * four "pillar" cards carrying the current-focus facts.
 *
 * The eyebrow is a real shell prompt (user, host, command), not decoration.
 */
export default function Hero() {
  return (
    <section id="home" aria-labelledby="home-heading" className="overflow-hidden pb-6 pt-10 md:pt-16">
      <div className="wrap text-center">
        <Reveal>
          <p className="eyebrow mb-5 normal-case tracking-normal">
            <span className="text-ink">{hero.promptUser}</span>:~$ {hero.promptCommand}
          </p>

          <h1
            id="home-heading"
            className="mx-auto pb-[0.12em] text-[clamp(2.9rem,8.4vw,6.4rem)] font-black leading-[0.94] tracking-[-0.05em]"
          >
            {hero.headlineBefore}
            <em>{hero.headlineAccent}</em>
            {hero.headlineAfter}
          </h1>

          <p className="lead mx-auto mb-7 mt-5 max-w-[720px]">{hero.lead}</p>

          <div className="flex flex-wrap justify-center gap-3">
            <Button href="#contact" variant="primary" size="lg" icon={EnvelopeSimple}>
              Get in touch
            </Button>
            <Button href={profile.resume} variant="secondary" size="lg" icon={DownloadSimple} external>
              View resume
            </Button>
          </div>

          <p className="mt-5 font-mono text-[0.78rem] text-faint">{profile.location}</p>
        </Reveal>

        <ul className="mt-14 grid grid-cols-1 gap-3 text-left sm:grid-cols-2 lg:grid-cols-4">
          {hero.meta.map(({ key, value }, i) => (
            <Reveal as="li" key={key} delay={i * 0.06} className="card p-4">
              <span className={`chip ${key === 'status' ? 'chip-on' : ''}`}>{key}</span>
              <p className="mt-3 text-[0.95rem] font-semibold leading-snug text-ink">{value}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
