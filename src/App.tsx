import { Background } from './components/Background';
import { ScrollProgress } from './components/ScrollProgress';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Timeline } from './components/Timeline';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { useTheme } from './hooks/useTheme';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

export function App() {
  const { theme, toggle } = useTheme();

  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Saltar al contenido
      </a>

      <Background theme={theme} />
      <ScrollProgress />
      <Header theme={theme} onToggleTheme={toggle} />

      <main id="contenido">
        <Hero />
        <About />
        <Timeline />
        <Projects />
        <Contact />
      </main>

      <Footer />
      <Analytics />
      <SpeedInsights />
    </>
  );
}
