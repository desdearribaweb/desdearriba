import { NextResponse } from 'next/server';
import { issueSignedToken } from '@vercel/blob';
import {
  handleUpload,
  handleUploadPresigned,
  type HandleUploadBody,
  type HandleUploadPresignedBody,
} from '@vercel/blob/client';
import { isAuthenticated } from '@/app/lib/auth';
import { blobAuth, blobMode } from '@/app/lib/blob';
import { ALLOWED_CONTENT_TYPES, MAX_UPLOAD_BYTES } from '@/app/lib/media';

const CACHE_A_YEAR = 365 * 24 * 60 * 60;

/**
 * El navegador sube el archivo directo a Blob, así los videos no chocan contra
 * el límite de body de las funciones. Según cómo esté conectado el store se usa
 * el flujo con read-write token o el presigned, que se autentica por OIDC.
 */
export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });
  }

  const mode = blobMode();
  if (!mode) {
    return NextResponse.json(
      { error: 'Falta conectar Vercel Blob al proyecto.' },
      { status: 503 }
    );
  }

  const body = await request.json();

  try {
    if (mode === 'token') {
      const result = await handleUpload({
        body: body as HandleUploadBody,
        request,
        ...blobAuth(),
        onBeforeGenerateToken: async () => ({
          allowedContentTypes: ALLOWED_CONTENT_TYPES,
          maximumSizeInBytes: MAX_UPLOAD_BYTES,
          addRandomSuffix: false,
          cacheControlMaxAge: CACHE_A_YEAR,
        }),
        onUploadCompleted: async () => {},
      });

      return NextResponse.json(result);
    }

    const result = await handleUploadPresigned({
      body: body as HandleUploadPresignedBody,
      request,
      getSignedToken: async (pathname) => ({
        token: await issueSignedToken({
          pathname,
          operations: ['put'],
          allowedContentTypes: ALLOWED_CONTENT_TYPES,
          maximumSizeInBytes: MAX_UPLOAD_BYTES,
          ...blobAuth(),
        }),
        urlOptions: {
          allowedContentTypes: ALLOWED_CONTENT_TYPES,
          maximumSizeInBytes: MAX_UPLOAD_BYTES,
          addRandomSuffix: false,
          cacheControlMaxAge: CACHE_A_YEAR,
        },
      }),
    });

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'No se pudo subir el archivo.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
