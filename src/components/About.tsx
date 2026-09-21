import { SectionHeading } from './SectionHeading';
import { Reveal } from './Reveal';
import { TechStack } from './TechStack';
import { ABOUT_PARAGRAPHS, SKILLS } from '../data/content';
import { getLanguageNames } from '../data/github';
import { useGithubData } from '../hooks/useGithubData';

const TECH_ALIASES: Record<string, string> = { plpgsql: 'sql', css: 'scss/css', scss: 'scss/css' };
const techKey = (name: string) => TECH_ALIASES[name.toLowerCase()] ?? name.toLowerCase();

// Client work never shows up on GitHub, so the curated list stays and GitHub only adds to it.
function mergeTech(curated: string[], detected: string[]): string[] {
  const seen = new Set(curated.map(techKey));
  const extras = detected.filter((name) => {
    const key = techKey(name);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  return [...curated, ...extras];
}

export function About() {
  const { languages } = useGithubData();
  const skills = mergeTech(SKILLS, getLanguageNames(languages));

  return (
    <section id="sobre-mi" className="container-wide py-24 sm:py-28">
      <SectionHeading
        eyebrow="Sobre mí"
        title="Desarrollo web de principio a fin"
        description="Backend, front-end y tiendas online, con experiencia en proyectos de clientes reales."
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
              {skills.map((skill) => (
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
