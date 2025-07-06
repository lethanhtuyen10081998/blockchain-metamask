import { type NextRequest, NextResponse } from "next/server";

import { supabase } from "@/lib/supabase/provider/supabaseClient";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
};

const PROTECTED_ROUTES = ["/home", "/"];

const mappedProtectedRoutes = () => PROTECTED_ROUTES.map((route) => `${route}`);

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (pathname.includes("/api/auth/verify")) {
    return NextResponse.next();
  }

  console.log("MIDDLEWARE RUNNING FOR:", pathname);

  // Loại trừ trang sign-in
  if (pathname === "/sign-in") {
    return NextResponse.next();
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const isProtectedRoute = mappedProtectedRoutes().some(
    (route) => pathname === route || pathname.startsWith(route)
  );

  if (isProtectedRoute && !session) {
    const redirectUrl = new URL("/sign-in", req.url);
    redirectUrl.searchParams.set("redirectedFrom", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}
