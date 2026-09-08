import type { Metadata } from 'next';
import Link from 'next/link';
import { isAdminConfigured, isAuthenticated } from '@/app/lib/auth';
import { getProjectsForAdmin, isBlobConfigured } from '@/app/lib/projects';
import LoginForm from './LoginForm';
import ProjectsEditor from './ProjectsEditor';

export const metadata: Metadata = {
  title: 'Panel | Desde Arriba',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className='min-h-screen bg-black px-4 py-12 sm:px-6 sm:py-16'>
      <div className='mx-auto w-full max-w-3xl'>
        <div className='mb-10 flex items-center justify-between gap-4'>
          <div>
            <p className='text-xs font-black tracking-[0.3em] text-white'>DESDE ARRIBA</p>
            <p className='mt-1 text-xs text-neutral-500'>Panel de trabajos</p>
          </div>
          <Link
            href='/'
            className='text-xs font-medium text-neutral-400 underline-offset-4 transition-colors hover:text-white hover:underline'
          >
            Ver sitio
          </Link>
        </div>
        {children}
      </div>
    </main>
  );
}

function Notice({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className='border border-neutral-800 bg-neutral-950 p-6 sm:p-8'>
      <h2 className='mb-3 text-lg font-black tracking-wide text-white'>{title}</h2>
      <div className='space-y-3 text-sm leading-relaxed text-neutral-400'>{children}</div>
    </div>
  );
}

export default async function AdminPage() {
  if (!isAdminConfigured()) {
    return (
      <Shell>
        <Notice title='FALTA CONFIGURAR EL PANEL'>
          <p>
            Agregá la variable de entorno <code className='text-white'>ADMIN_PASSWORD</code> en
            Vercel para poder entrar.
          </p>
          <p>
            Vercel → tu proyecto → <strong className='text-white'>Settings</strong> →{' '}
            <strong className='text-white'>Environment Variables</strong> → New. Después hacé{' '}
            <strong className='text-white'>Redeploy</strong>.
          </p>
        </Notice>
      </Shell>
    );
  }

  if (!(await isAuthenticated())) {
    return (
      <Shell>
        <LoginForm />
      </Shell>
    );
  }

  if (!isBlobConfigured()) {
    return (
      <Shell>
        <Notice title='FALTA CONECTAR EL ALMACENAMIENTO'>
          <p>
            El panel necesita <strong className='text-white'>Vercel Blob</strong> para guardar las
            fotos y videos.
          </p>
          <p>
            Vercel → tu proyecto → <strong className='text-white'>Storage</strong> →{' '}
            <strong className='text-white'>Create Database</strong> →{' '}
            <strong className='text-white'>Blob</strong> → conectalo a este proyecto. Después hacé{' '}
            <strong className='text-white'>Redeploy</strong>.
          </p>
          <p>La variable BLOB_READ_WRITE_TOKEN se agrega sola al conectarlo.</p>
        </Notice>
      </Shell>
    );
  }

  return (
    <Shell>
      <ProjectsEditor initialProjects={await getProjectsForAdmin()} />
    </Shell>
  );
}
