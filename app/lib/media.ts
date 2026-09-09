/** Constantes compartidas por el panel y la ruta de subida. */

// Sin video/quicktime a propósito: Chrome y Android no reproducen .mov.
export const ALLOWED_CONTENT_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
  'video/mp4',
  'video/webm',
];

/**
 * Tope pensado para web, no para el material crudo del drone. Un clip de 4K
 * vertical exportado para web queda en 20-40 MB; el crudo puede pesar 700 MB,
 * que no entra en el storage del plan y tardaría minutos en un celular.
 */
export const MAX_UPLOAD_MB = 100;
export const MAX_UPLOAD_BYTES = MAX_UPLOAD_MB * 1024 * 1024;

export const RECOMMENDED_MB = 40;

/**
 * A partir de acá conviene subir en partes paralelas: es bastante más rápido
 * que un único PUT y reintenta solo el pedazo que falló, no todo el archivo.
 */
export const MULTIPART_FROM_BYTES = 8 * 1024 * 1024;

/** Safari reproduce .mov, pero Chrome y Android no: hay que convertirlo antes. */
export const isQuickTime = (file: File) =>
  file.type === 'video/quicktime' || /\.mov$/i.test(file.name);

export const megabytes = (bytes: number) => Math.round(bytes / 1024 / 1024);
