'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    setError('');

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.refresh();
      return;
    }

    const data = await res.json().catch(() => ({}));
    setError(data.error ?? 'No se pudo ingresar.');
    setPending(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='border border-neutral-800 bg-neutral-950 p-6 sm:p-8'
    >
      <h1 className='mb-6 text-xl font-black tracking-wide text-white'>INGRESAR</h1>

      <label htmlFor='password' className='mb-2 block text-xs font-bold tracking-widest text-neutral-400'>
        CONTRASEÑA
      </label>
      <input
        id='password'
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete='current-password'
        required
        className='w-full border border-neutral-700 bg-black px-4 py-3 text-white transition-colors placeholder:text-neutral-600 focus:border-white focus:outline-none'
        placeholder='••••••••'
      />

      {error && (
        <p role='alert' className='mt-4 text-sm text-red-400'>
          {error}
        </p>
      )}

      <button
        type='submit'
        disabled={pending}
        className='mt-6 w-full bg-white px-6 py-3 text-sm font-black tracking-wide text-black transition-colors hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-50'
      >
        {pending ? 'INGRESANDO...' : 'ENTRAR'}
      </button>
    </form>
  );
}
