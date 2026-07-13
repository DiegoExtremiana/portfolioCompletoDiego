import { useMemo, useState } from 'react';
import { FiAward, FiBookOpen, FiBriefcase, FiExternalLink } from 'react-icons/fi';
import type { IconType } from 'react-icons';
import { SectionHeading } from './SectionHeading';
import { Reveal } from './Reveal';
import { TIMELINE } from '../data/content';
import { formatRange, toSortKey } from '../lib/format';
import type { TimelineType } from '../types';

interface TypeMeta {
  label: string;
  icon: IconType;
  color: string;
}

const TYPE_META: Record<TimelineType, TypeMeta> = {
  work: { label: 'Experiencia', icon: FiBriefcase, color: '#2dd4bf' },
  education: { label: 'Formación', icon: FiBookOpen, color: '#8b7bff' },
  certification: { label: 'Certificación', icon: FiAward, color: '#f5a623' },
};

type Filter = 'all' | TimelineType;

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'Todo' },
  { id: 'work', label: 'Experiencia' },
  { id: 'education', label: 'Formación' },
  { id: 'certification', label: 'Certificaciones' },
];

export function Timeline() {
  const [filter, setFilter] = useState<Filter>('all');

  const events = useMemo(() => {
    const sorted = [...TIMELINE].sort((a, b) => toSortKey(b.start) - toSortKey(a.start));
    return filter === 'all' ? sorted : sorted.filter((e) => e.type === filter);
  }, [filter]);

  return (
    <section id="trayectoria" className="container-wide py-24 sm:py-28">
      <SectionHeading
        eyebrow="Trayectoria"
        title="Experiencia y formación"
        description="Un recorrido por mi experiencia profesional, mis estudios y las certificaciones que han marcado el camino."
      />

      <Reveal className="mb-10 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            aria-pressed={filter === f.id}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              filter === f.id
                ? 'border-accent bg-accent text-white'
                : 'border-border bg-surface/60 text-muted hover:text-content'
            }`}
          >
            {f.label}
          </button>
        ))}
      </Reveal>

      <ol className="relative">
        {/* Spine */}
        <span
          className="absolute bottom-2 top-2 left-4 w-px bg-gradient-to-b from-accent/60 via-border to-transparent lg:left-1/2 lg:-translate-x-1/2"
          aria-hidden="true"
        />

        {events.map((event, i) => {
          const meta = TYPE_META[event.type];
          const Icon = meta.icon;
          const leftSide = i % 2 === 0;
          return (
            <li
              key={event.id}
              className={`relative mb-8 lg:mb-4 lg:flex ${leftSide ? 'lg:justify-start' : 'lg:justify-end'}`}
            >
              {/* Dot */}
              <span
                className="absolute left-4 top-6 z-10 grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full border border-border bg-surface lg:left-1/2"
                style={{ color: meta.color }}
                aria-hidden="true"
              >
                <Icon size={15} />
              </span>

              <Reveal
                delay={Math.min(i, 4) * 60}
                className={`pl-12 lg:w-[calc(50%-2.5rem)] lg:pl-0 ${leftSide ? 'lg:pr-4' : 'lg:pl-4'}`}
              >
                <article className="card card-hover p-5">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold"
                      style={{ color: meta.color, backgroundColor: `${meta.color}1a` }}
                    >
                      {meta.label}
                    </span>
                    <time className="text-xs font-medium text-faint">
                      {formatRange(event.start, event.end)}
                    </time>
                  </div>

                  <div className="flex items-start gap-3">
                    {event.logo && (
                      <img
                        src={event.logo}
                        alt=""
                        width={40}
                        height={40}
                        loading="lazy"
                        className="mt-0.5 h-10 w-10 flex-shrink-0 rounded-lg bg-white/90 object-contain p-1"
                      />
                    )}
                    <div className="min-w-0">
                      <h3 className="font-display text-base font-bold leading-snug">
                        {event.title}
                      </h3>
                      {event.orgUrl ? (
                        <a
                          href={event.orgUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-accent hover:underline"
                        >
                          {event.org}
                          <FiExternalLink size={12} />
                        </a>
                      ) : (
                        <p className="text-sm text-muted">{event.org}</p>
                      )}
                    </div>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-muted">{event.description}</p>

                  {event.tags && event.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {event.tags.map((tag) => (
                        <span key={tag} className="chip !py-0.5 text-[0.7rem]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
