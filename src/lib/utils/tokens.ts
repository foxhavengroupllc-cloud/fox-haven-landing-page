import { randomUUID } from 'crypto';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function generateToken(): string {
  return randomUUID();
}

export function isValidToken(token: string): boolean {
  return UUID_RE.test(token);
}
