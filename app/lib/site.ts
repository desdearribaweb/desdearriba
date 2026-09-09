import { list, put } from '@vercel/blob';
import { blobAuth, isBlobConfigured } from './blob';

export interface SiteData {
  /** Video de fondo del hero. Vacío = fondo degradado. */
  heroVideo?: string;
}

// Se mantiene el nombre anterior para no perder lo ya publicado.
const SITE_KEY = 'data/projects.json';

async function findSiteBlobUrl(): Promise<string | null> {
  const { blobs } = await list({ prefix: SITE_KEY, limit: 1, ...blobAuth() });
  return blobs[0]?.url ?? null;
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
    const url = await findSiteBlobUrl();
    if (!url) return {};

    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return {};

    return sanitize(await res.json());
  } catch {
    return {};
  }
}

/** Igual que getSiteData pero sin cache: para el panel. */
export async function getSiteDataForAdmin(): Promise<SiteData> {
  const url = await findSiteBlobUrl();
  if (!url) return {};

  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) return {};

  return sanitize(await res.json());
}

export async function saveSiteData(site: SiteData): Promise<void> {
  await put(SITE_KEY, JSON.stringify(site, null, 2), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 60,
    ...blobAuth(),
  });
}
