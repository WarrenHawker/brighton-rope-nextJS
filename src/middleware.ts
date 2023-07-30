import { withAuth, NextRequestWithAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(function middleware(request: NextRequestWithAuth) {
  //if no token (user not logged in), redirect to signin page
  if (
    request.nextUrl.pathname.startsWith('/admin') &&
    !request.nextauth.token
  ) {
    return NextResponse.rewrite(new URL('/signin', request.url));
  }

  //if user is logged in but hasn't claimed their account, redirect to new user page
  if (
    request.nextUrl.pathname.startsWith('/admin') &&
    !request.nextauth.token?.claimed
  ) {
    return NextResponse.rewrite(new URL('/new-user', request.url));
  }
});

export const config = { matcher: ['/admin/:path*'] };
