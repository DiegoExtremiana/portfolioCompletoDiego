import { useSyncExternalStore } from 'react';
import type { LanguageShare, Repo } from '../types';
import { aggregateLanguages, github } from '../data/github';
import { curateRepos, visibleRepos } from '../data/projects';
import { fetchLiveRepos } from '../lib/github-live';

const CACHE_KEY = 'gh-repos-v2';
const LEGACY_CACHE_KEY = 'gh-repos-v1';

interface Cache {
  ts: number;
  repos: Repo[];
}

export interface GithubData {
  repos: Repo[];
  languages: LanguageShare[];
  live: boolean;
}

// The cache is ignored when the build snapshot is newer than it.
function readCache(): Repo[] | null {
  try {
    localStorage.removeItem(LEGACY_CACHE_KEY);
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Cache;
    const snapshotTs = github.generatedAt ? Date.parse(github.generatedAt) : 0;
    return Array.isArray(parsed.repos) && parsed.repos.length > 0 && parsed.ts > snapshotTs
      ? parsed.repos
      : null;
  } catch {
    return null;
  }
}

function writeCache(repos: Repo[]) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), repos }));
  } catch {
    /* storage full or unavailable */
  }
}

function build(githubRepos: Repo[], live: boolean): GithubData {
  return {
    repos: curateRepos(githubRepos),
    languages: aggregateLanguages(visibleRepos(githubRepos)),
    live,
  };
}

// Module-level store so every component shares one fetch instead of one each.
let data = build(readCache() ?? github.repos, false);
let started = false;
const listeners = new Set<() => void>();

function refresh() {
  if (started) return;
  started = true;
  fetchLiveRepos()
    .then((fresh) => {
      if (!fresh || fresh.length === 0) return;
      writeCache(fresh);
      data = build(fresh, true);
      listeners.forEach((notify) => notify());
    })
    .catch(() => {
      /* keep the cached data */
    });
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  refresh();
  return () => {
    listeners.delete(listener);
  };
}

export function useGithubData(): GithubData {
  return useSyncExternalStore(subscribe, () => data);
}
