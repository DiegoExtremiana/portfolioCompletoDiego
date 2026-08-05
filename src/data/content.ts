import type { ContactLink, TimelineEvent } from '../types';

export const PROFILE = {
  name: 'Diego Extremiana',
  role: 'Desarrollador Web',
  location: 'Nájera, La Rioja',
  photo: '/media/images/perfilDiego.jpg',
  /** Short rotating descriptors shown in the hero. */
  roles: [  'Web',   'de Aplicaciones',   'de Productos',   'de Soluciones', ],
  tagline:    'Construyendo aplicaciones web mientras aprendo algo nuevo en cada proyecto.',
} as const;

export const ABOUT_PARAGRAPHS: string[] = [
  '¡Hola! Soy Diego, desarrollador web con experiencia en Laravel, WordPress, PrestaShop, React y PHP. Me gusta crear aplicaciones útiles, mantener un código limpio y enfrentarme a nuevos retos. Durante mi experiencia profesional he tenido la oportunidad de trabajar en proyectos reales en producción y adaptarme rápidamente a diferentes tecnologías según las necesidades de cada proyecto.',
  'Además de mi trabajo, disfruto desarrollando proyectos personales con los que sigo aprendiendo y experimentando con nuevas herramientas. En este portafolio encontrarás una selección de ellos, ya que gran parte de mi trabajo profesional no puede mostrarse por acuerdos de confidencialidad.',
];

/** Curated tools/frameworks not always captured by GitHub language bytes. */
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
  'Git',
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
    title: 'Programador Web (Backend / Full-stack)',
    org: 'SDi',
    orgUrl: 'https://www.sdi.es/',
    logo: '/media/images/sdi.png',
    start: '2026-04',
    end: 'present',
    description:
      'Cubrí la necesidad inicial de backend aprendiendo Laravel de forma autodidacta, entregué 2 tiendas online en PrestaShop y desarrollé 3 sitios en WordPress, además de resolver incidencias de front-end en proyectos ya publicados.',
    tags: ['Laravel', 'PrestaShop', 'WordPress', 'PHP', 'SQL'],
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
    title: 'Programador Informático',
    org: 'Wunder Control Solutions',
    orgUrl: 'https://wundersolutions.es/',
    logo: '/media/images/wunder.png',
    start: '2024-10',
    end: '2024-12',
    description:
      'Aplicación web de control de presencia completa y funcional: frontend en React con componentes reutilizables, back-end en PHP e integración de API para gestión de datos en tiempo real. Estilo completo con SCSS, interfaz moderna y responsiva.',
    tags: ['React', 'PHP', 'SCSS', 'API'],
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
