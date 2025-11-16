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
    <section id="experiencia" className="py-20 px-6 bg-gray-100 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
          Experiencia
        </h2>
        
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">{exp.position}</h3>
                <span className="text-lg text-blue-600 dark:text-blue-400 mt-2 md:mt-0">{exp.company}</span>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4">{exp.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {exp.technologies.map((tech, techIndex) => (
                  <span 
                    key={techIndex}
                    className="px-3 py-1 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-full text-sm"
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
