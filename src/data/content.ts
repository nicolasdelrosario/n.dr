export type Locale = 'es' | 'en';

export type ExperienceEntry = {
  role: string;
  company: string;
  period: string;
  href: string | null;
  bullets: string[];
  stack: string;
  current?: boolean;
};

export type ExperienceCopy = {
  title: string;
  currentLabel: string;
  entries: ExperienceEntry[];
};

export const content = {
  es: {
    locale: 'es' as Locale,
    languageName: 'English',
    languagePath: '/en/',
    title: 'Nicolas Del Rosario — Software claro y confiable',
    description: 'Portfolio de Nicolas Del Rosario, desarrollador de software en Lima, Perú.',
    eyebrow: 'Desarrollador de software · Lima, Perú',
    intro: 'Construyo software que hace simples los procesos complejos.',
	    email: 'delrosariolozanonicolas@gmail.com',
	    cv: '/CV.pdf',
	    nav: { intro: 'Inicio', work: 'Trabajo', experience: 'Experiencia', contact: 'Contacto', blog: 'Blog' },
	    labels: { selected: 'Trabajo seleccionado', own: 'Propio', client: 'Cliente', stack: 'Stack', visit: 'Visitar proyecto', soon: 'Descargar CV', email: 'Escríbeme', availability: 'Abierto a nuevas oportunidades', current: 'Actual', company: 'sitio web de la empresa', areas: 'Stack', theme: 'Cambiar tema', switchToDarkTheme: 'Tema oscuro', switchToLightTheme: 'Tema claro', stars: 'estrellas' },
    projects: [
      { name: 'WhatsApp n8n Server', type: 'own', description: 'REST API para automatización de WhatsApp con n8n.', stack: 'TypeScript · Hono · OpenAPI / Scalar · Docker · PostgreSQL · 26 estrellas', href: 'https://github.com/nicolasdelrosario/whatsapp-n8n-server' },
      { name: 'Inventra', type: 'own', description: 'SaaS multi-tenant de inventarios para PyMEs.', stack: 'Next.js · Elysia · Bun · Drizzle · PostgreSQL', href: 'https://inventra.nicolasdelrosario.com' },
      { name: 'Prince Club de Libros', type: 'client', description: 'Catálogo web para librería con búsqueda, wishlist, contacto por WhatsApp y panel admin.', stack: 'Next.js · Supabase · Vercel', href: 'https://prince-club-de-libros.nicolasdelrosario.com/' },
    ],
    experience: {
      title: 'Experiencia profesional',
      currentLabel: 'Actual',
      entries: [
        { role: 'Desarrollador Full Stack', company: 'Soluciones Digitales Group', period: 'jun 2026 - Presente', href: 'https://www.soluciones-digitales.com/', bullets: ['Software comercial para todo el flujo de ventas de telecomunicaciones: desde la precalificación y el alta del cliente hasta la propuesta, contrato, instalación y órdenes de trabajo.', 'Desarrollo guiado por especificaciones, IA aplicada y MCPs para convertir procesos de negocio en herramientas claras y mantenibles.'], stack: 'Full stack · Spec-driven development · IA aplicada · MCPs', current: true },
        { role: 'Desarrollador Full Stack', company: 'LainDS', period: 'feb 2026 - may 2026', href: null, bullets: ['Plataforma integral de matrículas académicas con inscripción, pagos y administración digitalizados.', 'Construcción de dashboards internos y una arquitectura modular, cuidando el rendimiento de frontend y backend.'], stack: 'Prisma · MongoDB · Frontend · Backend' },
        { role: 'Desarrollador Full Stack Junior', company: 'LetyMind', period: 'nov 2024 - nov 2025', href: 'https://letymind.com/', bullets: ['Sistemas internos y APIs para operaciones administrativas, con integraciones SQL y NoSQL.', 'Automatizaciones de WhatsApp con n8n, Chatwoot y Evolution API; observabilidad con Grafana, Prometheus y Node Exporter.', 'Documentación técnica y materiales de onboarding para facilitar el trabajo del equipo.'], stack: 'Node.js · n8n · SQL/NoSQL · Observabilidad' },
        { role: 'Practicante Frontend', company: 'EasyHotel', period: 'feb 2024 - jul 2024', href: 'https://www.easyhotel.pe/', bullets: ['Componentes responsive con React y TypeScript para flujos de reserva.', 'Colaboración en la experiencia de checkout y conversión, además de mejoras de rendimiento mediante lazy loading.'], stack: 'React · TypeScript · Responsive UI · Performance' },
      ],
    } satisfies ExperienceCopy,
    writing: 'Leer mi blog',
    footer: 'Software con criterio.',
    location: 'Lima, Perú',
  },
  en: {
    locale: 'en' as Locale,
    languageName: 'Español',
    languagePath: '/',
    title: 'Nicolas Del Rosario — Clear, reliable software',
    description: 'Portfolio of Nicolas Del Rosario, a software developer in Lima, Peru.',
    eyebrow: 'Software developer · Lima, Peru',
    intro: 'I build software that makes complex processes simple.',
	    email: 'delrosariolozanonicolas@gmail.com',
	    cv: '/CV-en.pdf',
	    nav: { intro: 'Home', work: 'Work', experience: 'Experience', contact: 'Contact', blog: 'Blog' },
	    labels: { selected: 'Selected work', own: 'Own', client: 'Client', stack: 'Stack', visit: 'Visit project', soon: 'Download CV', email: 'Email me', availability: 'Open to new opportunities', current: 'Current', company: 'company website', areas: 'Stack', theme: 'Change theme', switchToDarkTheme: 'Dark theme', switchToLightTheme: 'Light theme', stars: 'stars' },
    projects: [
      { name: 'WhatsApp n8n Server', type: 'own', description: 'REST API for WhatsApp automation with n8n.', stack: 'TypeScript · Hono · OpenAPI / Scalar · Docker · PostgreSQL · 26 stars', href: 'https://github.com/nicolasdelrosario/whatsapp-n8n-server' },
      { name: 'Inventra', type: 'own', description: 'Multi-tenant inventory SaaS for small and medium businesses.', stack: 'Next.js · Elysia · Bun · Drizzle · PostgreSQL', href: 'https://inventra.nicolasdelrosario.com' },
      { name: 'Prince Club de Libros', type: 'client', description: 'Bookshop catalogue with search, wishlist, WhatsApp contact and admin panel.', stack: 'Next.js · Supabase · Vercel', href: 'https://prince-club-de-libros.nicolasdelrosario.com/' },
    ],
    experience: {
      title: 'Professional experience',
      currentLabel: 'Current',
      entries: [
        { role: 'Full Stack Developer', company: 'Soluciones Digitales Group', period: 'Jun 2026 - Present', href: 'https://www.soluciones-digitales.com/', bullets: ['Commercial software for the full telecom sales flow: from prequalification and new customer through proposal, contract, installation and work orders.', 'Spec-driven development, applied AI and MCPs to turn business processes into clear, maintainable tools.'], stack: 'Full stack · Spec-driven development · Applied AI · MCPs', current: true },
        { role: 'Full Stack Developer', company: 'LainDS', period: 'Feb 2026 - May 2026', href: null, bullets: ['End-to-end academic enrollment platform with digitized enrollment, payments and administration.', 'Built internal dashboards and a modular architecture while improving frontend and backend performance.'], stack: 'Prisma · MongoDB · Frontend · Backend' },
        { role: 'Junior Full Stack Developer', company: 'LetyMind', period: 'Nov 2024 - Nov 2025', href: 'https://letymind.com/', bullets: ['Built internal systems and APIs for admin operations, with SQL and NoSQL integrations.', 'Created WhatsApp automations with n8n, Chatwoot and Evolution API; added observability with Grafana, Prometheus and Node Exporter.', 'Wrote technical documentation and onboarding materials to support the team.'], stack: 'Node.js · n8n · SQL/NoSQL · Observability' },
        { role: 'Frontend Intern', company: 'EasyHotel', period: 'Feb 2024 - Jul 2024', href: 'https://www.easyhotel.pe/', bullets: ['Built responsive React and TypeScript components for booking flows.', 'Collaborated on checkout UX and conversion, and improved performance through lazy loading.'], stack: 'React · TypeScript · Responsive UI · Performance' },
      ],
    } satisfies ExperienceCopy,
    writing: 'Read my blog',
    footer: 'Software built with judgment',
    location: 'Lima, Peru',
  },
} as const;
