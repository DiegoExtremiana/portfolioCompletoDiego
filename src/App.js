import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    // Verificar preferencia del sistema o estado guardado
    const isDark = localStorage.getItem('darkMode') === 'true' || 
                  (!('darkMode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
  }, []);

  useEffect(() => {
    // Aplicar clase al body según el modo
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Guardar preferencia en localStorage
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  return (
    <div className="min-h-screen transition-colors duration-300 bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="fade-in">
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
 );
}

export default App;
