import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { axiosInstance } from '@shared/api';
import { LoginResponse } from '@entities/auth/model';
import { AxiosError } from 'axios';

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
      maxAge: 60 * 60,
      path: '/',
    });

    cookieStore.set('refreshToken', data.refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return NextResponse.json(data, { status: status });
  } catch (error) {
    const cookieStore = await cookies();

    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');

    if (error instanceof AxiosError && error) {
      return NextResponse.json(error.message, { status: error.status });
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
