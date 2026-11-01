import { personalProjects, professionalProjects, work } from '../data/site';
import ProjectCard, { SPAN_CLASS } from './ProjectCard';
import Reveal from './ui/Reveal';
import Section from './ui/Section';

/**
 * Two groups, because paid client work and personal projects answer
 * different questions for a recruiter and should not be shuffled together.
 *
 * The personal group is a six-column bento. Spans come from the data and
 * fill every row exactly. Below `lg` the spans are ignored: two equal
 * columns from `sm`, one column on mobile.
 */
function GroupLabel({ children, note }) {
  return (
    <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line pb-3">
      <h3 className="font-mono text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-muted">
        {children}
      </h3>
      {note && <p className="max-w-prose text-[0.85rem] text-faint">{note}</p>}
    </div>
  );
}

export default function Projects() {
  return (
    <Section
      id="projects"
      eyebrow={work.path}
      title={work.title}
      lead={work.lead}
      className="border-y border-line bg-paper-2"
    >
      <div className="flex flex-col gap-14">
        <div>
          <GroupLabel note={work.professionalNote}>{work.professionalLabel}</GroupLabel>
          <div className="grid gap-4">
            {professionalProjects.map((project, i) => (
              <Reveal key={project.slug}>
                <ProjectCard project={project} index={i} />
              </Reveal>
            ))}
          </div>
        </div>

        <div>
          <GroupLabel>{work.personalLabel}</GroupLabel>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {personalProjects.map((project, i) => (
              <Reveal
                key={project.slug}
                delay={(i % 2) * 0.06}
                className={SPAN_CLASS[project.span ?? 3]}
              >
                <ProjectCard project={project} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
