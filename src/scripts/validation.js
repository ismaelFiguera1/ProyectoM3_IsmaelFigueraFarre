export function validacionInput(valorInput) {
  const regexMensaje = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ,.?!¿¡]+$/;
  const errorRegex =
    "El mensaje solo puede tener mayusculas, minusculas, espacios, comas, puntos, interrogantes y exclamaciones.";

  if (typeof valorInput !== "string") {
    return {
      isValid: false,
      error: errorRegex,
    };
  }

  const mensaje = valorInput.trim();

  if (mensaje.length < 1) {
    return {
      isValid: false,
      error: `El mensaje debe tener minimo 1 caracter de longitud.`,
    };
  } else if (mensaje.length > 500) {
    return {
      isValid: false,
      error: `El mensaje debe tener maximo 500 caracteres de longitud.`,
    };
  }

  if (!regexMensaje.test(mensaje)) {
    return {
      isValid: false,
      error: errorRegex,
    };
  }

  return {
    isValid: true,
    error: null,
  };
}

export function validateMessagesArray(value) {
  if (!Array.isArray(value)) {
    return {
      isValid: false,
      error: "Los mensajes deben llegar en array a la funcion vercel",
    };
  }

  return {
    isValid: true,
    error: null,
  };
}
