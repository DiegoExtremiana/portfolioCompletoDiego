import React from 'react';
import Timeline from './Timeline';
import Studies from './Studies';
import Certifications from './Certifications';

const About = () => {
  return (
    <section id="sobre-mi" className="py-20 px-6 bg-gray-100 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
          Sobre mí
        </h2>
        
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="md:w-1/3 flex justify-center">
            <img 
              src="/media/images/diploma.jpg" 
              alt="Diploma de Diego" 
              className="w-64 h-64 object-cover rounded-xl border-2 border-gray-200"
            />
          </div>
          
          <div className="md:w-2/3">
            <h3 className="text-2xl font-semibold text-gray-80 dark:text-white mb-4">
              Diego Extremiana - Desarrollador Web
            </h3>
            
            <div className="space-y-4 mb-6">
              <p className="text-gray-60 dark:text-gray-300">
                Siempre he sido una persona curiosa y muy de "trastear". Ese impulso me llevó al desarrollo web, donde disfruto transformando ideas en algo tangible que funciona y ayuda a la gente. Me gusta entender el por qué de cada cosa, cuidar los detalles y crear experiencias que sean agradables tanto por dentro (el código) como por fuera (la interfaz).
              </p>
              <p className="text-gray-60 dark:text-gray-300">
                Trabajo con tecnologías como React, JavaScript, PHP y bases de datos, y me siento cómodo tanto creando interfaces dinámicas como montando la lógica que hay detrás. También soy streamer, algo que complementa mi faceta técnica porque me mantiene conectado con la gente, con el ritmo de la comunicación y con el diseño visual.
              </p>
              <p className="text-gray-60 dark:text-gray-300">
                Soy alguien constante, responsable y con ganas de seguir mejorando. Me motiva aprender, colaborar y construir proyectos que tengan un propósito claro.
              </p>
            </div>
            
            <div className="mb-8">
              <Timeline />
            </div>
            
            <div className="mb-8">
              <Studies />
            </div>
            
            <div className="mb-8">
              <Certifications />
            </div>
            
            <div>
              <h4 className="text-xl font-semibold text-gray-80 dark:text-white mb-4">Habilidades</h4>
              <div className="flex flex-wrap gap-2">
                {['HTML', 'CSS', 'JavaScript', 'React', 'PHP', 'SQL', 'Tailwind CSS', 'Git', 'GitHub'].map((skill) => (
                  <span 
                    key={skill}
                    className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-80 dark:text-blue-200 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Conecta conmigo</h4>
              <a 
                href="https://www.linkedin.com/in/diego-e-b08910198/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
              >
                <i className="fab fa-linkedin text-2xl mr-2"></i> LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
