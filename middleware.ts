import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

async function verifySession(accessToken: string, refreshToken: string) {
  try {
    const res = await fetch("https://notehub-api.goit.study/api/auth/session", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });

    if (res.ok) {
      return { ok: true };
    }

    if (refreshToken) {
      const refreshRes = await fetch(
        "https://notehub-api.goit.study/api/auth/refresh",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
          credentials: "include",
        }
      );

      if (refreshRes.ok) {
        const data = await refreshRes.json();

        return {
          ok: true,
          newAccessToken: data.accessToken,
          newRefreshToken: data.refreshToken,
        };
      }
    }

    return { ok: false };
  } catch {
    return { ok: false };
  }
}

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const { pathname } = request.nextUrl;

  const privateRoutes = ["/profile", "/notes"];
  const publicRoutes = ["/sign-in", "/sign-up"];

  if (privateRoutes.some((path) => pathname.startsWith(path))) {
    if (!accessToken && !refreshToken) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    if (!accessToken && refreshToken) {
      const session = await verifySession("", refreshToken);
      if (session.ok && session.newAccessToken) {
        const response = NextResponse.next();
        response.cookies.set("accessToken", session.newAccessToken, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
          path: "/",
        });
        response.cookies.set("refreshToken", session.newRefreshToken, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
          path: "/",
        });
        return response;
      } else {
        return NextResponse.redirect(new URL("/sign-in", request.url));
      }
    }
  }

  if (publicRoutes.some((path) => pathname.startsWith(path)) && accessToken) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
