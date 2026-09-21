import snapshot from './github.generated.json';
import type { GithubSnapshot, LanguageShare, Repo } from '../types';

export const github = snapshot as unknown as GithubSnapshot;

// Same map as scripts/fetch-github.mjs.
export const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  HTML: '#e34c26',
  CSS: '#563d7c',
  SCSS: '#c6538c',
  PHP: '#4F5D95',
  Python: '#3572A5',
  Java: '#b07219',
  'C#': '#178600',
  'C++': '#f34b7d',
  C: '#555555',
  Shell: '#89e051',
  Vue: '#41b883',
  Astro: '#ff5a03',
  Dart: '#00B4AB',
  Ruby: '#701516',
  Go: '#00ADD8',
  Rust: '#dea584',
  Kotlin: '#A97BFF',
  Swift: '#F05138',
  PLpgSQL: '#336790',
  Dockerfile: '#384d54',
  Makefile: '#427819',
};

const FALLBACK_COLOR = '#8b93a7';

const LANGUAGE_DENYLIST = new Set([
  'Batchfile',
  'Rich Text Format',
  'Makefile',
  'Dockerfile',
  'Roff',
  'TeX',
  'Shell',
]);

export function toLanguageShares(languages: Record<string, number>): LanguageShare[] {
  const total = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);
  if (!total) return [];
  return Object.entries(languages)
    .map(([language, bytes]) => ({
      language,
      percentage: Math.round((bytes / total) * 1000) / 10,
      color: LANGUAGE_COLORS[language] ?? FALLBACK_COLOR,
    }))
    .sort((a, b) => b.percentage - a.percentage);
}

export function aggregateLanguages(repos: Repo[]): LanguageShare[] {
  const totals: Record<string, number> = {};
  for (const repo of repos) {
    for (const [language, bytes] of Object.entries(repo.languages)) {
      totals[language] = (totals[language] ?? 0) + bytes;
    }
  }
  return toLanguageShares(totals);
}

export function getLanguageNames(shares: LanguageShare[]): string[] {
  return shares.filter((l) => !LANGUAGE_DENYLIST.has(l.language)).map((l) => l.language);
}

// Keeps the top languages and folds the rest into "Otros" so the bars add up to 100%.
export function getLanguageChart(shares: LanguageShare[], max = 6): LanguageShare[] {
  const clean = shares.filter((l) => !LANGUAGE_DENYLIST.has(l.language));
  const total = clean.reduce((sum, l) => sum + l.percentage, 0);
  if (total <= 0) return [];

  const normalized = clean
    .map((l) => ({ ...l, percentage: (l.percentage / total) * 100 }))
    .sort((a, b) => b.percentage - a.percentage);

  const top = normalized.slice(0, max);
  const restPct = normalized.slice(max).reduce((sum, l) => sum + l.percentage, 0);
  if (restPct > 0.5) {
    top.push({ language: 'Otros', percentage: restPct, color: FALLBACK_COLOR });
  }
  return top.map((l) => ({ ...l, percentage: Math.round(l.percentage * 10) / 10 }));
}
