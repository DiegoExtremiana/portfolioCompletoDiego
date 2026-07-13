import snapshot from './github.generated.json';
import type { GithubSnapshot, LanguageShare, Repo } from '../types';

export const github = snapshot as unknown as GithubSnapshot;

/** Languages that are not representative of skills — hidden from the chart. */
const LANGUAGE_DENYLIST = new Set([
  'Batchfile',
  'Rich Text Format',
  'Makefile',
  'Dockerfile',
  'Roff',
  'TeX',
  'Shell',
]);

/**
 * Build a clean language chart: drop noise, keep the top N, renormalize to
 * 100%, and fold the remainder into "Otros" so the bar always sums to 100.
 */
export function getLanguageChart(
  shares: LanguageShare[] = github.languagePercentages,
  max = 6,
): LanguageShare[] {
  const clean = shares.filter((l) => !LANGUAGE_DENYLIST.has(l.language));
  const total = clean.reduce((sum, l) => sum + l.percentage, 0);
  if (total <= 0) return [];

  const normalized = clean
    .map((l) => ({ ...l, percentage: (l.percentage / total) * 100 }))
    .sort((a, b) => b.percentage - a.percentage);

  const top = normalized.slice(0, max);
  const restPct = normalized.slice(max).reduce((sum, l) => sum + l.percentage, 0);
  if (restPct > 0.5) {
    top.push({ language: 'Otros', percentage: restPct, color: '#8b93a7' });
  }
  return top.map((l) => ({ ...l, percentage: Math.round(l.percentage * 10) / 10 }));
}

/** Repos sorted most-recently-pushed first (snapshot is already sorted). */
export function getRepos(): Repo[] {
  return github.repos;
}

export const isGithubOk = github.ok && github.repos.length > 0;
