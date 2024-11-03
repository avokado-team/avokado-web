import { NextRequest, NextResponse } from "next/server";
import { getReqSession, getSession } from "./lib/session";

interface IRoutes {
  [key: string]: boolean;
}

const publicOnlyUrls: IRoutes = {
  "/login": true,
  "/find-password": true,
  "/signup": true,
  "/user/confirm-email": true,
  "/user/confirm-email-done": true,
};

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const exists = publicOnlyUrls[request.nextUrl.pathname];

  if (session.exp && session.exp < Date.now() / 1000) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    const new_session = await getReqSession(request, response);
    new_session.destroy();
    return response;
  } else if (!session.id) {
    if (!exists) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      const new_session = await getReqSession(request, response);
      new_session.destroy();
      return response;
    }
  } else {
    if (exists) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|user/confirm-email|_next/image|favicon.ico|.*\\.png$|.*\\.svg$).*)",
  ],
};
