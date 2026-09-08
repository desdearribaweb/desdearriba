import { NextResponse } from 'next/server';
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { isAuthenticated } from '@/app/lib/auth';
import { isBlobConfigured } from '@/app/lib/projects';

const ALLOWED = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
  'video/mp4',
  'video/webm',
  'video/quicktime',
];

/**
 * El navegador sube el archivo directo a Blob usando el token que emite esta
 * ruta, así los videos no chocan contra el límite de body de las funciones.
 */
export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });
  }

  if (!isBlobConfigured()) {
    return NextResponse.json(
      { error: 'Falta conectar Vercel Blob al proyecto.' },
      { status: 503 }
    );
  }

  const body = (await request.json()) as HandleUploadBody;

  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: ALLOWED,
        addRandomSuffix: true,
        maximumSizeInBytes: 200 * 1024 * 1024,
      }),
      onUploadCompleted: async () => {},
    });

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'No se pudo subir el archivo.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
