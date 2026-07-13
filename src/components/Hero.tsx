import { useEffect, useState } from 'react';
import { FiArrowDown, FiArrowUpRight, FiGithub, FiLinkedin } from 'react-icons/fi';
import { PROFILE } from '../data/content';
import { github, getLanguageChart, getRepos } from '../data/github';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { scrollToId } from '../lib/format';

const STATS = [
  { value: `${getRepos().length}`, label: 'Proyectos públicos' },
  { value: `${getLanguageChart().length}+`, label: 'Tecnologías' },
  { value: '2021', label: 'Desde' },
];

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setRoleIndex((v) => (v + 1) % PROFILE.roles.length), 2600);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <section id="inicio" className="relative flex min-h-screen items-center pt-24 pb-16">
      <div className="container-wide grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="animate-fade-up">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs font-medium text-muted backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent2 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent2" />
            </span>
            Disponible para nuevos proyectos
          </p>

          <h1 className="font-display text-4xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
            Hola, soy
            <br />
            <span className="bg-gradient-to-r from-accent via-accent-soft to-accent2 bg-clip-text text-transparent">
              {PROFILE.name}
            </span>
          </h1>

          <p className="mt-5 flex items-baseline gap-2 text-xl text-muted sm:text-2xl">
            <span className="text-content">Desarrollador</span>
            <span key={roleIndex} className="animate-fade-up font-semibold text-accent">
              {PROFILE.roles[roleIndex]}
            </span>
          </p>

          <p className="lead mt-6 max-w-xl">{PROFILE.tagline}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button onClick={() => scrollToId('proyectos')} className="btn-primary">
              Ver proyectos
              <FiArrowUpRight size={18} />
            </button>
            <button onClick={() => scrollToId('contacto')} className="btn-ghost">
              Contáctame
            </button>
            <div className="ml-1 flex items-center gap-1">
              <a
                href={github.user?.htmlUrl ?? 'https://github.com/DiegoExtremiana'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface/60 text-muted transition-colors hover:text-content"
              >
                <FiGithub size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/diego-e-b08910198/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface/60 text-muted transition-colors hover:text-content"
              >
                <FiLinkedin size={18} />
              </a>
            </div>
          </div>

          <dl className="mt-12 grid max-w-md grid-cols-3 gap-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="border-l border-border pl-4">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-2xl font-bold sm:text-3xl">{stat.value}</dd>
                <p className="mt-1 text-xs text-faint">{stat.label}</p>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-sm animate-fade-up lg:max-w-none">
          <div className="relative aspect-square">
            <div
              className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-accent/40 to-accent2/40 blur-2xl"
              aria-hidden="true"
            />
            <div className="absolute inset-0 overflow-hidden rounded-[2rem] border border-border bg-surface">
              <img
                src={PROFILE.photo}
                alt={`${PROFILE.name}, ${PROFILE.role}`}
                width={480}
                height={480}
                loading="eager"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 rounded-2xl border border-border bg-surface/90 px-4 py-3 shadow-soft backdrop-blur">
              <p className="font-display text-sm font-bold">{PROFILE.role}</p>
              <p className="text-xs text-muted">{PROFILE.location}</p>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => scrollToId('sobre-mi')}
        aria-label="Desplazar hacia abajo"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 animate-float text-faint transition-colors hover:text-content sm:block"
      >
        <FiArrowDown size={22} />
      </button>
    </section>
  );
}
