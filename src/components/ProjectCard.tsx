import { useState } from 'react';
import { FiExternalLink, FiGithub, FiStar } from 'react-icons/fi';
import type { Repo } from '../types';
import { formatMonthYear } from '../lib/format';

export function ProjectCard({ repo }: { repo: Repo }) {
  const [imgError, setImgError] = useState(false);
  const langs = repo.languagePercentages.slice(0, 3);
  const description = repo.description?.trim() || `Proyecto de ${repo.primaryLanguage ?? 'código'}.`;

  return (
    <article className="card card-hover group flex flex-col overflow-hidden">
      <div className="relative aspect-[16/9] overflow-hidden border-b border-border bg-surface-2">
        {repo.image && !imgError ? (
          <img
            src={repo.image}
            alt={`Vista previa de ${repo.title}`}
            loading="lazy"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="grid h-full w-full place-items-center font-display text-4xl font-bold text-accent/70"
            style={{
              background:
                'radial-gradient(120% 120% at 30% 20%, rgb(var(--accent)/0.18), transparent 60%), rgb(var(--surface-2))',
            }}
          >
            {repo.title.charAt(0)}
          </div>
        )}
        {repo.stars > 0 && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-bg/70 px-2.5 py-1 text-xs font-medium backdrop-blur">
            <FiStar size={12} className="text-accent2" />
            {repo.stars}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-bold leading-tight">{repo.title}</h3>
          <time className="mt-1 flex-shrink-0 text-xs text-faint">
            {formatMonthYear(repo.pushedAt.slice(0, 7))}
          </time>
        </div>

        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-muted">{description}</p>

        {langs.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-x-3 gap-y-1.5">
            {langs.map((lang) => (
              <span key={lang.language} className="inline-flex items-center gap-1.5 text-xs text-muted">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: lang.color }}
                  aria-hidden="true"
                />
                {lang.language}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-center gap-2 pt-1">
          {repo.demoUrl && (
            <a
              href={repo.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex-1 !py-2 text-xs"
            >
              Ver demo
              <FiExternalLink size={14} />
            </a>
          )}
          <a
            href={repo.htmlUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn-ghost !py-2 text-xs ${repo.demoUrl ? '' : 'flex-1'}`}
            aria-label={`Código de ${repo.title} en GitHub`}
          >
            <FiGithub size={14} />
            {repo.demoUrl ? '' : 'Ver código'}
          </a>
        </div>
      </div>
    </article>
  );
}
