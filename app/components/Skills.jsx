import { skills } from '../data/site';
import Reveal from './ui/Reveal';
import Section from './ui/Section';
import Tag from './ui/Tag';

/**
 * Hairline-topped domain groups. No containers, no cards, no scores.
 *
 * Six groups fill both a 2-column and a 3-column grid exactly, so there is
 * never an empty cell. Items wrap as chips rather than stacking as rows, which
 * keeps an 8-item group and a 3-item group close to the same height.
 *
 * Deliberately open: no border box, no shared grid lines. That keeps it
 * distinct from the closed matrix used for projects.
 *
 * Each group enters from the side of the grid it sits on, so the motion traces
 * the layout rather than cutting across it.
 *
 * The proficiency percentages and progress rings this replaced are documented
 * in architecture.md ADR-005.
 */
export default function Skills() {
  return (
    <Section id="skills" path={skills.path} title={skills.title} lead={skills.lead}>
      <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {skills.groups.map((group, index) => (
          <Reveal
            key={group.name}
            from={index % 3 === 0 ? 'left' : index % 3 === 2 ? 'right' : 'up'}
            delay={(index % 3) * 0.06}
          >
            <div className="border-t border-line pt-5">
              <h3 className="font-mono text-label uppercase text-fg-subtle">{group.name}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item}>
                    <Tag>{item}</Tag>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
