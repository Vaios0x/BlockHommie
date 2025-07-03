declare namespace JSX {
  interface IntrinsicElements {
    // Agrega aquí elementos HTML estándar que uses, si es necesario.
    // Por ejemplo: a, br, button, div, h1, h2, h3, img, input, label, li, ol, p, span, svg, textarea, ul, etc.
    // No es necesario listarlos todos si tu configuración de TS/React es estándar.
    // Pero si sigues teniendo errores específicos, puedes añadirlos explícitamente.
    [elemName: string]: any; // Permite cualquier elemento como fallback
  }
} 