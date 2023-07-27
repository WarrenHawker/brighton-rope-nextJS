import { withAuth, NextRequestWithAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(function middleware(request: NextRequestWithAuth) {
  //if no token (user not logged in), redirect to signin page
  if (
    request.nextUrl.pathname.startsWith('/admin') &&
    !request.nextauth.token
  ) {
    // return NextResponse.redirect(new URL('/signin', request.url));
    return NextResponse.rewrite(new URL('/signin', request.url));
  }
});

export const config = { matcher: ['/admin/:path*'] };
