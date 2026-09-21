import type { ContactLink, TimelineEvent } from '../types';

export const GITHUB_URL = 'https://github.com/DiegoExtremiana';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/diegoextremiana';

export const PROFILE = {
  name: 'Diego Extremiana',
  role: 'Desarrollador Web Full-Stack',
  location: 'Nájera, La Rioja',
  photo: '/media/images/perfilDiego.jpg',
  roles: ['Web Full-Stack', 'de Aplicaciones', 'de Productos', 'de Soluciones'],
  tagline: 'Construyendo aplicaciones web mientras aprendo algo nuevo en cada proyecto.',
} as const;

export const ABOUT_PARAGRAPHS: string[] = [
  '¡Hola! Soy Diego, desarrollador web full-stack con experiencia real en producción. Me he integrado en equipos pequeños cubriendo huecos técnicos bajo presión: aprendí Laravel, PrestaShop y WordPress sobre la marcha y los apliqué directamente en proyectos con clientes reales, adaptándome a tres stacks distintos en cuatro meses.',
  'Construyo con HTML, SCSS, PHP, React, JavaScript, TypeScript y SQL, y llevo mis propios proyectos de principio a fin en GitHub, con integraciones con MySQL y Supabase. En este portafolio encontrarás una selección de ellos, ya que gran parte de mi trabajo profesional no puede mostrarse por acuerdos de confidencialidad.',
  'A esta base técnica sumo varios años de experiencia en atención al público, gestión de equipos y responsabilidad bajo presión (socorrismo, monitor de actividades, biblioteca), que me han dado una capacidad probada de aprendizaje autodidacta y de adaptación a entornos cambiantes. Además, he completado 22 cursos certificados de Anthropic Academy sobre Claude, Claude Code, MCP, agentes y alfabetización en IA.',
];

export const SKILLS: string[] = [
  'HTML',
  'SCSS/CSS',
  'JavaScript',
  'TypeScript',
  'PHP',
  'Laravel',
  'React',
  'Vite',
  'WordPress',
  'PrestaShop',
  'SQL',
  'MySQL',
  'Supabase',
  'APIs',
  'Git',
  'GitHub',
];

export const CONTACT_LINKS: ContactLink[] = [
  {
    id: 'email',
    label: 'Email',
    value: 'dextremiana1998@gmail.com',
    href: 'mailto:dextremiana1998@gmail.com',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: 'diegoextremiana',
    href: LINKEDIN_URL,
  },
  {
    id: 'github',
    label: 'GitHub',
    value: 'DiegoExtremiana',
    href: GITHUB_URL,
  },
];

export const EMAIL = 'dextremiana1998@gmail.com';

export const NAV_LINKS = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'sobre-mi', label: 'Sobre mí' },
  { id: 'trayectoria', label: 'Trayectoria' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'contacto', label: 'Contacto' },
] as const;

const ANTHROPIC_ACADEMY_URL = 'https://anthropic.skilljar.com/';

