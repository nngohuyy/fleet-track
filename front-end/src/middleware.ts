import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    // Redirect to login if no token
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}

// Apply middleware only to specific paths
export const config = {
  matcher: ['/', '/protected-path'], // Add paths that require authentication
};
