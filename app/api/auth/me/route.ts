import { NextRequest, NextResponse } from 'next/server';
import { axiosInstance } from '@shared/api';
import { User } from '@entities/auth/model';
import { AxiosError } from 'axios';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json({ error: 'No access token' }, { status: 401 });
    }

    const { data, status } = await axiosInstance.get<User>('/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(data, { status: status });
  } catch (error) {
    if (error instanceof AxiosError && error) {
      return NextResponse.json(error.message, { status: error.status });
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
