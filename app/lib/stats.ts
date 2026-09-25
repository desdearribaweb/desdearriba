import { BlobPreconditionFailedError, get, put } from '@vercel/blob';
import { blobAuth, isBlobConfigured } from './blob';

const STATS_KEY = 'data/stats.json';
/** Lo lee sólo el servidor, así que va privado: funciona con cualquier store. */
const ACCESS = 'private' as const;
/** Se guardan sólo los últimos meses: el panel nunca mira más atrás. */
const KEEP_DAYS = 120;

/** Visitas por día, con la fecha como 'YYYY-MM-DD'. */
export type Visits = Record<string, number>;

export const dayKey = (date = new Date()) => date.toISOString().slice(0, 10);

function sanitize(raw: unknown): Visits {
  if (!raw || typeof raw !== 'object') return {};

  const out: Visits = {};
  for (const [day, count] of Object.entries(raw as Record<string, unknown>)) {
    if (/^\d{4}-\d{2}-\d{2}$/.test(day) && typeof count === 'number' && count >= 0) {
      out[day] = Math.floor(count);
    }
  }
  return out;
}

function trim(visits: Visits): Visits {
  const limit = dayKey(new Date(Date.now() - KEEP_DAYS * 86_400_000));
  return Object.fromEntries(Object.entries(visits).filter(([day]) => day >= limit));
}

/** El etag acompaña al contenido: con él se escribe sin pisar a otra visita. */
async function read(): Promise<{ visits: Visits; etag?: string }> {
  const result = await get(STATS_KEY, { access: ACCESS, useCache: false, ...blobAuth() });
  if (!result) return { visits: {} };

  const texto = await new Response(result.stream).text();
  try {
    return { visits: sanitize(JSON.parse(texto)), etag: result.blob.etag };
  } catch {
    return { visits: {}, etag: result.blob.etag };
  }
}

export async function getVisits(): Promise<Visits> {
  if (!isBlobConfigured()) return {};

  try {
    return (await read()).visits;
  } catch {
    return {};
  }
}

/**
 * Suma una visita al día de hoy. Si entre la lectura y la escritura entró otra
 * visita, el ifMatch rechaza el guardado y se reintenta sobre el valor nuevo,
 * en lugar de perder la cuenta ajena.
 */
export async function recordVisit(): Promise<void> {
  // El último intento va sin candado: perder una cuenta por una carrera es
  // mucho mejor que no contar nada si el ifMatch nunca llega a coincidir.
  for (let intento = 0; intento < 4; intento++) {
    const { visits, etag } = await read();
    const conCandado = Boolean(etag) && intento < 3;

    const day = dayKey();
    visits[day] = (visits[day] ?? 0) + 1;

    try {
      await put(STATS_KEY, JSON.stringify(trim(visits)), {
        access: ACCESS,
        contentType: 'application/json',
        addRandomSuffix: false,
        allowOverwrite: true,
        cacheControlMaxAge: 0,
        ...(conCandado ? { ifMatch: etag } : {}),
        ...blobAuth(),
      });
      return;
    } catch (error) {
      if (!(error instanceof BlobPreconditionFailedError)) throw error;
    }
  }

  throw new Error('No se pudo guardar la visita después de 4 intentos.');
}

export interface TrafficSummary {
  today: number;
  last7: number;
  last30: number;
  total: number;
  /** Serie continua para el gráfico: incluye los días sin visitas. */
  series: { day: string; count: number }[];
}

export function summarize(visits: Visits, days = 14): TrafficSummary {
  const sum = (from: number) => {
    const limit = dayKey(new Date(Date.now() - from * 86_400_000));
    return Object.entries(visits).reduce((acc, [d, n]) => (d >= limit ? acc + n : acc), 0);
  };

  const series = Array.from({ length: days }, (_, i) => {
    const day = dayKey(new Date(Date.now() - (days - 1 - i) * 86_400_000));
    return { day, count: visits[day] ?? 0 };
  });

  return {
    today: visits[dayKey()] ?? 0,
    last7: sum(6),
    last30: sum(29),
    total: Object.values(visits).reduce((a, b) => a + b, 0),
    series,
  };
}
