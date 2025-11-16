import React from 'react';

const About = () => {
  return (
    <section id="sobre-mi" className="py-20 px-6 bg-gray-100 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
          Sobre mí
        </h2>
        
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/3 flex justify-center">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-64 h-64 flex items-center justify-center text-gray-500">
              Foto de Diego
            </div>
          </div>
          
          <div className="md:w-2/3">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Diego Extremiana - Desarrollador Web
            </h3>
            
            <p className="text-gray-60 dark:text-gray-300 mb-6">
              Vivo en Nájera, La Rioja, y soy un apasionado desarrollador web con experiencia en creación 
              de aplicaciones web responsivas y modernas. Me especializo en tecnologías como React, 
              JavaScript, HTML, CSS y PHP.
            </p>
            
            <div className="mb-8">
              <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Educación</h4>
              
              <div className="space-y-4">
              <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow">
                <h5 className="font-semibold text-gray-800 dark:text-white">Grado Superior en Desarrollo de Aplicaciones Web</h5>
                <p className="text-gray-600 dark:text-gray-300">FPD Rioja - Logroño (a distancia)</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">2022-2024</p>
              </div>
              
              <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow">
                <h5 className="font-semibold text-gray-800 dark:text-white">Grado Medio en Sistemas Microinformáticos y Redes</h5>
                <p className="text-gray-600 dark:text-gray-300">IES Comercio - Logroño</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">2019-2021</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Habilidades</h4>
              <div className="flex flex-wrap gap-2">
                {['HTML', 'CSS', 'JavaScript', 'React', 'PHP', 'SQL', 'Tailwind CSS', 'Git', 'GitHub'].map((skill) => (
                  <span 
                    key={skill}
                    className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
