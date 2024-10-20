export function cleanHtml(contenido: string): string {
  // Expresión regular para buscar etiquetas h2, h3 y script con su contenido
  const regex = /<(h2|h3|script)[\s\S]*?<\/\1>/gi;

  // Reemplazar las coincidencias con una cadena vacía
  return contenido.replace(regex, '').replace(/^"|"$/g, '').trim();
}