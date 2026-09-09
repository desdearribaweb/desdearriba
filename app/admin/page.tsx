import type { Metadata } from 'next';
import Link from 'next/link';
import { isAdminConfigured, isAuthenticated } from '@/app/lib/auth';
import { blobEnvNames, blobMode } from '@/app/lib/blob';
import { getProjectsForAdmin } from '@/app/lib/projects';
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

function BlobDiagnosis() {
  const found = blobEnvNames();

  return (
    <div className='mt-5 border-t border-neutral-800 pt-4 text-xs text-neutral-500'>
      {found.length === 0 ? (
        <p>
          Este deploy no ve <strong className='text-neutral-300'>ninguna</strong> variable de
          storage. O el store quedó conectado a otro proyecto, o falta el redeploy del paso 2.
        </p>
      ) : (
        <p>
          Este deploy ve estas variables:{' '}
          <code className='text-neutral-300'>{found.join(', ')}</code>, pero ninguna sirve para
          autenticar. Hace falta una que termine en{' '}
          <code className='text-neutral-300'>_READ_WRITE_TOKEN</code> o{' '}
          <code className='text-neutral-300'>_STORE_ID</code>.
        </p>
      )}
    </div>
  );
}

function Step({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <li className='flex gap-3'>
      <span className='shrink-0 font-black text-white'>{n}</span>
      <span>{children}</span>
    </li>
  );
}

export default async function AdminPage() {
  if (!isAdminConfigured()) {
    return (
      <Shell>
        <Notice title='FALTA LA CONTRASEÑA'>
          <p>
            Este deploy no encuentra la variable{' '}
            <code className='text-white'>ADMIN_PASSWORD</code>.
          </p>

          <p className='border-l-2 border-white pl-4 text-neutral-300'>
            <strong className='text-white'>¿Ya la creaste y seguís viendo esto?</strong> Falta el
            redeploy. Vercel aplica las variables solo a los deploys nuevos, así que el que está
            publicado todavía no la tiene.
          </p>

          <ol className='space-y-2 pt-1'>
            <Step n='1.'>
              Settings → Environment Variables. El nombre tiene que ser exactamente{' '}
              <code className='text-white'>ADMIN_PASSWORD</code> y estar tildado{' '}
              <strong className='text-white'>Production</strong>.
            </Step>
            <Step n='2.'>
              Deployments → el primero de la lista → el botón <code className='text-white'>···</code>{' '}
              → <strong className='text-white'>Redeploy</strong>.
            </Step>
            <Step n='3.'>Cuando termine, recargá esta página.</Step>
          </ol>
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

  const mode = blobMode();

  if (!mode) {
    return (
      <Shell>
        <Notice title='FALTA EL ALMACENAMIENTO'>
          <p>
            La contraseña ya funciona. Falta conectar{' '}
            <strong className='text-white'>Vercel Blob</strong>, que es donde se guardan las fotos
            y los videos.
          </p>

          <ol className='space-y-2 pt-1'>
            <Step n='1.'>
              Storage → <strong className='text-white'>Create Database</strong> →{' '}
              <strong className='text-white'>Blob</strong> → conectalo a este proyecto. El token se
              agrega solo.
            </Step>
            <Step n='2.'>
              Deployments → el primero de la lista → <code className='text-white'>···</code> →{' '}
              <strong className='text-white'>Redeploy</strong>.
            </Step>
            <Step n='3.'>Cuando termine, recargá esta página.</Step>
          </ol>

          <BlobDiagnosis />
        </Notice>
      </Shell>
    );
  }

  try {
    const projects = await getProjectsForAdmin();

    return (
      <Shell>
        <ProjectsEditor initialProjects={projects} uploadMode={mode} />
      </Shell>
    );
  } catch (error) {
    return (
      <Shell>
        <Notice title='NO SE PUDO LEER EL ALMACENAMIENTO'>
          <p>
            Las credenciales del store llegaron, pero Vercel Blob rechazó la conexión. Suele pasar
            cuando el store se borró o quedó conectado a otro proyecto.
          </p>
          <p className='text-neutral-500'>
            Respuesta: <code>{error instanceof Error ? error.message : 'desconocida'}</code>
          </p>
          <BlobDiagnosis />
        </Notice>
      </Shell>
    );
  }
}
