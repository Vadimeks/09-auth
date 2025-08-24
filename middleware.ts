import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { parse } from 'cookie';
import { checkSession } from './lib/api/serverApi';

const privateRoutes = ['/profile', '/notes'];
const publicRoutes = ['/sign-in', '/sign-up'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  // DEBUG LOGS
  console.log('--- Middleware Debug ---');
  console.log('Pathname:', pathname);
  console.log('accessToken:', accessToken);
  console.log('refreshToken:', refreshToken);

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Если нет accessToken
  if (!accessToken) {
    if (refreshToken) {
      const data = await checkSession();
      console.log(
        'checkSession data:',
        data && data.status,
        data && data.headers?.['set-cookie']
      );
      if (data && data.headers) {
        const setCookie = data.headers['set-cookie'];
        if (setCookie) {
          const cookieArray = Array.isArray(setCookie)
            ? setCookie
            : [setCookie];
          for (const cookieStr of cookieArray) {
            const parsed = parse(cookieStr);
            const options = {
              expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
              path: parsed.Path,
              maxAge: Number(parsed['Max-Age']),
            };
            if (parsed.accessToken)
              cookieStore.set('accessToken', parsed.accessToken, options);
            if (parsed.refreshToken)
              cookieStore.set('refreshToken', parsed.refreshToken, options);
          }
          console.log('Silent auth successful, cookies updated');
          if (isPublicRoute) {
            console.log('Redirecting from public route to /');
            return NextResponse.redirect(new URL('/', request.url), {
              headers: {
                Cookie: cookieStore.toString(),
              },
            });
          }
          if (isPrivateRoute) {
            console.log('Allowing access to private route after silent auth');
            return NextResponse.next({
              headers: {
                Cookie: cookieStore.toString(),
              },
            });
          }
        } else {
          console.log('No set-cookie in response, redirect to /sign-in');
        }
      } else {
        console.log('No data from checkSession, redirect to /sign-in');
        if (isPrivateRoute) {
          return NextResponse.redirect(new URL('/sign-in', request.url));
        }
      }
    }
    if (isPublicRoute) {
      console.log('Access allowed to public route');
      return NextResponse.next();
    }
    if (isPrivateRoute) {
      console.log('Redirecting to /sign-in (no tokens)');
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
  }

  // Если есть accessToken
  if (isPublicRoute) {
    console.log('Redirecting authenticated user from public route to /');
    return NextResponse.redirect(new URL('/', request.url));
  }
  if (isPrivateRoute) {
    console.log('Access allowed to private route');
    return NextResponse.next();
  }

  console.log('Default next()');
  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};
