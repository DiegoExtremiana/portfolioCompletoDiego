import type { Repo } from '../types';

/** Repo names (lowercase) hidden from the public grid — not serious/portfolio-worthy. */
const HIDDEN_REPOS = new Set(['salimos-']);

/** Repo names (lowercase) shown first, in this order — mirrors the CV's featured projects. */
const PINNED_ORDER = ['diegoncurso', 'cafesdiego', 'cuentatiempo', '3enraya'];

/** Description overrides (lowercase repo name) — replaces whatever GitHub returns for that repo. */
const DESCRIPTION_OVERRIDES: Record<string, string> = {
  cafesdiego: 'Aplicación web para registrar y analizar el consumo de café',
};

/** Projects not hosted on a public GitHub repo (own server) — injected manually. */
const MANUAL_REPOS: Repo[] = [
  {
    id: -1,
    name: 'diegoncurso',
    title: 'Diegoncurso',
    description:
      'Concurso al estilo "¿Quién quiere ser millonario?" pensado para Twitch',
    htmlUrl: 'https://github.com/DiegoExtremiana',
    homepage: 'https://diegoncurso.es',
    hasPages: false,
    demoUrl: 'https://diegoncurso.es',
    pushedAt: '2025-01-01T00:00:00Z',
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z',
    stars: 0,
    topics: [],
    primaryLanguage: 'JavaScript',
    languages: { JavaScript: 64.3, PHP: 34.1, Other: 1.6 },
    languagePercentages: [
      { language: 'JavaScript', percentage: 64.3, color: '#f1e05a' },
      { language: 'PHP', percentage: 34.1, color: '#4F5D95' },
      { language: 'Other', percentage: 1.6, color: '#8b93a7' },
    ],
    image: '',
  },
];

/** Hides non-serious repos, injects manual (non-GitHub) projects, and pins the CV highlights first. */
export function curateRepos(repos: Repo[]): Repo[] {
  const filtered = repos
    .filter((r) => !HIDDEN_REPOS.has(r.name.toLowerCase()))
    .map((r) => {
      const override = DESCRIPTION_OVERRIDES[r.name.toLowerCase()];
      return override ? { ...r, description: override } : r;
    });
  const existing = new Set(filtered.map((r) => r.name.toLowerCase()));
  const combined = [...filtered, ...MANUAL_REPOS.filter((r) => !existing.has(r.name.toLowerCase()))];

  return combined.sort((a, b) => {
    const ai = PINNED_ORDER.indexOf(a.name.toLowerCase());
    const bi = PINNED_ORDER.indexOf(b.name.toLowerCase());
    if (ai !== -1 || bi !== -1) {
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    }
    return new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime();
  });
}
