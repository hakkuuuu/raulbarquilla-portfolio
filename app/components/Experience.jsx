import { experience } from '../data/site';
import Reveal from './ui/Reveal';
import Section from './ui/Section';
import Tag from './ui/Tag';

/**
 * One card per role. Dates and place sit in a narrow mono column on the
 * left, the role and its outcomes on the right. A current role carries the
 * yellow chip, the same "on" state the reference uses for live status.
 */
export default function Experience() {
  return (
    <Section id="experience" eyebrow={experience.path} title={experience.title} lead={experience.lead}>
      <ol className="flex flex-col gap-4">
        {experience.roles.map((item) => (
          <Reveal as="li" key={`${item.company}-${item.start}`} className="card p-6 sm:p-8">
            <article className="grid gap-6 md:grid-cols-12 md:gap-10">
              <div className="flex flex-col items-start gap-3 md:col-span-4">
                {item.current && <span className="chip chip-on">Current</span>}
                <p className="font-mono text-[0.82rem] text-muted">
                  {item.start} &ndash; {item.end}
                </p>
                <div>
                  <p className="font-semibold text-ink">{item.company}</p>
                  <p className="font-mono text-[0.78rem] text-faint">{item.location}</p>
                </div>
              </div>

              <div className="md:col-span-8">
                <h3 className="text-[1.35rem]">{item.role}</h3>
                <p className="mt-3 text-muted">{item.summary}</p>

                <ul className="mt-5 flex flex-col gap-2.5">
                  {item.highlights.map((line) => (
                    <li key={line} className="flex gap-3 text-[0.95rem] text-ink">
                      <span aria-hidden="true" className="mt-[0.55em] h-1.5 w-1.5 shrink-0 bg-accent" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>

                {item.stack.length > 0 && (
                  <ul className="mt-6 flex flex-wrap gap-1.5 border-t border-line pt-5">
                    {item.stack.map((tech) => (
                      <li key={tech}>
                        <Tag>{tech}</Tag>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
