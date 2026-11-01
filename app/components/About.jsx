import { about, profile } from '../data/site';
import Reveal from './ui/Reveal';
import Section from './ui/Section';

/**
 * Bio on the left, a dark terminal block on the right. The terminal prints
 * the real facts from site.js as `whoami` output, which is the reference's
 * "dark terminal on paper" pattern used for actual content.
 */
export default function About() {
  return (
    <Section
      id="about"
      eyebrow={about.path}
      title={about.title}
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <Reveal className="flex max-w-prose flex-col gap-4 text-muted lg:col-span-7">
          <p className="font-semibold text-ink">{about.body}</p>
          <p>{about.bodyExtra}</p>
          <p>{about.bodyClose}</p>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-5">
          <div className="term">
            <div className="term-bar" aria-hidden="true">
              <span className="term-dot" />
              <span className="term-dot" />
              <span className="term-dot" />
              <span className="ml-2">~/{profile.brand}</span>
            </div>
            <div className="p-5">
              <p aria-hidden="true">
                <span className="text-accent">$</span> whoami
              </p>
              <p className="text-night-ink">{profile.name}</p>
              <dl className="mt-4 flex flex-col gap-3">
                {about.facts.map((fact) => (
                  <div key={fact.term}>
                    <dt className="text-[0.72rem] uppercase tracking-[0.12em] text-night-muted">
                      {fact.term}
                    </dt>
                    <dd className="text-night-ink">{fact.detail}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4" aria-hidden="true">
                <span className="text-accent">$</span>{' '}
                <span className="inline-block h-[1em] w-[0.55em] translate-y-[2px] animate-pulse bg-night-ink" />
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
