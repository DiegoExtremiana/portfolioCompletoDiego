import React from 'react';
import { FaGithub, FaEnvelope, FaMapMarkerAlt, FaExternalLinkAlt, FaLinkedin } from 'react-icons/fa';

const Contact = () => {
  return (
    <section id="contacto" className="py-20 px-4 sm:px-6 section-bg-light">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 fade-in">
        <h2 className="section-title">
          Contacto
        </h2>
        
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/2">
            <h3 className="text-2xl font-semibold text-gray-80 dark:text-white mb-6">Información de Contacto</h3>
            
            <div className="space-y-6">
              <div className="flex items-center">
                <FaEnvelope className="text-2xl text-blue-60 dark:text-blue-400 mr-4" />
                <div>
                  <p className="text-gray-600 dark:text-gray-300">Correo electrónico</p>
                  <a 
                    href="mailto:dextremiana1998@gmail.com" 
                    className="text-lg font-medium link flex items-center"
                  >
                    dextremiana1998@gmail.com
                    <FaExternalLinkAlt className="ml-2 text-sm" />
                  </a>
                </div>
              </div>
              
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-2xl text-blue-600 dark:text-blue-400 mr-4" />
                <div>
                  <p className="text-gray-600 dark:text-gray-300">Ubicación</p>
                  <p className="text-lg font-medium text-gray-800 dark:text-white">Nájera, La Rioja</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <FaGithub className="text-2xl text-blue-600 dark:text-blue-400 mr-4" />
                <div>
                  <p className="text-gray-600 dark:text-gray-300">GitHub</p>
                  <a 
                    href="https://github.com/TRdeXtremiana" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-lg font-medium link flex items-center"
                  >
                    TRdeXtremiana
                    <FaExternalLinkAlt className="ml-2 text-sm" />
                  </a>
                </div>
              </div>
              
              <div className="flex items-center">
                <FaLinkedin className="text-2xl text-blue-600 dark:text-blue-400 mr-4" />
                <div>
                  <p className="text-gray-600 dark:text-gray-300">LinkedIn</p>
                  <a 
                    href="https://www.linkedin.com/in/diego-e-b08910198/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-lg font-medium link flex items-center"
                  >
                    linkedin
                    <FaExternalLinkAlt className="ml-2 text-sm" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Envíame un Mensaje</h3>
            
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-70 dark:text-gray-300 mb-2">Nombre</label>
                <input
                  type="text"
                  id="name"
                  className="form-input"
                  placeholder="Tu nombre"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-gray-70 dark:text-gray-300 mb-2">Correo electrónico</label>
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  placeholder="Tu correo electrónico"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 mb-2">Mensaje</label>
                <textarea
                  id="message"
                  rows="5"
                  className="form-input"
                  placeholder="Tu mensaje"
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="btn-primary w-full"
              >
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
