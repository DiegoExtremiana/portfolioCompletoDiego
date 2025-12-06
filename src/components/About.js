import React from 'react';
import Timeline from './Timeline';
import Studies from './Studies';
import Certifications from './Certifications';
import Experience from './Experience';
import LanguageProgressBar from './LanguageProgressBar';
import { FaEnvelope, FaLinkedin } from 'react-icons/fa';
import { SKILLS } from '../constants/skills';
import { SOCIAL_LINKS } from '../constants/navigation';

const About = () => {
  const languagePercentages = [
    { language: 'JavaScript', percentage: 70.6 },
    { language: 'PHP', percentage: 21.3 },
    { language: 'CSS', percentage: 4.0 },
    { language: 'HTML', percentage: 4.1 }
  ];

  return (
    <section id="sobre-mi" className="py-20 px-4 sm:px-6 section-bg-light">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 fade-in">
        <h2 className="section-title">
          Sobre mí
        </h2>
        
        <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 items-start">
          <div className="flex flex-col lg:w-1/3">
            <img 
              src="/media/images/graduacionDiego.jpg" 
              alt="Diploma de Diego" 
              className="w-full max-w-xs h-auto object-cover img-rounded mx-0"
            />
            <h3 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)] mt-4 text-left">
              Diego Extremiana - Desarrollador Web
            </h3>
          </div>
          
          <div className="w-full lg:w-2/3 max-w-3xl">
            <div className="space-y-4 mb-6 text-left">
              <p className="text-[var(--text-secondary)] text-left">
                Siempre he sido una persona curiosa y muy de "trastear". Ese impulso me llevó al desarrollo web, donde disfruto transformando ideas en algo tangible que funciona y ayuda a la gente. Me gusta entender el por qué de cada cosa, cuidar los detalles y crear experiencias que sean agradables tanto por dentro (el código) como por fuera (la interfaz).
              </p>
              <p className="text-[var(--text-secondary)] text-left">
                Trabajo con tecnologías como React, Angular, JavaScript, PHP y bases de datos, y me siento cómodo tanto creando interfaces dinámicas como montando la lógica que hay detrás. También soy streamer, algo que complementa mi faceta técnica porque me mantiene conectado con la gente, con el ritmo de la comunicación y con el diseño visual.
              </p>
              <p className="text-[var(--text-secondary)] text-left">
                Soy alguien constante, responsable y con ganas de seguir mejorando. Me motiva aprender, colaborar y construir proyectos que tengan un propósito claro.
              </p>
            </div>
            
            <div className="px-4 mt-8">
              <h4 className="text-lg sm:text-xl font-semibold text-[var(--text-primary)] mb-4 text-center sm:text-left">Habilidades</h4>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                {SKILLS.map((skill) => (
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
              <h4 className="text-lg sm:text-xl font-semibold text-[var(--text-primary)] mb-4 text-center sm:text-left">Conecta conmigo</h4>
              <div className="flex flex-col items-center sm:items-start space-y-4">
                <a 
                  href={`mailto:${SOCIAL_LINKS.email}`} 
                  className="inline-flex items-center link"
                >
                  <FaEnvelope className="text-xl sm:text-2xl mr-2" /> {SOCIAL_LINKS.email}
                </a>
                <a 
                  href={SOCIAL_LINKS.linkedin} 
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
      
      <div className="mt-0">
        <Timeline />
        <Studies />
        <Certifications />
        <Experience />
      </div>
    </section>
  );
};

export default About;
