import React from 'react';

const Hero = () => {
  return (
    <section id="inicio" className="min-h-screen flex items-center justify-center px-6 py-20 section-bg-dark">
      <div className="container mx-auto text-center fade-in">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-white mb-4">
              Hola, soy <span className="text-blue-600 dark:text-blue-400">Diego Extremiana</span>
            </h1>
            <h2 className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-6">
              Desarrollador Web Full Stack
            </h2>
            <div className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto space-y-4">
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
            <div className="flex justify-center space-x-4">
              <a 
                href="#contacto" 
                className="btn-primary"
              >
                Contáctame
              </a>
              <a 
                href="#proyectos" 
                className="btn-secondary"
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
