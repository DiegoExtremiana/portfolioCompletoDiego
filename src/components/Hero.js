import React from 'react';

const Hero = () => {
  return (
    <section id="inicio" className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-white mb-4">
              Hola, soy <span className="text-blue-600 dark:text-blue-400">Diego Extremiana</span>
            </h1>
            <h2 className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-6">
              Desarrollador Web Full Stack
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Vivo en Nájera, La Rioja. Me especializo en crear aplicaciones web responsivas y modernas 
              utilizando tecnologías como React, JavaScript, HTML, CSS y PHP.
            </p>
            <div className="flex justify-center space-x-4">
              <a 
                href="#contacto" 
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
              >
                Contáctame
              </a>
              <a 
                href="#proyectos" 
                className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Ver Proyectos
              </a>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg relative">
              <img 
                src="/media/images/fotoPerfilDiego.png" 
                alt="Diego Extremiana - Foto de Perfil" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
