import { about } from '../data/site';
import Reveal from './ui/Reveal';
import Section from './ui/Section';
import ScrambleText from './motion/ScrambleText';

/**
 * Heading and bio in a narrow measure, then the facts as a four-cell strip
 * with shared hairlines. Distinct from every other section: no cards, no
 * split, no grid of equal boxes.
 *
 * Four facts fill a 2-column grid at sm and a 4-column grid at lg exactly.
 * They enter left to right in sequence, matching the order they are read.
 */
export default function About() {
  return (
    <Section id="about">
      <Reveal from="left">
        <p className="path-label mb-3">{about.path}</p>
      </Reveal>

      <h2 id="about-heading" aria-label={about.title} className="font-mono text-h2 text-fg">
        <ScrambleText text={about.title} />
      </h2>

      <Reveal from="left" delay={0.08}>
        <div className="mt-4 flex max-w-prose flex-col gap-4 text-body text-fg-muted">
          <p>{about.body}</p>
          <p>{about.bodyExtra}</p>
          <p>{about.bodyClose}</p>
        </div>
      </Reveal>

      <dl className="mt-10 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
        {about.facts.map((fact, i) => (
          <Reveal key={fact.term} from="up" delay={i * 0.07} className="bg-page">
            <div className="p-5">
              <dt className="font-mono text-label uppercase text-fg-subtle">{fact.term}</dt>
              <dd className="mt-3 text-body-sm text-fg">{fact.detail}</dd>
            </div>
          </Reveal>
        ))}
      </dl>
    </Section>
  );
}
