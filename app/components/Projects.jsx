import { personalProjects, professionalProjects, work } from '../data/site';
import ProjectCard, { SPAN_CLASS } from './ProjectCard';
import Reveal from './ui/Reveal';
import Section from './ui/Section';

/**
 * Two groups, because paid client work and personal projects answer different
 * questions for a recruiter and should not be shuffled together.
 *
 * The personal group is a six-column bento. Spans come from the data and read
 * 4+2, 3+3, 4+2 down the page, which gives the grid rhythm rather than one
 * repeated tile size, and fills every row exactly with no empty cell.
 *
 * The span class sits on the Reveal wrapper, not the card, because the wrapper
 * is the grid item. Tiles enter from the side of the grid they occupy.
 *
 * Mobile collapse is explicit: one column below `sm`, two equal columns from
 * `sm`, and the authored spans only from `lg`, where a 2-of-6 tile is still
 * wide enough to hold a screenshot.
 */
function Bento({ children }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:gap-5">
      {children}
    </div>
  );
}

export default function Projects() {
  return (
    <Section id="projects" path={work.path} title={work.title} lead={work.lead}>
      <div className="flex flex-col gap-14">
        <div>
          <Reveal from="left">
            <div className="mb-5 border-t border-line pt-5">
              <h3 className="font-mono text-label uppercase text-fg-subtle">
                {work.professionalLabel}
              </h3>
              <p className="mt-2 max-w-prose text-body-sm text-fg-subtle">
                {work.professionalNote}
              </p>
            </div>
          </Reveal>

          <Bento>
            {professionalProjects.map((project, index) => (
              <Reveal key={project.slug} from="up" className="lg:col-span-6">
                <ProjectCard project={project} index={index} />
              </Reveal>
            ))}
          </Bento>
        </div>

        <div>
          <Reveal from="left">
            <div className="mb-5 border-t border-line pt-5">
              <h3 className="font-mono text-label uppercase text-fg-subtle">
                {work.personalLabel}
              </h3>
            </div>
          </Reveal>

          <Bento>
            {personalProjects.map((project, index) => (
              <Reveal
                key={project.slug}
                from={index % 2 === 0 ? 'left' : 'right'}
                delay={(index % 2) * 0.08}
                className={SPAN_CLASS[project.span ?? 3]}
              >
                <ProjectCard project={project} index={index} />
              </Reveal>
            ))}
          </Bento>
        </div>
      </div>
    </Section>
  );
}
