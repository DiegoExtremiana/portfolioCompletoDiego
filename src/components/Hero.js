import React from 'react';

const Hero = () => {
  return (
    <section id="inicio" className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-20 section-bg-dark">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 text-center fade-in">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-12">
          <div className="md:w-1/2 text-center md:text-left">
            <div className="mb-8 md:mb-10 lg:mb-10">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-white mb-4 px-4 md:px-0 lg:px-0">
                Hola, soy <span className="text-blue-600 dark:text-blue-40">Diego Extremiana</span>
              </h1>
              <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-6 px-4 md:px-0 lg:px-0">
                Desarrollador Web Full Stack
              </h2>
            </div>
            <div className="max-w-3xl mb-8 md:mb-12 lg:mb-12 px-4 md:px-0 lg:px-0">
              <div className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto md:mx-0 lg:mx-0 space-y-4 md:text-left lg:text-left">
                <p>
                  Soy desarrollador web especializado en React y en la creación de aplicaciones que realmente sirven para algo: herramientas que ayudan a las personas a organizarse, disfrutar y alcanzar sus objetivos. Me gusta combinar una buena experiencia de usuario con un código limpio y funcional, siempre buscando que cada proyecto tenga un impacto real.
                </p>
                <p>
                  Tengo experiencia construyendo aplicaciones completas con HTML, CSS, JavaScript, React y PHP, integrando bases de datos y APIs, y trabajando con metodologías ágiles y control de versiones. Además, soy creador de contenido, lo que me ha enseñado a comunicar, analizar feedback rápido y diseñar interfaces atractivas para el público.
                </p>
                <p>
                  Si buscas a alguien resolutivo, creativo y con ganas de seguir creciendo mientras construye proyectos sólidos, estás en el sitio adecuado.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start lg:justify-start items-center space-y-4 sm:space-y-0 sm:space-x-4 px-4 md:px-0 lg:px-0">
              <a 
                href="#contacto" 
                className="btn-primary w-full sm:w-auto px-6 py-3 text-center"
              >
                Contáctame
              </a>
              <a 
                href="#proyectos" 
                className="btn-secondary w-full sm:w-auto px-6 py-3 text-center"
              >
                Ver Proyectos
              </a>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center items-center px-4 md:px-0 lg:px-0">
            <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg relative">
              <img 
                src="/media/images/fotoPerfilDiego.png" 
                alt="Diego Extremiana - Foto de Perfil" 
                className="img-profile"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
