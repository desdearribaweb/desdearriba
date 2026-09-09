import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { isAuthenticated } from '@/app/lib/auth';
import { isBlobConfigured } from '@/app/lib/blob';
import { getSiteDataForAdmin, saveSiteData } from '@/app/lib/site';

const unauthorized = () => NextResponse.json({ error: 'No autorizado.' }, { status: 401 });

export async function GET() {
  if (!(await isAuthenticated())) return unauthorized();

  if (!isBlobConfigured()) {
    return NextResponse.json({ blobConfigured: false });
  }

  return NextResponse.json({ ...(await getSiteDataForAdmin()), blobConfigured: true });
}

export async function PUT(request: Request) {
  if (!(await isAuthenticated())) return unauthorized();

  if (!isBlobConfigured()) {
    return NextResponse.json({ error: 'Falta conectar Vercel Blob al proyecto.' }, { status: 503 });
  }

  let heroVideo: string | undefined;
  try {
    const body = await request.json();
    heroVideo = typeof body?.heroVideo === 'string' && body.heroVideo ? body.heroVideo : undefined;
  } catch {
    return NextResponse.json({ error: 'Pedido inválido.' }, { status: 400 });
  }

  await saveSiteData({ heroVideo });
  revalidatePath('/');

  return NextResponse.json({ ok: true, heroVideo });
}
