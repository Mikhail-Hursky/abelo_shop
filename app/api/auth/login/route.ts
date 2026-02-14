import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { AxiosError } from 'axios';
import { axiosInstance } from '@shared/api';
import { LoginResponse } from '@entities/auth/model';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const cookieStore = await cookies();

    const res = await axiosInstance.post<LoginResponse>('/auth/login', {
      ...body,
    });

    cookieStore.set('accessToken', res.data.accessToken, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60,
      path: '/',
    });

    cookieStore.set('refreshToken', res.data.refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return NextResponse.json(error.response.data, { status: error.response.status });
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
