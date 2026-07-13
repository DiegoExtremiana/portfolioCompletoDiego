/** Shape of the build-time GitHub snapshot (scripts/fetch-github.mjs). */
export interface LanguageShare {
  language: string;
  percentage: number;
  color: string;
}

export interface Repo {
  id: number;
  name: string;
  title: string;
  description: string | null;
  htmlUrl: string;
  homepage: string | null;
  hasPages: boolean;
  demoUrl: string | null;
  pushedAt: string;
  createdAt: string;
  updatedAt: string;
  stars: number;
  topics: string[];
  primaryLanguage: string | null;
  languages: Record<string, number>;
  languagePercentages: LanguageShare[];
  image: string;
}

export interface GithubUser {
  login: string;
  name: string | null;
  bio: string | null;
  avatarUrl: string;
  htmlUrl: string;
  followers: number;
  publicRepos: number;
  location: string | null;
}

export interface GithubSnapshot {
  generatedAt: string | null;
  ok: boolean;
  user: GithubUser | null;
  repos: Repo[];
  languagePercentages: LanguageShare[];
}

/** Curated content. */
export type TimelineType = 'work' | 'education' | 'certification';

export interface TimelineEvent {
  id: string;
  type: TimelineType;
  title: string;
  org: string;
  orgUrl?: string;
  logo?: string;
  /** 'YYYY-MM' or 'YYYY' */
  start: string;
  /** 'YYYY-MM', 'YYYY' or 'present' */
  end?: string;
  description: string;
  tags?: string[];
}

export interface ContactLink {
  id: string;
  label: string;
  value: string;
  href: string;
}
