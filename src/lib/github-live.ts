/**
 * Client-side refresh of the GitHub data baked into the build.
 *
 * Language breakdowns need one request per repo but only change on a push, so a
 * repo is only asked again when its `pushed_at` differs from the one we already
 * know (snapshot or a previous visit). A normal visit costs a single request,
 * which matters with the 60 requests/hour anonymous limit.
 */
import type { Repo } from '../types';
import { github, toLanguageShares } from '../data/github';

const USERNAME = 'DiegoExtremiana';
const EXCLUDE = new Set(['portfoliocompletodiego', 'diegoextremiana']);
const HEADERS = { Accept: 'application/vnd.github+json' };
const LANG_CACHE_KEY = 'gh-langs-v1';

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
  pushed_at: string | null;
  created_at: string;
  updated_at: string;
  stargazers_count: number;
  topics?: string[];
  language: string | null;
  languages_url: string;
}

interface LangEntry {
  pushedAt: string;
  languages: Record<string, number>;
}

type LangCache = Record<string, LangEntry>;

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

function readLangCache(): LangCache {
  try {
    const raw = localStorage.getItem(LANG_CACHE_KEY);
    return raw ? (JSON.parse(raw) as LangCache) : {};
  } catch {
    return {};
  }
}

function writeLangCache(cache: LangCache) {
  try {
    localStorage.setItem(LANG_CACHE_KEY, JSON.stringify(cache));
  } catch {
    /* storage full or unavailable */
  }
}

// Snapshot and previous visits, whichever has the newest push for each repo.
function knownLanguages(cache: LangCache): Map<number, LangEntry> {
  const known = new Map<number, LangEntry>();
  for (const r of github.repos) {
    known.set(r.id, { pushedAt: r.pushedAt, languages: r.languages });
  }
  for (const [id, entry] of Object.entries(cache)) {
    const snap = known.get(Number(id));
    if (!snap || entry.pushedAt >= snap.pushedAt) known.set(Number(id), entry);
  }
  return known;
}

export async function fetchLiveRepos(): Promise<Repo[] | null> {
  let raw: GhListRepo[];
  try {
    const res = await fetch(
      `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=pushed&type=owner`,
      { headers: HEADERS },
    );
    if (!res.ok) return null;
    raw = (await res.json()) as GhListRepo[];
    if (!Array.isArray(raw)) return null;
  } catch {
    return null;
  }

  const cache = readLangCache();
  const known = knownLanguages(cache);

  const resolved = await Promise.all(
    raw
      .filter((r) => !r.fork && !r.archived && !r.private && !EXCLUDE.has(r.name.toLowerCase()))
      .map(async (r) => {
        const pushedAt = r.pushed_at ?? r.created_at;
        const prev = known.get(r.id);
        if (prev && prev.pushedAt === pushedAt) {
          return { r, pushedAt, languages: prev.languages, verified: true };
        }
        try {
          const res = await fetch(r.languages_url, { headers: HEADERS });
          if (!res.ok) throw new Error(`GitHub ${res.status}`);
          const languages = (await res.json()) as Record<string, number>;
          return { r, pushedAt, languages, verified: true };
        } catch {
          // Rate limited or offline: keep the last breakdown so the repo doesn't lose its languages.
          const languages = prev?.languages ?? (r.language ? { [r.language]: 1 } : {});
          return { r, pushedAt, languages, verified: false };
        }
      }),
  );

  const nextCache: LangCache = {};
  for (const { r, pushedAt, languages, verified } of resolved) {
    if (verified) nextCache[r.id] = { pushedAt, languages };
    else if (cache[r.id]) nextCache[r.id] = cache[r.id];
  }
  writeLangCache(nextCache);

  return resolved
    .map(({ r, languages }): Repo => {
      const homepage = normalizeHomepage(r.homepage);
      const demoUrl =
        homepage || (r.has_pages ? `https://${USERNAME.toLowerCase()}.github.io/${r.name}/` : null);

      return {
        id: r.id,
        name: r.name,
        title: prettify(r.name),
        description: r.description,
        htmlUrl: r.html_url,
        homepage,
        hasPages: Boolean(r.has_pages),
        demoUrl,
        pushedAt: r.pushed_at ?? r.created_at,
        createdAt: r.created_at,
        updatedAt: r.updated_at,
        stars: r.stargazers_count,
        topics: r.topics ?? [],
        primaryLanguage: r.language,
        languages,
        languagePercentages: toLanguageShares(languages),
        image: '',
      };
    })
    .sort((a, b) => new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime());
}
