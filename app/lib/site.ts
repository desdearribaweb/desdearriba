import { get, put } from '@vercel/blob';
import { blobAuth, isBlobConfigured } from './blob';

export interface SiteData {
  /** Video de fondo del hero. Vacío = fondo degradado. */
  heroVideo?: string;
}

// Se mantiene el nombre anterior para no perder lo ya publicado.
const SITE_KEY = 'data/projects.json';
/** Lo lee sólo el servidor, así que va privado: funciona con cualquier store. */
const ACCESS = 'private' as const;

async function readSite(): Promise<SiteData> {
  const result = await get(SITE_KEY, { access: ACCESS, useCache: false, ...blobAuth() });
  if (!result) return {};

  const texto = await new Response(result.stream).text();
  try {
    return sanitize(JSON.parse(texto));
  } catch {
    return {};
  }
}

function sanitize(raw: unknown): SiteData {
  if (!raw || typeof raw !== 'object') return {};

  const data = raw as Record<string, unknown>;
  return {
    heroVideo: typeof data.heroVideo === 'string' && data.heroVideo ? data.heroVideo : undefined,
  };
}

/**
 * Contenido publicado. Nunca lanza: si Blob no está configurado o falla, la
 * home igual renderiza (el hero cae en el video local o el degradado).
 */
export async function getSiteData(): Promise<SiteData> {
  if (!isBlobConfigured()) return {};

  try {
    return await readSite();
  } catch {
    return {};
  }
}

/** Igual que getSiteData pero sin cache: para el panel. */
export async function getSiteDataForAdmin(): Promise<SiteData> {
  return readSite();
}

export async function saveSiteData(site: SiteData): Promise<void> {
  await put(SITE_KEY, JSON.stringify(site, null, 2), {
    access: ACCESS,
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 60,
    ...blobAuth(),
  });
}
