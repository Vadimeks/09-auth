import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const privatePaths = ["/profile", "/notes"];

  if (
    privatePaths.some((path) => request.nextUrl.pathname.startsWith(path)) &&
    !token
  ) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*"],
};
