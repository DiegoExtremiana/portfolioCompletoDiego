import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import { SOCIAL_LINKS } from '../constants/navigation';

const Footer = () => {
  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white py-12 px-4 sm:px-6 transition-colors duration-300">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold text-white">Diego Extremiana</h3>
            <p className="text-gray-40 mt-2">Desarrollador Web Full Stack</p>
          </div>
          
          <div className="flex space-x-6">
            <a 
              href={`mailto:${SOCIAL_LINKS.email}`} 
              className="text-white hover:text-gray-300 transition-colors duration-300"
            >
              <FaEnvelope size={24} />
            </a>
            <a 
              href={SOCIAL_LINKS.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-blue-500 transition-colors duration-300"
            >
              <FaLinkedin size={24} />
            </a>
            <a 
              href="https://github.com/DiegoExtremiana"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition-colors duration-300"
            >
              <FaGithub size={24} />
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 dark:text-gray-500">
          <p>© {new Date().getFullYear()} Diego Extremiana. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
