import { FiArrowUp, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { EMAIL, NAV_LINKS, PROFILE } from '../data/content';
import { scrollToId } from '../lib/format';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="container-wide py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <button
              onClick={() => scrollToId('inicio')}
              className="flex items-center gap-2.5 font-display text-lg font-bold"
            >
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent text-white">
                DE
              </span>
              {PROFILE.name}
            </button>
            <p className="mt-3 text-sm text-muted">{PROFILE.tagline}</p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Pie de página">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToId(link.id)}
                className="text-sm text-muted transition-colors hover:text-content"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="https://github.com/DiegoExtremiana"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted transition-colors hover:text-content"
            >
              <FiGithub size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/diego-e-b08910198/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted transition-colors hover:text-content"
            >
              <FiLinkedin size={18} />
            </a>
            <a
              href={`mailto:${EMAIL}`}
              aria-label="Email"
              className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted transition-colors hover:text-content"
            >
              <FiMail size={18} />
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-sm text-faint sm:flex-row">
          <p>© {year} {PROFILE.name}. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <span>Hecho con React, TypeScript y Vite</span>
            <button
              onClick={() => scrollToId('inicio')}
              className="inline-flex items-center gap-1 transition-colors hover:text-content"
            >
              Arriba
              <FiArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
