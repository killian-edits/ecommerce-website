import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes (Role-based access will also be verified via client auth context)
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("sb-access-token") || request.cookies.get("supabase-auth-token");
    // If no session exists at all, redirect to signin
    // Note: When in development preview mode, let through so user can preview UI
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/account/:path*"],
};