export const TIMELINE: TimelineEvent[] = [
  {
    id: 'anthropic-claude',
    type: 'certification',
    title: 'Desarrollo y Plataforma Claude',
    org: 'Anthropic Academy',
    orgUrl: ANTHROPIC_ACADEMY_URL,
    start: '2026-09',
    description:
      '8 cursos certificados sobre Claude, su API y plataforma, Claude Code y el uso de Claude en Google Cloud y Amazon Bedrock.',
    tags: [
      'Claude 101',
      'Claude Platform 101',
      'Building with the Claude API',
      'Claude Code 101',
      'Claude Code in Action',
      'Introduction to Claude Cowork',
      'Claude on Google Cloud',
      'Claude with Amazon Bedrock',
    ],
  },
  {
    id: 'anthropic-ai-fluency',
    type: 'certification',
    title: 'AI Fluency — Alfabetización en IA',
    org: 'Anthropic Academy',
    orgUrl: ANTHROPIC_ACADEMY_URL,
    start: '2026-09',
    description:
      '10 cursos certificados de alfabetización en IA: marco y fundamentos, aplicaciones por perfil y sector, y capacidades y limitaciones de la IA.',
    tags: [
      'AI Fluency: Framework & Foundations',
      'AI Fluency for Builders',
      'AI Fluency for Students',
      'AI Fluency for Educators',
      'AI Fluency for pK–12 Educators',
      'Teaching AI Fluency',
      'AI Fluency for Nonprofits',
      'AI Fluency for Small Businesses',
      'AI Fluency for Creative Work',
      'AI Capabilities and Limitations',
    ],
  },
  {
    id: 'anthropic-mcp',
    type: 'certification',
    title: 'Protocolo MCP y Agentes',
    org: 'Anthropic Academy',
    orgUrl: ANTHROPIC_ACADEMY_URL,
    start: '2026-09',
    description: '4 cursos certificados sobre Model Context Protocol, Agent Skills y subagentes.',
    tags: [
      'Introduction to Model Context Protocol',
      'Model Context Protocol: Advanced Topics',
      'Introduction to Agent Skills',
      'Introduction to Subagents',
    ],
  },
  {
    id: 'sdi',
    type: 'work',
    title: 'Programador Web (Backend / Full-stack)',
    org: 'SDi',
    orgUrl: 'https://www.sdi.es/',
    logo: '/media/images/sdi.png',
    start: '2026-04',
    end: '2026-08',
    description:
      'El equipo se quedó sin cobertura de backend: aprendí Laravel por mi cuenta y en pocas semanas entregaba funcionalidades en proyectos en producción. Entregué 2 tiendas online completas en PrestaShop y 3 sitios web en WordPress para clientes reales, y resolví incidencias de front-end en proyectos ya publicados. Me adapté a tres stacks distintos en cuatro meses.',
    tags: ['Laravel', 'PrestaShop', 'WordPress', 'PHP', 'SQL'],
  },
  {
    id: 'daw-fpd-rioja',
    type: 'education',
    title: 'Desarrollador de Aplicaciones Web · Programación Informática',
    org: 'FPD Rioja · Logroño',
    orgUrl: 'https://fpdrioja.es/',
    logo: '/media/images/FPDrioja.png',
    start: '2023-09',
    end: '2025-06',
    description: 'Formación técnica avanzada en desarrollo web y aplicaciones (a distancia).',
    tags: ['DAW'],
  },
  {
    id: 'wunder',
    type: 'work',
    title: 'Programador Informático',
    org: 'Wunder Control Solutions',
    orgUrl: 'https://wundersolutions.es/',
    logo: '/media/images/wunder.png',
    start: '2024-10',
    end: '2024-12',
    description:
      'El equipo necesitaba una herramienta propia de control de presencia: diseñé y entregué una aplicación web completa, validada por el equipo, con front-end en React (componentes reutilizables) y back-end en PHP. Registro, consulta y administración de asistencia en tiempo real mediante una API propia con peticiones asíncronas, y una interfaz moderna y responsiva con SCSS.',
    tags: ['React', 'PHP', 'SCSS', 'API'],
  },
  {
    id: 'daw-ies-comercio',
    type: 'education',
    title: 'Ciclo Formativo de Grado Superior · Desarrollo de Aplicaciones Web',
    org: 'IES Comercio · Logroño',
    orgUrl: 'https://iescomercio.com/',
    logo: '/media/images/IEScomercio.png',
    start: '2021',
    end: '2023',
    description: 'Formación técnica avanzada en desarrollo de aplicaciones web.',
    tags: ['DAW'],
  },
  {
    id: 'arsys',
    type: 'work',
    title: 'Técnico Informático — Atención al Cliente',
    org: 'Arsys',
    orgUrl: 'https://www.arsys.es/',
    logo: '/media/images/arsys.png',
    start: '2021-03',
    end: '2021-06',
    description:
      'Resolví dudas técnicas de usuarios sobre productos de hosting y dominios, reduciendo la fricción de configuración de sus páginas web recién adquiridas, y les ayudé en la configuración y el diseño de esas páginas.',
    tags: ['Soporte técnico', 'Hosting', 'Dominios', 'Web'],
  },
  {
    id: 'grado-medio',
    type: 'education',
    title: 'Ciclo Formativo de Grado Medio · Sistemas Microinformáticos y Redes',
    org: 'IES Comercio · Logroño',
    orgUrl: 'https://iescomercio.com/',
    logo: '/media/images/IEScomercio.png',
    start: '2019-09',
    end: '2021-06',
    description: 'Base técnica en sistemas informáticos y redes.',
    tags: ['SMR'],
  },
  {
    id: 'google-activate',
    type: 'certification',
    title: 'Desarrollo Web y Apps Móviles',
    org: 'Google Actívate',
    orgUrl: 'https://grow.google/intl/es/courses-and-tools/',
    logo: '/media/images/google.png',
    start: '2021-01',
    end: '2021-02',
    description:
      '3 cursos certificados: fundamentos de desarrollo web con HTML y CSS (en dos partes) y conceptos y herramientas para crear aplicaciones móviles.',
    tags: [
      'Introducción al Desarrollo Web: HTML y CSS (1/2)',
      'Introducción al Desarrollo Web: HTML y CSS (2/2)',
      'Desarrollo de Apps Móviles',
    ],
  },
];
