/**
 * Vercel expone el store de dos formas según cómo se haya conectado: con un
 * read-write token, o con un store id que se autentica por OIDC. Además deja
 * elegir un prefijo, así que los nombres no son fijos (DESDEARRIBA_STORE_ID).
 * Acá se resuelve cuál hay disponible; el resto del código no se entera.
 */

export type BlobMode = 'token' | 'storeId';

function findEnv(suffix: string, exact: string): string | undefined {
  if (process.env[exact]) return process.env[exact];

  const key = Object.keys(process.env).find(
    (name) => name.endsWith(suffix) && process.env[name]
  );
  return key ? process.env[key] : undefined;
}

export const getBlobToken = () => findEnv('_READ_WRITE_TOKEN', 'BLOB_READ_WRITE_TOKEN');
export const getBlobStoreId = () => findEnv('_STORE_ID', 'BLOB_STORE_ID');

export function blobMode(): BlobMode | null {
  if (getBlobToken()) return 'token';
  if (getBlobStoreId()) return 'storeId';
  return null;
}

/** Credenciales para pasar a las funciones del SDK. */
export function blobAuth(): { token?: string; storeId?: string } {
  const token = getBlobToken();
  if (token) return { token };

  const storeId = getBlobStoreId();
  return storeId ? { storeId } : {};
}

export const isBlobConfigured = () => blobMode() !== null;

/** Nombres (nunca valores) de las variables del store, para diagnóstico. */
export const blobEnvNames = () =>
  Object.keys(process.env).filter((name) =>
    /_READ_WRITE_TOKEN$|_STORE_ID$|^BLOB_/.test(name)
  );
