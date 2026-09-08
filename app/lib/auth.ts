import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';

export const SESSION_COOKIE = 'da_admin';
const SESSION_TTL_MS = 1000 * 60 * 60 * 12;

const getPassword = () => process.env.ADMIN_PASSWORD ?? '';

export const isAdminConfigured = () => getPassword().length > 0;

function sign(expiry: number): string {
  return createHmac('sha256', getPassword()).update(String(expiry)).digest('hex');
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  // timingSafeEqual exige la misma longitud, así que comparamos digests.
  const digestA = createHmac('sha256', 'cmp').update(bufA).digest();
  const digestB = createHmac('sha256', 'cmp').update(bufB).digest();
  return timingSafeEqual(digestA, digestB);
}

export function verifyPassword(candidate: string): boolean {
  const password = getPassword();
  if (!password) return false;
  return safeEqual(candidate, password);
}

export function createSessionToken(): { value: string; maxAge: number } {
  const expiry = Date.now() + SESSION_TTL_MS;
  return {
    value: `${expiry}.${sign(expiry)}`,
    maxAge: Math.floor(SESSION_TTL_MS / 1000),
  };
}

export function isValidSessionToken(token: string | undefined): boolean {
  if (!token || !isAdminConfigured()) return false;

  const [rawExpiry, signature] = token.split('.');
  const expiry = Number(rawExpiry);
  if (!Number.isFinite(expiry) || expiry < Date.now() || !signature) return false;

  return safeEqual(signature, sign(expiry));
}

export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  return isValidSessionToken(store.get(SESSION_COOKIE)?.value);
}
