'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { upload } from '@vercel/blob/client';
import { PROJECT_CATEGORIES, type Project, type ProjectCategory } from '@/app/lib/projects';

const MAX_PROJECTS = 3;

type Draft = {
  id: string;
  title: string;
  category: ProjectCategory;
  description: string;
  image: string;
  video?: string;
};

const emptyDraft = (): Draft => ({
  id: crypto.randomUUID(),
  title: '',
  category: 'eventos',
  description: '',
  image: '',
});

function toDrafts(projects: Project[]): Draft[] {
  const drafts = projects.slice(0, MAX_PROJECTS).map((p) => ({ ...p }));
  while (drafts.length < MAX_PROJECTS) drafts.push(emptyDraft());
  return drafts;
}

/**
 * Saca un frame del video para usarlo de portada, así no hay que subir
 * una foto aparte. Se reescala para no guardar un JPG de 4K.
 */
async function posterFromVideo(file: File): Promise<File | null> {
  const url = URL.createObjectURL(file);
  const video = document.createElement('video');
  video.src = url;
  video.muted = true;
  video.playsInline = true;
  video.preload = 'metadata';

  try {
    await new Promise<void>((resolve, reject) => {
      video.onloadeddata = () => resolve();
      video.onerror = () => reject(new Error('video'));
      setTimeout(() => reject(new Error('timeout')), 15000);
    });

    await new Promise<void>((resolve) => {
      video.onseeked = () => resolve();
      video.currentTime = Math.min(1, (video.duration || 3) / 3);
    });

    const scale = Math.min(1, 1080 / Math.max(video.videoWidth, 1));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(video.videoWidth * scale);
    canvas.height = Math.round(video.videoHeight * scale);

    const ctx = canvas.getContext('2d');
    if (!ctx || !canvas.width || !canvas.height) return null;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, 'image/jpeg', 0.85)
    );
    if (!blob) return null;

    return new File([blob], 'portada.jpg', { type: 'image/jpeg' });
  } catch {
    return null;
  } finally {
    URL.revokeObjectURL(url);
  }
}

const uploadToBlob = async (file: File) =>
  (await upload(file.name, file, { access: 'public', handleUploadUrl: '/api/admin/upload' })).url;

export default function ProjectsEditor({ initialProjects }: { initialProjects: Project[] }) {
  const router = useRouter();
  const [drafts, setDrafts] = useState<Draft[]>(() => toDrafts(initialProjects));
  const [status, setStatus] = useState<{ kind: 'ok' | 'error'; text: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const [busy, setBusy] = useState<number | null>(null);

  const update = (index: number, patch: Partial<Draft>) =>
    setDrafts((prev) => prev.map((d, i) => (i === index ? { ...d, ...patch } : d)));

  async function handleFile(index: number, file: File) {
    setBusy(index);
    setStatus(null);

    try {
      if (file.type.startsWith('video/')) {
        const poster = await posterFromVideo(file);
        const [video, image] = await Promise.all([
          uploadToBlob(file),
          poster ? uploadToBlob(poster) : Promise.resolve(''),
        ]);
        update(index, image ? { video, image } : { video });

        if (!image) {
          setStatus({
            kind: 'error',
            text: 'Subimos el video pero no pudimos generar la portada. Agregá una foto.',
          });
        }
      } else {
        update(index, { image: await uploadToBlob(file) });
      }
    } catch (error) {
      setStatus({
        kind: 'error',
        text: error instanceof Error ? error.message : 'No se pudo subir el archivo.',
      });
    } finally {
      setBusy(null);
    }
  }

  async function handleSave() {
    setSaving(true);
    setStatus(null);

    const projects = drafts.filter((d) => d.image && d.title.trim());

    const res = await fetch('/api/admin/projects', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projects }),
    });
    const data = await res.json().catch(() => ({}));

    if (res.ok) {
      setStatus({
        kind: 'ok',
        text: `Listo. ${projects.length} trabajo${projects.length === 1 ? '' : 's'} en el sitio.`,
      });
      setDrafts(toDrafts(data.projects ?? projects));
      router.refresh();
    } else {
      setStatus({ kind: 'error', text: data.error ?? 'No se pudo guardar.' });
    }

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
          <h1 className='text-xl font-black tracking-wide text-white'>TUS 3 TRABAJOS</h1>
          <p className='mt-1 text-xs leading-relaxed text-neutral-500'>
            Subí el video (o una foto) y ponele un título. La portada se genera sola.
          </p>
        </div>
        <button
          onClick={handleLogout}
          className='text-xs text-neutral-400 underline-offset-4 transition-colors hover:text-white hover:underline'
        >
          Salir
        </button>
      </div>

      <div className='grid gap-4 sm:grid-cols-3'>
        {drafts.map((draft, index) => (
          <SlotCard
            key={draft.id}
            index={index}
            draft={draft}
            busy={busy === index}
            onChange={update}
            onFile={handleFile}
            onClear={() =>
              setDrafts((prev) => prev.map((d, i) => (i === index ? emptyDraft() : d)))
            }
          />
        ))}
      </div>

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
        disabled={saving || busy !== null}
        className='w-full bg-white px-6 py-4 text-sm font-black tracking-wide text-black transition-colors hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-50'
      >
        {saving ? 'PUBLICANDO...' : 'PUBLICAR EN EL SITIO'}
      </button>
    </div>
  );
}

