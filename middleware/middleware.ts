import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token"); // or session cookie

  // If user is not logged in and tries to access protected routes
  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  if (!token && request.nextUrl.pathname.startsWith("/chat")) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  return NextResponse.next();
}

// Apply only to these routes
export const config = {
  matcher: ["/dashboard/:path*", "/chat/:path*", "/sell/:path*"],
};
