import type { Repo } from '../types';

// Every key below is a lowercase repo name.
const HIDDEN_REPOS = new Set(['salimos-']);

const PINNED_ORDER = ['diegoncurso', 'collect-connect', 'cafesdiego', 'cuentatiempo', '3enraya'];

// Repos with a preview in public/media/projects/<name>.webp
const SCREENSHOTS = new Set([
  'cafesdiego',
  'cuentatiempo',
  '3enraya',
  'listatareas_jquery',
  'piedrapapeltijera',
  'generar6pokemons',
]);

const OVERRIDES: Record<string, Partial<Pick<Repo, 'title' | 'description'>>> = {
  cafesdiego: {
    title: 'Contador de Cafés',
    description:
      'Registro y análisis del consumo de café en la jornada laboral, con TypeScript y Supabase',
  },
  '3enraya': {
    title: '3 en Raya',
    description: 'Juego del 3 en raya con Vite y React, con modos fácil, medio y difícil',
  },
  curriculumdigital: {
    title: 'Currículum Digital',
    description: 'Versión web de mi currículum',
  },
  listatareas_jquery: {
    title: 'Gestor de Tareas',
    description: 'Gestor de tareas con jQuery: prioridades, pendientes y completadas',
  },
  piedrapapeltijera: {
    title: 'Piedra, Papel, Tijera',
    description: 'Piedra, papel o tijera contra la máquina, con modo clásico y modo Big Bang',
  },
  generar6pokemons: {
    title: 'Generador de Pokémon',
    description: 'Genera equipos aleatorios de Pokémon con sus estadísticas',
  },
  'instalaciones-app': {
    title: 'Gestión de Instalaciones',
    description: 'Prueba técnica en Angular para ver y editar instalaciones sobre un mapa',
  },
};

// Projects that aren't a public GitHub repo. They have no date because there's no push to show.
const MANUAL_REPOS: Repo[] = [
  {
    id: -1,
    name: 'diegoncurso',
    title: 'Diegoncurso',
    description: 'Concurso de preguntas de videojuegos para Twitch, con más de 1.500 preguntas',
    htmlUrl: 'https://github.com/DiegoExtremiana',
    homepage: 'https://diegoncurso.es',
    hasPages: false,
    demoUrl: 'https://diegoncurso.es',
    pushedAt: '',
    createdAt: '',
    updatedAt: '',
    stars: 0,
    topics: [],
    primaryLanguage: 'JavaScript',
    languages: { JavaScript: 65.3, PHP: 34.7 },
    languagePercentages: [
      { language: 'JavaScript', percentage: 65.3, color: '#f1e05a' },
      { language: 'PHP', percentage: 34.7, color: '#4F5D95' },
    ],
    image: '/media/projects/diegoncurso.webp',
  },
  {
    id: -2,
    name: 'collect-connect',
    title: 'Collect-Connect',
    description: 'En desarrollo · Plataforma para catalogar e intercambiar colecciones',
    htmlUrl: '',
    homepage: null,
    hasPages: false,
    demoUrl: null,
    pushedAt: '',
    createdAt: '',
    updatedAt: '',
    stars: 0,
    topics: ['react', 'php', 'mysql'],
    primaryLanguage: 'JavaScript',
    languages: { JavaScript: 0, PHP: 0, CSS: 0, HTML: 0 },
    languagePercentages: [
      { language: 'JavaScript', percentage: 0, color: '#f1e05a' },
      { language: 'PHP', percentage: 0, color: '#4F5D95' },
      { language: 'CSS', percentage: 0, color: '#563d7c' },
    ],
    image: '',
  },
];

// GitHub repos worth showing; the tech stack is computed from these too.
export function visibleRepos(repos: Repo[]): Repo[] {
  return repos.filter((r) => !HIDDEN_REPOS.has(r.name.toLowerCase()));
}

export function curateRepos(repos: Repo[]): Repo[] {
  const shown = visibleRepos(repos).map((r) => {
    const key = r.name.toLowerCase();
    return { ...r, image: SCREENSHOTS.has(key) ? `/media/projects/${key}.webp` : '', ...OVERRIDES[key] };
  });
  const existing = new Set(shown.map((r) => r.name.toLowerCase()));
  const combined = [...shown, ...MANUAL_REPOS.filter((r) => !existing.has(r.name.toLowerCase()))];

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
