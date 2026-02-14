'use server';

import { cookies } from 'next/headers';
import { CONFIG } from '@shared/constants';

export async function setCookie({ accessToken, refreshToken }: Record<string, string>) {
  const cookieStore = await cookies();

  cookieStore.set('accessToken', accessToken, {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: CONFIG.ACCESS_TOKEN_MAX_AGE,
    path: '/',
  });

  cookieStore.set('refreshToken', refreshToken, {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: CONFIG.REFRESH_TOKEN_MAX_AGE,
    path: '/',
  });
}
