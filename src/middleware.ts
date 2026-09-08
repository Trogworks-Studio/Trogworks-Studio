import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => token?.role === "ADMIN" || token?.role === "EDITOR",
    },
    pages: {
      signIn: "/admin/login",
    },
  }
);

// /admin/login harici tum /admin/* rotalarini ve admin API'lerini korur
export const config = {
  matcher: ["/admin/((?!login).*)", "/api/admin/:path*"],
};
