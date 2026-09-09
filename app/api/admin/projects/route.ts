import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { isAuthenticated } from '@/app/lib/auth';
import { isBlobConfigured } from '@/app/lib/blob';
import {
  PROJECT_CATEGORIES,
  type Project,
  type ProjectCategory,
  getSiteDataForAdmin,
  saveSiteData,
} from '@/app/lib/projects';

const MAX_PROJECTS = 3;

const unauthorized = () => NextResponse.json({ error: 'No autorizado.' }, { status: 401 });

export async function GET() {
  if (!(await isAuthenticated())) return unauthorized();

  if (!isBlobConfigured()) {
    return NextResponse.json({ projects: [], blobConfigured: false });
  }

  return NextResponse.json({ ...(await getSiteDataForAdmin()), blobConfigured: true });
}

export async function PUT(request: Request) {
  if (!(await isAuthenticated())) return unauthorized();

  if (!isBlobConfigured()) {
    return NextResponse.json(
      { error: 'Falta conectar Vercel Blob al proyecto.' },
      { status: 503 }
    );
  }

  let incoming: unknown;
  let heroVideo: string | undefined;
  try {
    const body = await request.json();
    incoming = body?.projects;
    heroVideo = typeof body?.heroVideo === 'string' && body.heroVideo ? body.heroVideo : undefined;
  } catch {
    return NextResponse.json({ error: 'Pedido inválido.' }, { status: 400 });
  }

  if (!Array.isArray(incoming)) {
    return NextResponse.json({ error: 'Formato inválido.' }, { status: 400 });
  }

  if (incoming.length > MAX_PROJECTS) {
    return NextResponse.json(
      { error: `Se muestran hasta ${MAX_PROJECTS} trabajos.` },
      { status: 400 }
    );
  }

  const categories = PROJECT_CATEGORIES.map((c) => c.value) as readonly string[];
  const projects: Project[] = [];

  for (const item of incoming) {
    const p = item as Record<string, unknown>;

    if (typeof p?.image !== 'string' || !p.image) {
      return NextResponse.json(
        { error: 'Cada trabajo necesita una imagen de portada.' },
        { status: 400 }
      );
    }

    if (typeof p?.title !== 'string' || !p.title.trim()) {
      return NextResponse.json({ error: 'Cada trabajo necesita un título.' }, { status: 400 });
    }

    projects.push({
      id: typeof p.id === 'string' && p.id ? p.id : crypto.randomUUID(),
      title: p.title.trim().slice(0, 120),
      category: (categories.includes(p.category as string)
        ? p.category
        : 'eventos') as ProjectCategory,
      image: p.image,
      video: typeof p.video === 'string' && p.video ? p.video : undefined,
      description:
        typeof p.description === 'string' ? p.description.trim().slice(0, 400) : '',
    });
  }

  await saveSiteData({ heroVideo, projects });
  revalidatePath('/');

  return NextResponse.json({ ok: true, heroVideo, projects });
}
