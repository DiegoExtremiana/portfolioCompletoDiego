import { useEffect, useState } from 'react';
import type { Repo } from '../types';
import { github } from '../data/github';
import { fetchLiveRepos } from '../lib/github-live';

const CACHE_KEY = 'gh-repos-v1';

interface Cache {
  ts: number;
  repos: Repo[];
}

function readCache(): Repo[] | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Cache;
    return Array.isArray(parsed.repos) && parsed.repos.length > 0 ? parsed.repos : null;
  } catch {
    return null;
  }
}

function writeCache(repos: Repo[]) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), repos }));
  } catch {
    /* ignore quota/private-mode errors */
  }
}

/**
 * Repos with stale-while-revalidate:
 * render the cached/snapshot list instantly, then refresh live from GitHub.
 */
export function useGithubRepos(): { repos: Repo[]; live: boolean } {
  const [repos, setRepos] = useState<Repo[]>(() => readCache() ?? github.repos);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetchLiveRepos(controller.signal)
      .then((fresh) => {
        if (fresh && fresh.length > 0) {
          setRepos(fresh);
          setLive(true);
          writeCache(fresh);
        }
      })
      .catch(() => {
        /* keep snapshot/cache */
      });
    return () => controller.abort();
  }, []);

  return { repos, live };
}
