import type { ContactLink, TimelineEvent } from '../types';

export const PROFILE = {
  name: 'Diego Extremiana',
  role: 'Desarrollador Web Full Stack',
  location: 'Nájera, La Rioja',
  photo: '/media/images/perfilDiego.jpg',
  /** Short rotating descriptors shown in the hero. */
  roles: ['Full Stack', 'Front-end', 'React & TypeScript', 'Creador de contenido'],
  tagline:
    'Construyo aplicaciones web que sirven para algo: cuidadas por dentro y por fuera.',
} as const;

export const ABOUT_PARAGRAPHS: string[] = [
  'Siempre he sido una persona curiosa y muy de "trastear". Ese impulso me llevó al desarrollo web, donde disfruto transformando ideas en algo tangible que funciona y ayuda a la gente. Me gusta entender el porqué de cada cosa, cuidar los detalles y crear experiencias agradables tanto en el código como en la interfaz.',
  'Trabajo con React, Angular, JavaScript, TypeScript, PHP y bases de datos, y me siento cómodo tanto creando interfaces dinámicas como montando la lógica que hay detrás. También soy streamer, algo que complementa mi faceta técnica: me mantiene conectado con la comunicación, el ritmo y el diseño visual.',
  'Soy constante, resolutivo y con ganas de seguir mejorando. Me motiva aprender, colaborar y construir proyectos con un propósito claro.',
];

/** Curated tools/frameworks not always captured by GitHub language bytes. */
export const SKILLS: string[] = [
  'React',
  'TypeScript',
  'Angular',
  'JavaScript',
  'PHP',
  'Laravel',
  'Tailwind CSS',
  'SQL',
  'Node.js',
  'Git',
  'PrestaShop',
  'WordPress',
];

export const CONTACT_LINKS: ContactLink[] = [
  {
    id: 'email',
    label: 'Email',
    value: 'dextremiana1998@gmail.com',
    href: 'mailto:dextremiana1998@gmail.com',
  },
  // {
  //   id: 'whatsapp',
  //   label: 'WhatsApp',
  //   value: '+34 610 521 810',
  //   href: 'https://wa.me/34610521810',
  // },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: 'diego-e',
    href: 'https://www.linkedin.com/in/diego-e-b08910198/',
  },
  {
    id: 'github',
    label: 'GitHub',
    value: 'DiegoExtremiana',
    href: 'https://github.com/DiegoExtremiana',
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

/**
 * Unified career + education + key certifications timeline.
 * Structured dates ('YYYY-MM') for reliable sorting — no string parsing.
 */
export const TIMELINE: TimelineEvent[] = [
  {
    id: 'sdi',
    type: 'work',
    title: 'Programador web',
    org: 'SDI · Soluciones Digitales Integrales',
    orgUrl: 'https://www.sdi.es/',
    start: '2026-04',
    end: 'present',
    description:
      'Consultas a base de datos mediante API y desarrollo de páginas y aplicaciones web con PrestaShop y Laravel.',
    tags: ['PrestaShop', 'PHP', 'Laravel', 'SQL', 'API'],
  },
  {
    id: 'grado-superior',
    type: 'education',
    title: 'Grado Superior en Desarrollo de Aplicaciones Web',
    org: 'FPD Rioja · Logroño',
    orgUrl: 'https://fpdrioja.es/',
    logo: '/media/images/FPDrioja.png',
    start: '2022-09',
    end: '2025-06',
    description: 'Formación técnica avanzada en desarrollo web y aplicaciones (a distancia).',
    tags: ['DAW'],
  },
  {
    id: 'wunder',
    type: 'work',
    title: 'Programador web Full Stack',
    org: 'Wunder Control Solutions',
    orgUrl: 'https://wundersolutions.es/',
    logo: '/media/images/wunder.png',
    start: '2024-09',
    end: '2025-01',
    description:
      'Aplicación responsive de control de presencia con perfiles, mensajería, registros y comunicación con la base de datos vía API.',
    tags: ['React', 'JavaScript', 'PHP', 'SQL', 'API'],
  },
  {
    id: 'logrono',
    type: 'work',
    title: 'Programador web Full Stack',
    org: 'Logroño Diseño Web',
    orgUrl: 'http://www.xn--logroodiseoweb-unbf.es/',
    start: '2021-07',
    end: '2022-02',
    description: 'Desarrollo a medida con código nativo, Angular y Firebase.',
    tags: ['Angular', 'JavaScript', 'PHP', 'Firebase'],
  },
  {
    id: 'arsys',
    type: 'work',
    title: 'Atención al cliente',
    org: 'Arsys',
    orgUrl: 'https://www.arsys.es/',
    logo: '/media/images/arsys.png',
    start: '2021-03',
    end: '2021-06',
    description: 'Soporte y resolución de problemas de usuarios en páginas web.',
    tags: ['Soporte técnico', 'Web'],
  },
  {
    id: 'grado-medio',
    type: 'education',
    title: 'Grado Medio en Sistemas Microinformáticos y Redes',
    org: 'IES Comercio · Logroño',
    orgUrl: 'https://iescomercio.com/',
    logo: '/media/images/IEScomercio.png',
    start: '2019-09',
    end: '2021-06',
    description: 'Base técnica en sistemas informáticos y redes.',
    tags: ['SMR'],
  },
  {
    id: 'google-web-2',
    type: 'certification',
    title: 'Introducción al Desarrollo Web: HTML y CSS (2/2)',
    org: 'Google Actívate',
    orgUrl: 'https://grow.google/intl/es/courses-and-tools/',
    logo: '/media/images/google.png',
    start: '2021-02',
    description: 'Fundamentos de desarrollo web con HTML y CSS.',
  },
  {
    id: 'google-web-1',
    type: 'certification',
    title: 'Introducción al Desarrollo Web: HTML y CSS (1/2)',
    org: 'Google Actívate',
    orgUrl: 'https://grow.google/intl/es/courses-and-tools/',
    logo: '/media/images/google.png',
    start: '2021-02',
    description: 'Fundamentos de desarrollo web con HTML y CSS.',
  },
  {
    id: 'google-apps',
    type: 'certification',
    title: 'Desarrollo de Apps Móviles',
    org: 'Google Actívate',
    orgUrl: 'https://grow.google/intl/es/courses-and-tools/',
    logo: '/media/images/google.png',
    start: '2021-01',
    description: 'Conceptos y herramientas para la creación de aplicaciones móviles.',
  },
];
