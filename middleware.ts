import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { checkSession } from './lib/api/serverApi';

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;
  const { pathname } = request.nextUrl;

  const privateRoutes = ['/profile', '/notes'];
  const publicRoutes = ['/sign-in', '/sign-up'];

  if (privateRoutes.some((path) => pathname.startsWith(path))) {
    if (!accessToken && !refreshToken) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
    const sessionRes = await checkSession();
    if (!sessionRes || sessionRes.status !== 200) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
  }

  if (publicRoutes.some((path) => pathname.startsWith(path)) && accessToken) {
    return NextResponse.redirect(new URL('/', request.url)); // ← "/" а не "/profile"
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};
