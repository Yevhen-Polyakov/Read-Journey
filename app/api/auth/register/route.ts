import { NextRequest, NextResponse } from 'next/server';
import { api, ApiError } from '../../api';
import {cookies} from 'next/headers';

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
  const apiRes = await api.post('/users/signup', body);

    const cookieStore = await cookies()
   
    cookieStore.set('accessToken', apiRes.data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60,
    });

    cookieStore.set('refreshToken', apiRes.data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });
      return NextResponse.json(apiRes.data);

  } catch (error) {
    return NextResponse.json(
      {
        error: (error as ApiError).response?.data?.error ?? (error as ApiError).message,
      },
      {status: (error as ApiError).status}
    )
  }
}