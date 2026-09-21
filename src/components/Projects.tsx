import { useMemo, useState } from 'react';
import { FiGithub, FiSearch } from 'react-icons/fi';
import { SectionHeading } from './SectionHeading';
import { Reveal } from './Reveal';
import { ProjectCard } from './ProjectCard';
import { github } from '../data/github';
import { useGithubData } from '../hooks/useGithubData';

export function Projects() {
  const [query, setQuery] = useState('');
  const { repos, live } = useGithubData();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return repos;
    return repos.filter((r) => {
      const haystack = [
        r.title,
        r.name,
        r.description ?? '',
        r.primaryLanguage ?? '',
        ...r.topics,
        ...Object.keys(r.languages),
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [query, repos]);

  return (
    <section id="proyectos" className="container-wide py-24 sm:py-28">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          eyebrow="Proyectos"
          title="Lo que he construido"
          description="Sincronizado en tiempo real con mis repositorios públicos de GitHub."
        />
        <Reveal className="mb-12 w-full sm:w-72">
          <div
            className={`mb-3 inline-flex items-center gap-1.5 text-xs transition-opacity ${
              live ? 'text-accent2 opacity-100' : 'opacity-0'
            }`}
            aria-hidden={!live}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent2 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent2" />
            </span>
            En vivo desde GitHub
          </div>
          <div className="relative">
            <FiSearch
              size={16}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-faint"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por nombre o tecnología…"
              aria-label="Buscar proyectos"
              className="w-full rounded-full border border-border bg-surface/60 py-2.5 pl-10 pr-4 text-sm text-content placeholder:text-faint focus:border-accent/60 focus:outline-none"
            />
          </div>
        </Reveal>
      </div>

      {repos.length === 0 ? (
        <div className="card p-10 text-center text-muted">
          <FiGithub className="mx-auto mb-3 text-2xl" />
          No se pudieron cargar los proyectos ahora mismo. Visita
          <a
            href="https://github.com/DiegoExtremiana"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-1 text-accent hover:underline"
          >
            mi GitHub
          </a>
          para verlos todos.
        </div>
      ) : filtered.length === 0 ? (
        <p className="card p-10 text-center text-muted">
          No hay proyectos que coincidan con «{query}».
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((repo, i) => (
            <Reveal key={repo.id} delay={Math.min(i, 5) * 60}>
              <ProjectCard repo={repo} />
            </Reveal>
          ))}
        </div>
      )}

      <Reveal className="mt-10 text-center">
        <a
          href={github.user?.htmlUrl ?? 'https://github.com/DiegoExtremiana'}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost"
        >
          <FiGithub size={16} />
          Ver todo en GitHub
        </a>
      </Reveal>
    </section>
  );
}