function SlotCard({
  index,
  draft,
  busy,
  onChange,
  onFile,
  onClear,
}: {
  index: number;
  draft: Draft;
  busy: boolean;
  onChange: (index: number, patch: Partial<Draft>) => void;
  onFile: (index: number, file: File) => void;
  onClear: () => void;
}) {
  const input = useRef<HTMLInputElement>(null);

  return (
    <section className='border border-neutral-800 bg-neutral-950 p-4'>
      <div className='mb-3 flex items-center justify-between'>
        <span className='text-[10px] font-bold tracking-[0.2em] text-neutral-500'>
          {String(index + 1).padStart(2, '0')}
        </span>
        {(draft.image || draft.title) && !busy && (
          <button
            onClick={onClear}
            className='text-[11px] text-neutral-600 underline-offset-4 transition-colors hover:text-red-400 hover:underline'
          >
            Vaciar
          </button>
        )}
      </div>

      <input
        ref={input}
        type='file'
        accept='video/*,image/*'
        className='hidden'
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFile(index, file);
          e.target.value = '';
        }}
      />

      <button
        type='button'
        onClick={() => input.current?.click()}
        disabled={busy}
        className='group relative block aspect-[9/16] w-full overflow-hidden border border-neutral-800 bg-black transition-colors hover:border-neutral-600 disabled:cursor-wait'
      >
        {draft.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={draft.image} alt='' className='h-full w-full object-cover' />
        ) : (
          <span className='flex h-full items-center justify-center px-3 text-center text-[11px] leading-relaxed text-neutral-600'>
            Tocá para subir
            <br />
            video o foto
          </span>
        )}

        {busy && (
          <span className='absolute inset-0 flex items-center justify-center bg-black/70 text-[11px] font-bold tracking-wide text-white'>
            SUBIENDO...
          </span>
        )}

        {draft.video && !busy && (
          <span className='absolute right-2 top-2 bg-white px-1.5 py-0.5 text-[9px] font-black tracking-wide text-black'>
            VIDEO
          </span>
        )}
      </button>

      <input
        type='text'
        value={draft.title}
        onChange={(e) => onChange(index, { title: e.target.value })}
        maxLength={120}
        placeholder='Título'
        className='mt-3 w-full border border-neutral-800 bg-black px-3 py-2 text-sm text-white transition-colors placeholder:text-neutral-600 focus:border-white focus:outline-none'
      />

      <select
        value={draft.category}
        onChange={(e) => onChange(index, { category: e.target.value as ProjectCategory })}
        aria-label='Categoría'
        className='mt-2 w-full cursor-pointer border border-neutral-800 bg-black px-3 py-2 text-xs text-neutral-300 transition-colors focus:border-white focus:outline-none'
      >
        {PROJECT_CATEGORIES.map((c) => (
          <option key={c.value} value={c.value}>
            {c.label}
          </option>
        ))}
      </select>
    </section>
  );
}
