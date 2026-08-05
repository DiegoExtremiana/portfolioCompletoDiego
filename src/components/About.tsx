import { SectionHeading } from './SectionHeading';
import { Reveal } from './Reveal';
import { TechStack } from './TechStack';
import { ABOUT_PARAGRAPHS, SKILLS } from '../data/content';

export function About() {
  return (
    <section id="sobre-mi" className="container-wide py-24 sm:py-28">
      <SectionHeading
        eyebrow="Sobre mí"
        title="Ideas convertidas en producto"
        description="Desarrollador web con experiencia en distintos stacks y capacidad para adaptarme rápidamente a nuevas tecnologías."
      />

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <Reveal className="space-y-5">
          {ABOUT_PARAGRAPHS.map((paragraph, i) => (
            <p key={i} className="leading-relaxed text-muted">
              {paragraph}
            </p>
          ))}

          <div className="pt-2">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-faint">
              Herramientas y tecnologías
            </h3>
            <div className="flex flex-wrap gap-2">
              {SKILLS.map((skill) => (
                <span key={skill} className="chip">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <TechStack />
        </Reveal>
      </div>
    </section>
  );
}
