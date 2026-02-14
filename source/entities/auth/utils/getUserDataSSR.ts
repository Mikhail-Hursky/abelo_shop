'use server';

import { cookies } from 'next/headers';
import { authApi } from '@entities/auth/api';

export const getUserDataSSR = async () => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get('accessToken');
  const refreshToken = cookieStore.get('refreshToken');

  if (accessToken) {
    try {
      const userResponse = await authApi.getAuthUser(accessToken.value);

      return {
        userResponse,
      };
    } catch (_) {
      await authApi.logout();

      return null;
    }
  }

  if (!accessToken && refreshToken) {
    try {
      const refreshResponse = await authApi.refreshToken(refreshToken.value);

      if (refreshResponse) {
        const userResponse = await authApi.getAuthUser(refreshResponse.data.accessToken);

        return {
          userResponse,
          refreshResponse,
        };
      }

      return null;
    } catch (_) {
      await authApi.logout();

      return null;
    }
  }

  return null;
};
