import { skills } from '../data/site';
import Reveal from './ui/Reveal';
import Section from './ui/Section';
import Tag from './ui/Tag';

/**
 * Six flat cards for the strongest skills, one per layer. Six fills both a
 * 2-column and a 3-column grid exactly, so there is never an empty cell.
 * Secondary skills follow as one compact row. No scores.
 */
export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow={skills.path}
      title={skills.title}
      lead={skills.lead}
    >
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {skills.groups.map((group, i) => (
          <Reveal as="li" key={group.name} delay={(i % 3) * 0.06} className="card">
            <h3 className="text-[1.05rem]">{group.name}</h3>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <li key={item}>
                  <Tag>{item}</Tag>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ul>

      {skills.also.length > 0 && (
        <Reveal className="mt-8 border-t border-line pt-6">
          <h3 className="eyebrow">{skills.alsoLabel}</h3>
          <ul className="flex flex-wrap gap-1.5">
            {skills.also.map((item) => (
              <li key={item}>
                <Tag>{item}</Tag>
              </li>
            ))}
          </ul>
        </Reveal>
      )}
    </Section>
  );
}
