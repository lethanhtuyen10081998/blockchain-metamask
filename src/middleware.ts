import { type NextRequest, NextResponse } from "next/server";

import { createSupabaseServer } from "@/lib/supabase/provider/supabase-server";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
};

const PROTECTED_ROUTES = ["/home", "/"];

const mappedProtectedRoutes = () => PROTECTED_ROUTES.map((route) => `${route}`);

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const supabase = await createSupabaseServer();
  const { data } = await supabase.auth.getUser();

  if (pathname === "/sign-in" && data.user) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname === "/sign-in" && !req.cookies.get("session")) {
    return NextResponse.next();
  }

  const isProtectedRoute = mappedProtectedRoutes().some(
    (route) => pathname === route || pathname.startsWith(route)
  );

  if (isProtectedRoute && !data.user) {
    const redirectUrl = new URL("/sign-in", req.url);
    redirectUrl.searchParams.set("redirectedFrom", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}
