'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { upload, uploadPresigned } from '@vercel/blob/client';
import type { BlobMode } from '@/app/lib/blob';
import {
  MAX_UPLOAD_BYTES,
  MAX_UPLOAD_MB,
  MULTIPART_FROM_BYTES,
  RECOMMENDED_MB,
  isQuickTime,
  megabytes,
} from '@/app/lib/media';

/**
 * El nombre se genera acá, no en el servidor: el token presignado se firma
 * contra un pathname exacto, así que tiene que coincidir con el final.
 */
async function uploadToBlob(
  file: File,
  mode: BlobMode,
  onProgress: (percentage: number) => void
): Promise<string> {
  const ext = (file.name.split('.').pop() ?? '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const pathname = `media/${crypto.randomUUID()}${ext ? `.${ext}` : ''}`;
  const send = mode === 'token' ? upload : uploadPresigned;

  const blob = await send(pathname, file, {
    access: 'public',
    handleUploadUrl: '/api/admin/upload',
    // Parte el archivo y sube los pedazos en paralelo, reintentando los que fallen.
    multipart: file.size > MULTIPART_FROM_BYTES,
    onUploadProgress: ({ percentage }) => onProgress(percentage),
  });

  return blob.url;
}

/** Devuelve el motivo por el que no se puede subir, o null si está bien. */
function rejectionReason(file: File): string | null {
  if (isQuickTime(file)) {
    return 'Los .mov no se reproducen en Chrome ni en Android. Convertilo a .mp4 (H.264) y subilo de nuevo.';
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    return `Ese archivo pesa ${megabytes(file.size)} MB y el máximo es ${MAX_UPLOAD_MB} MB. Exportalo para web (1080 vertical, H.264) y queda en unos ${RECOMMENDED_MB} MB sin diferencia visible en pantalla.`;
  }

  return null;
}

export default function SiteEditor({
  initialHeroVideo,
  uploadMode,
}: {
  initialHeroVideo?: string;
  uploadMode: BlobMode;
}) {
  const router = useRouter();
  const input = useRef<HTMLInputElement>(null);

  const [heroVideo, setHeroVideo] = useState(initialHeroVideo ?? '');
  const [progress, setProgress] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ kind: 'ok' | 'error'; text: string } | null>(null);

  const busy = progress !== null;

  async function handleFile(file: File) {
    const reason = rejectionReason(file);
    if (reason) {
      setStatus({ kind: 'error', text: reason });
      return;
    }

    setProgress(0);
    setStatus(null);

    try {
      setHeroVideo(await uploadToBlob(file, uploadMode, setProgress));
    } catch (error) {
      setStatus({
        kind: 'error',
        text: error instanceof Error ? error.message : 'No se pudo subir el archivo.',
      });
    } finally {
      setProgress(null);
    }
  }

  async function handleSave() {
    setSaving(true);
    setStatus(null);

    const res = await fetch('/api/admin/site', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ heroVideo: heroVideo || undefined }),
    });
    const data = await res.json().catch(() => ({}));

    setStatus(
      res.ok
        ? { kind: 'ok', text: heroVideo ? 'Listo, ya está en el sitio.' : 'Listo, quedó sin video.' }
        : { kind: 'error', text: data.error ?? 'No se pudo guardar.' }
    );

    if (res.ok) router.refresh();
    setSaving(false);
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.refresh();
  }

  return (
    <div className='space-y-5'>
      <div className='flex flex-wrap items-end justify-between gap-4'>
        <div>
          <h1 className='text-xl font-black tracking-wide text-white'>VIDEO DE PORTADA</h1>
          <p className='mt-1 max-w-md text-xs leading-relaxed text-neutral-500'>
            El de fondo, arriba de todo. Corto y en loop: 10-15 segundos, hasta{' '}
            {MAX_UPLOAD_MB} MB. Sin video queda un degradado negro.
          </p>
        </div>
        <button
          onClick={handleLogout}
          className='text-xs text-neutral-400 underline-offset-4 transition-colors hover:text-white hover:underline'
        >
          Salir
        </button>
      </div>

      <section className='border border-neutral-800 bg-neutral-950 p-4 sm:p-6'>
        <div className='relative aspect-video w-full overflow-hidden border border-neutral-800 bg-black'>
          {heroVideo ? (
            <video
              key={heroVideo}
              src={heroVideo}
              muted
              loop
              autoPlay
              playsInline
              className='h-full w-full object-cover'
            />
          ) : (
            <span className='flex h-full items-center justify-center text-xs text-neutral-600'>
              Sin video
            </span>
          )}

          {busy && (
            <span className='absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/80 px-10'>
              <span className='text-3xl font-black tabular-nums text-white'>{progress}%</span>
              <span className='h-0.5 w-full max-w-xs overflow-hidden bg-neutral-800'>
                <span
                  className='block h-full bg-white transition-[width] duration-200'
                  style={{ width: `${progress}%` }}
                />
              </span>
              <span className='text-[10px] tracking-wide text-neutral-400'>
                {progress === 100 ? 'PROCESANDO' : 'SUBIENDO'}
              </span>
            </span>
          )}
        </div>

        <input
          ref={input}
          type='file'
          accept='video/*'
          className='hidden'
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
            e.target.value = '';
          }}
        />

        <div className='mt-4 flex flex-wrap items-center gap-3'>
          <button
            onClick={() => input.current?.click()}
            disabled={busy}
            className='border border-neutral-700 px-4 py-2 text-xs font-bold tracking-wide text-white transition-colors hover:border-white disabled:opacity-50'
          >
            {busy ? 'SUBIENDO...' : heroVideo ? 'CAMBIAR VIDEO' : 'SUBIR VIDEO'}
          </button>

          {heroVideo && !busy && (
            <button
              onClick={() => setHeroVideo('')}
              className='text-xs text-neutral-600 underline-offset-4 transition-colors hover:text-red-400 hover:underline'
            >
              Quitar
            </button>
          )}
        </div>
      </section>

      {status && (
        <p
          role='status'
          className={`text-sm ${status.kind === 'ok' ? 'text-emerald-400' : 'text-red-400'}`}
        >
          {status.text}
        </p>
      )}

      <button
        onClick={handleSave}
        disabled={saving || busy}
        className='w-full bg-white px-6 py-4 text-sm font-black tracking-wide text-black transition-colors hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-50'
      >
        {saving ? 'PUBLICANDO...' : 'PUBLICAR EN EL SITIO'}
      </button>
    </div>
  );
}
