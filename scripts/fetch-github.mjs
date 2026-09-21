/**
 * Writes src/data/github.generated.json from the public GitHub API (repos and
 * language bytes). It never fails the build: if the API errors or is rate
 * limited, the previous snapshot is kept. GITHUB_TOKEN raises the rate limit.
 */
import { writeFileSync, existsSync, readFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const USERNAME = process.env.GITHUB_USERNAME || 'DiegoExtremiana';
const TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || '';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_FILE = resolve(__dirname, '../src/data/github.generated.json');

const EXCLUDE = new Set(
  (process.env.GITHUB_EXCLUDE || 'portfolioCompletoDiego,DiegoExtremiana')
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean),
);

const LANGUAGE_COLORS = {
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

const headers = {
  Accept: 'application/vnd.github+json',
  'User-Agent': `${USERNAME}-portfolio-build`,
  'X-GitHub-Api-Version': '2022-11-28',
  ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
};

async function gh(url) {
  const res = await fetch(url, { headers });
  if (!res.ok) {
    throw new Error(`GitHub ${res.status} ${res.statusText} for ${url}`);
  }
  return res.json();
}

function keepSnapshot(err) {
  console.warn(`\n[fetch-github] ${err.message}`);
  if (existsSync(OUT_FILE)) {
    console.warn('[fetch-github] Keeping existing snapshot; build continues.\n');
    process.exit(0);
  }
  // Without any snapshot the app's imports would break, so write an empty valid one.
  writeSnapshot({
    generatedAt: null,
    ok: false,
    user: null,
    repos: [],
    languagePercentages: [],
  });
  console.warn('[fetch-github] Wrote empty fallback snapshot; build continues.\n');
  process.exit(0);
}

function writeSnapshot(data) {
  mkdirSync(dirname(OUT_FILE), { recursive: true });
  writeFileSync(OUT_FILE, JSON.stringify(data, null, 2) + '\n');
}

async function main() {
  console.log(`[fetch-github] Fetching public repos for @${USERNAME}${TOKEN ? ' (authenticated)' : ''}...`);

  const [user, reposRaw] = await Promise.all([
    gh(`https://api.github.com/users/${USERNAME}`),
    gh(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=pushed&type=owner`),
  ]);

  const repos = reposRaw
    .filter((r) => !r.fork && !r.archived && !r.private)
    .filter((r) => !EXCLUDE.has(r.name.toLowerCase()));

  const withLangs = await Promise.all(
    repos.map(async (r) => {
      let languages = {};
      try {
        languages = await gh(r.languages_url);
      } catch {
        languages = r.language ? { [r.language]: 1 } : {};
      }
      const homepage = normalizeHomepage(r.homepage);
      // Most repos leave `homepage` empty but publish a GitHub Pages demo.
      const demoUrl =
        homepage || (r.has_pages ? `https://${USERNAME.toLowerCase()}.github.io/${r.name}/` : null);
      return {
        id: r.id,
        name: r.name,
        title: prettifyName(r.name),
        description: r.description,
        htmlUrl: r.html_url,
        homepage,
        hasPages: Boolean(r.has_pages),
        demoUrl,
        pushedAt: r.pushed_at,
        createdAt: r.created_at,
        updatedAt: r.updated_at,
        stars: r.stargazers_count,
        topics: r.topics || [],
        primaryLanguage: r.language,
        languages,
        languagePercentages: toPercentages(languages),
        image: '',
      };
    }),
  );

  withLangs.sort((a, b) => new Date(b.pushedAt) - new Date(a.pushedAt));

  const totals = {};
  for (const r of withLangs) {
    for (const [lang, bytes] of Object.entries(r.languages)) {
      totals[lang] = (totals[lang] || 0) + bytes;
    }
  }

  const snapshot = {
    generatedAt: new Date().toISOString(),
    ok: true,
    user: {
      login: user.login,
      name: user.name,
      bio: user.bio,
      avatarUrl: user.avatar_url,
      htmlUrl: user.html_url,
      followers: user.followers,
      publicRepos: user.public_repos,
      location: user.location,
    },
    repos: withLangs,
    languagePercentages: toPercentages(totals),
  };

  writeSnapshot(snapshot);
  console.log(
    `[fetch-github] Wrote ${withLangs.length} repos, ${snapshot.languagePercentages.length} languages -> src/data/github.generated.json`,
  );
}

function toPercentages(languages) {
  const total = Object.values(languages).reduce((a, b) => a + b, 0);
  if (!total) return [];
  return Object.entries(languages)
    .map(([language, bytes]) => ({
      language,
      percentage: Math.round((bytes / total) * 1000) / 10,
      color: LANGUAGE_COLORS[language] || '#8b93a7',
    }))
    .sort((a, b) => b.percentage - a.percentage);
}

function normalizeHomepage(url) {
  if (!url) return null;
  const trimmed = url.trim();
  if (!trimmed) return null;
  return /^https?:\/\//.test(trimmed) ? trimmed : `https://${trimmed}`;
}

// "listaTareas_JQuery" -> "Lista Tareas JQuery"
function prettifyName(name) {
  return name
    .replace(/[-_]+/g, ' ')
    .replace(/([a-z\d])([A-Z])/g, '$1 $2')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

main().catch(keepSnapshot);
