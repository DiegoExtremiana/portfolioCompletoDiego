import React from 'react';

const Experience = () => {
  const experiences = [
    {
      position: "Programador web",
      company: "Wunder control solutions",
      period: "9/2024 - 1/2025",
      description: "Creé una aplicación responsiva de control de presencia con perfil, mensajería, comunicación con la base de datos mediante API, registros y edición usando HTML, CSS, JavaScript, REACT, PHP y SQL.",
      technologies: ["HTML", "CSS", "JavaScript", "REACT", "PHP", "SQL", "API"]
    },
    {
      position: "Atención al cliente",
      company: "Arsys",
      period: "3/2021 - 6/2021",
      description: "Responder a las preguntas y ayudar a los usuarios con sus problemas en páginas web.",
      technologies: ["Atención al cliente", "Soporte técnico", "Resolución de problemas"]
    }
  ];

   return (
    <section id="experiencia" className="py-20 px-4 sm:px-6 section-bg-light">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 fade-in">
        <h2 className="section-title">
          Experiencia
        </h2>
        
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div 
              key={index} 
              className="card"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">{exp.position}</h3>
                <span className="text-lg text-blue-600 dark:text-blue-400 mt-2 md:mt-0">
                  {exp.company === "Arsys" ? (
                    <a href="https://www.arsys.es/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {exp.company}
                    </a>
                  ) : exp.company === "Wunder control solutions" ? (
                    <a href="https://wundersolutions.es/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {exp.company}
                    </a>
                  ) : (
                    exp.company
                  )}
                </span>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4">{exp.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {exp.technologies.map((tech, techIndex) => (
                  <span 
                    key={techIndex}
                    className="tech-tag"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {exp.period}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
