import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold">Diego Extremiana</h3>
            <p className="text-gray-400 mt-2">Desarrollador Web Full Stack</p>
          </div>
          
          <div className="flex space-x-6">
            <a 
              href="mailto:dextremiana1998@gmail.com" 
              className="text-gray-400 hover:text-white transition-colors"
            >
              Correo
            </a>
            <a 
              href="https://github.com/TRdeXtremiana" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Diego Extremiana. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
