import React, { useState } from 'react';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';

const Header = ({ darkMode, setDarkMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false); // Cerrar menú en móvil después de hacer clic
    }
  };

  return (
    <header className="fixed w-full z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm py-4 px-6 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo o nombre */}
        <div className="text-xl font-bold text-gray-800 dark:text-white">
          Diego Extremiana
        </div>

        {/* Menú para desktop */}
        <nav className="hidden md:flex space-x-8">
          {['inicio', 'sobre-mi', 'proyectos', 'experiencia', 'contacto'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors capitalize"
            >
              {item.replace('-', ' ')}
            </button>
          ))}
        </nav>

        {/* Botón de modo oscuro/claro */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-yellow-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            aria-label={darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
          >
            {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>

          {/* Menú hamburguesa para móvil */}
          <button
            className="md:hidden p-2 text-gray-700 dark:text-white"
            onClick={toggleMenu}
            aria-label="Abrir menú"
          >
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 py-4 px-6 shadow-lg">
          <div className="flex flex-col space-y-4">
            {['inicio', 'sobre-mi', 'proyectos', 'experiencia', 'contacto'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-left py-2 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors capitalize"
              >
                {item.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
