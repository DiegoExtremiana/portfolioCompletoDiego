import { useEffect, useState } from 'react';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import { NAV_LINKS } from '../data/content';
import { useActiveSection } from '../hooks/useActiveSection';
import { scrollToId } from '../lib/format';
import type { Theme } from '../hooks/useTheme';

const NAV_IDS = NAV_LINKS.map((l) => l.id);

interface HeaderProps {
  theme: Theme;
  onToggleTheme: () => void;
}

export function Header({ theme, onToggleTheme }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(NAV_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id: string) => {
    setMenuOpen(false);
    scrollToId(id);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || menuOpen
          ? 'border-b border-border bg-bg/70 backdrop-blur-xl'
          : 'border-b border-transparent'
      }`}
    >
      <div className="container-wide flex h-16 items-center justify-between">
        <button
          onClick={() => go('inicio')}
          className="group flex items-center gap-2.5 font-display text-base font-bold"
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent-strong text-white shadow-glow transition-transform group-hover:scale-105">
            DE
          </span>
          <span className="hidden sm:inline">Diego Extremiana</span>
        </button>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => go(link.id)}
              aria-current={active === link.id ? 'true' : undefined}
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                active === link.id
                  ? 'bg-surface-2 text-content'
                  : 'text-muted hover:text-content'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleTheme}
            className="grid h-9 w-9 place-items-center rounded-full border border-border bg-surface/60 text-muted transition-colors hover:text-content"
            aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
          >
            {theme === 'dark' ? <FiSun size={17} /> : <FiMoon size={17} />}
          </button>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-full border border-border bg-surface/60 text-content md:hidden"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <FiX size={19} /> : <FiMenu size={19} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="container-wide pb-4 md:hidden" aria-label="Móvil">
          <div className="flex flex-col gap-1 rounded-2xl border border-border bg-surface/80 p-2 backdrop-blur-xl">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => go(link.id)}
                className={`rounded-xl px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                  active === link.id ? 'bg-surface-2 text-content' : 'text-muted'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
