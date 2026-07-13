/**
 * Live GitHub fetch (client-side).
 *
 * Pulls the public repo list in a single request so newly published projects —
 * and their demo link, when it exists — appear without a redeploy. Language
 * *breakdowns* are enriched from the build-time snapshot when available (they'd
 * otherwise cost one request per repo); brand-new repos fall back to their
 * primary language. Returns null on any failure so callers keep the snapshot.
 */
import type { Repo } from '../types';
import { github } from '../data/github';

const USERNAME = 'DiegoExtremiana';
const EXCLUDE = new Set(['portfoliocompletodiego', 'diegoextremiana']);

const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  HTML: '#e34c26',
  CSS: '#563d7c',
  SCSS: '#c6538c',
  PHP: '#4F5D95',
  Python: '#3572A5',
  Java: '#b07219',
  Vue: '#41b883',
  Astro: '#ff5a03',
  Dart: '#00B4AB',
  Go: '#00ADD8',
  Rust: '#dea584',
  Kotlin: '#A97BFF',
  Swift: '#F05138',
};

interface GhListRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  has_pages: boolean;
  fork: boolean;
  archived: boolean;
  private: boolean;
  pushed_at: string;
  created_at: string;
  updated_at: string;
  stargazers_count: number;
  topics?: string[];
  language: string | null;
}

function prettify(name: string): string {
  return name
    .replace(/[-_]+/g, ' ')
    .replace(/([a-z\d])([A-Z])/g, '$1 $2')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function normalizeHomepage(url: string | null): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  if (!trimmed) return null;
  return /^https?:\/\//.test(trimmed) ? trimmed : `https://${trimmed}`;
}

export async function fetchLiveRepos(signal?: AbortSignal): Promise<Repo[] | null> {
  let raw: GhListRepo[];
  try {
    const res = await fetch(
      `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=pushed&type=owner`,
      { headers: { Accept: 'application/vnd.github+json' }, signal },
    );
    if (!res.ok) return null;
    raw = (await res.json()) as GhListRepo[];
    if (!Array.isArray(raw)) return null;
  } catch {
    return null;
  }

  const snapshotById = new Map(github.repos.map((r) => [r.id, r]));

  return raw
    .filter((r) => !r.fork && !r.archived && !r.private && !EXCLUDE.has(r.name.toLowerCase()))
    .map((r): Repo => {
      const homepage = normalizeHomepage(r.homepage);
      const demoUrl =
        homepage || (r.has_pages ? `https://${USERNAME.toLowerCase()}.github.io/${r.name}/` : null);
      const snap = snapshotById.get(r.id);
      const primary = r.language;

      return {
        id: r.id,
        name: r.name,
        title: prettify(r.name),
        description: r.description,
        htmlUrl: r.html_url,
        homepage,
        hasPages: Boolean(r.has_pages),
        demoUrl,
        pushedAt: r.pushed_at,
        createdAt: r.created_at,
        updatedAt: r.updated_at,
        stars: r.stargazers_count,
        topics: r.topics ?? [],
        primaryLanguage: primary,
        languages: snap?.languages ?? (primary ? { [primary]: 1 } : {}),
        languagePercentages:
          snap && snap.languagePercentages.length > 0
            ? snap.languagePercentages
            : primary
              ? [{ language: primary, percentage: 100, color: LANGUAGE_COLORS[primary] ?? '#8b93a7' }]
              : [],
        image: `https://opengraph.githubassets.com/1/${USERNAME}/${r.name}`,
      };
    })
    .sort((a, b) => new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime());
}
