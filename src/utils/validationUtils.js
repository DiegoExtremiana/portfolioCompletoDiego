// Funciones de utilidad para validación de formularios

// Validación del nombre
export const validateName = (name) => {
  if (!name.trim()) {
    return 'El nombre es obligatorio';
  }
  return '';
};

// Validación del email
export const validateEmail = (email) => {
  if (!email.trim()) {
    return 'El correo electrónico es obligatorio';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return 'El formato del correo electrónico no es válido';
  }
 return '';
};

// Validación del asunto
export const validateSubject = (subject) => {
  if (!subject.trim()) {
    return 'El asunto es obligatorio';
  } else if (subject.trim().length < 3) {
    return 'El asunto debe tener al menos 3 caracteres';
  }
  return '';
};

// Validación del mensaje
export const validateMessage = (message) => {
 if (!message.trim()) {
    return 'El mensaje es obligatorio';
  } else if (message.trim().length < 10) {
    return 'El mensaje debe tener al menos 10 caracteres';
  }
  return '';
};

// Validación completa del formulario de contacto
export const validateContactForm = (formData) => {
  const errors = {};

  const nameError = validateName(formData.name);
  if (nameError) errors.name = nameError;

 const emailError = validateEmail(formData.email);
  if (emailError) errors.email = emailError;

  const subjectError = validateSubject(formData.subject);
  if (subjectError) errors.subject = subjectError;

  const messageError = validateMessage(formData.message);
  if (messageError) errors.message = messageError;

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
