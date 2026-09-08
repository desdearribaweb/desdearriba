import { list, put } from '@vercel/blob';
import { blobAuth, isBlobConfigured } from './blob';

export const PROJECT_CATEGORIES = [
  { value: 'eventos', label: 'EVENTOS' },
  { value: 'arquitectura', label: 'ARQUITECTURA' },
  { value: 'inmobiliario', label: 'INMOBILIARIO' },
  { value: 'campo', label: 'CAMPO' },
  { value: 'redes', label: 'REDES' },
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number]['value'];

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  /** Imagen de portada. Para un video es el poster. */
  image: string;
  /** Opcional: si existe, el proyecto se abre como video en el lightbox. */
  video?: string;
  description: string;
}

const PROJECTS_KEY = 'data/projects.json';

/** Se muestran cuando todavía no se cargó ningún trabajo desde /admin. */
export const placeholderProjects: Project[] = [
  {
    id: 'placeholder-1',
    title: 'Tu primer trabajo',
    category: 'arquitectura',
    image: '',
    description: '',
  },
  {
    id: 'placeholder-2',
    title: 'Tu segundo trabajo',
    category: 'campo',
    image: '',
    description: '',
  },
  {
    id: 'placeholder-3',
    title: 'Tu tercer trabajo',
    category: 'eventos',
    image: '',
    description: '',
  },
];

async function findProjectsBlobUrl(): Promise<string | null> {
  const { blobs } = await list({ prefix: PROJECTS_KEY, limit: 1, ...blobAuth() });
  return blobs[0]?.url ?? null;
}

function sanitize(raw: unknown): Project[] {
  if (!Array.isArray(raw)) return [];

  const valid = PROJECT_CATEGORIES.map((c) => c.value) as readonly string[];

  return raw.flatMap((item): Project[] => {
    if (!item || typeof item !== 'object') return [];
    const p = item as Record<string, unknown>;
    if (typeof p.id !== 'string' || typeof p.image !== 'string') return [];

    return [
      {
        id: p.id,
        title: typeof p.title === 'string' ? p.title : '',
        category: (valid.includes(p.category as string)
          ? p.category
          : 'eventos') as ProjectCategory,
        image: p.image,
        video: typeof p.video === 'string' && p.video ? p.video : undefined,
        description: typeof p.description === 'string' ? p.description : '',
      },
    ];
  });
}

/**
 * Devuelve los proyectos publicados. Nunca lanza: si Blob no está configurado
 * o falla, la home sigue renderizando con los placeholders.
 */
export async function getProjects(): Promise<Project[]> {
  if (!isBlobConfigured()) return placeholderProjects;

  try {
    const url = await findProjectsBlobUrl();
    if (!url) return placeholderProjects;

    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return placeholderProjects;

    const parsed = sanitize(await res.json());
    return parsed.length > 0 ? parsed : placeholderProjects;
  } catch {
    return placeholderProjects;
  }
}

/** Igual que getProjects pero sin cache y sin placeholders: para el admin. */
export async function getProjectsForAdmin(): Promise<Project[]> {
  const url = await findProjectsBlobUrl();
  if (!url) return [];

  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) return [];

  return sanitize(await res.json());
}

export async function saveProjects(projects: Project[]): Promise<void> {
  await put(PROJECTS_KEY, JSON.stringify(projects, null, 2), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 60,
    ...blobAuth(),
  });
}
