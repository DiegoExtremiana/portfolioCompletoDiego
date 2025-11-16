import React from 'react';
import Timeline from './Timeline';
import Studies from './Studies';
import Certifications from './Certifications';
import Experience from './Experience';
import { FaEnvelope, FaLinkedin } from 'react-icons/fa';

const About = () => {
  return (
    <section id="sobre-mi" className="py-20 px-4 sm:px-6 section-bg-light">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 fade-in">
        <h2 className="section-title">
          Sobre mí
        </h2>
        
        <div className="flex flex-col items-center gap-8 sm:gap-12">
          <div className="w-full flex justify-center">
            <img 
              src="/media/images/graduacionDiego.jpg" 
              alt="Diploma de Diego" 
              className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 object-cover img-rounded"
              onError={(e) => {
                console.error('Error al cargar la imagen:', e.target.src);
                e.target.style.display = 'none';
                // Intentar cargar la imagen desde la carpeta pública como fallback
                e.target.src = '/media/images/graduacionDiego.jpg';
              }}
              onLoad={(e) => {
                console.log('Imagen cargada correctamente:', e.target.src);
                e.target.style.display = 'block';
              }}
            />
          </div>
          
          <div className="w-full max-w-3xl">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white mb-4 text-center">
              Diego Extremiana - Desarrollador Web
            </h3>
            
            <div className="space-y-4 mb-6 px-4">
              <p className="text-gray-600 dark:text-gray-300 text-center sm:text-left">
                Siempre he sido una persona curiosa y muy de "trastear". Ese impulso me llevó al desarrollo web, donde disfruto transformando ideas en algo tangible que funciona y ayuda a la gente. Me gusta entender el por qué de cada cosa, cuidar los detalles y crear experiencias que sean agradables tanto por dentro (el código) como por fuera (la interfaz).
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-center sm:text-left">
                Trabajo con tecnologías como React, JavaScript, PHP y bases de datos, y me siento cómodo tanto creando interfaces dinámicas como montando la lógica que hay detrás. También soy streamer, algo que complementa mi faceta técnica porque me mantiene conectado con la gente, con el ritmo de la comunicación y con el diseño visual.
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-center sm:text-left">
                Soy alguien constante, responsable y con ganas de seguir mejorando. Me motiva aprender, colaborar y construir proyectos que tengan un propósito claro.
              </p>
            </div>
            
            
            <div className="px-4">
              <h4 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-4 text-center sm:text-left">Habilidades</h4>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                {['HTML', 'CSS', 'JavaScript', 'React', 'PHP', 'SQL', 'Tailwind CSS', 'Git', 'GitHub'].map((skill) => (
                  <span 
                    key={skill}
                    className="skill-tag text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mt-8 px-4">
              <h4 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-4 text-center sm:text-left">Conecta conmigo</h4>
              <div className="flex flex-col items-center sm:items-start space-y-4">
                <a 
                  href="mailto:dextremiana1998@gmail.com" 
                  className="inline-flex items-center link"
                >
                  <FaEnvelope className="text-xl sm:text-2xl mr-2" /> dextremiana1998@gmail.com
                </a>
                <a 
                  href="https://www.linkedin.com/in/diego-e-b08910198/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center link"
                >
                  <FaLinkedin className="text-xl sm:text-2xl mr-2" /> linkedin
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-20">
        <Timeline />
        <Studies />
        <Certifications />
      </div>
    </section>
  );
};

export default About;
