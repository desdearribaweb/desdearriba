import { NextResponse } from 'next/server';
import { isBlobConfigured } from '@/app/lib/blob';
import { recordVisit } from '@/app/lib/stats';

/** Buscadores y previsualizadores: no son visitas de personas. */
const BOT = /bot|crawl|spider|slurp|facebookexternalhit|whatsapp|telegram|preview|monitor|curl|wget|headless|lighthouse|pagespeed|vercel-screenshot/i;

export async function POST(request: Request) {
  if (!isBlobConfigured()) return new NextResponse(null, { status: 204 });

  if (BOT.test(request.headers.get('user-agent') ?? '')) {
    return new NextResponse(null, { status: 204 });
  }

  try {
    await recordVisit();
  } catch {
    // Contar visitas nunca debe romperle la página a nadie.
  }

  return new NextResponse(null, { status: 204 });
}
