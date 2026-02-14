import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { axiosInstance } from '@shared/api';
import { LoginResponse } from '@entities/auth/model';
import { AxiosError } from 'axios';
import { CONFIG } from '@shared/constants';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const { token } = await request.json();

    if (!token) {
      cookieStore.delete('accessToken');
      cookieStore.delete('refreshToken');

      return NextResponse.json({ error: 'No refresh token' }, { status: 401 });
    }

    const { data, status } = await axiosInstance.post<LoginResponse>('/auth/refresh', {
      refreshToken: token,
    });

    cookieStore.set('accessToken', data.accessToken, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: CONFIG.ACCESS_TOKEN_MAX_AGE,
      path: '/',
    });

    cookieStore.set('refreshToken', data.refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: CONFIG.REFRESH_TOKEN_MAX_AGE,
      path: '/',
    });

    return NextResponse.json(data, { status: status });
  } catch (error) {
    const cookieStore = await cookies();

    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');

    if (error instanceof AxiosError && error.response) {
      return NextResponse.json(
        { error: error.response.data?.message || error.message },
        { status: error.response.status || 500 },
      );
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
