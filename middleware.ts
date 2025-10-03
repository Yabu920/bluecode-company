import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_FILE = /\.(.*)$/

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Skip public files and api/auth routes
  if (
    pathname.startsWith('/api/auth') ||
    pathname.startsWith('/_next') ||
    PUBLIC_FILE.test(pathname) ||
    pathname === '/' ||
    pathname.startsWith('/about') ||
    pathname.startsWith('/blog') ||
    pathname.startsWith('/contact') ||
    pathname.startsWith('/login')
  ) {
    return NextResponse.next()
  }

  // Protect /dashboard routes
  if (pathname.startsWith('/dashboard')) {
    const token = req.cookies.get('next-auth.session-token') || req.cookies.get('auth')

    if (!token) {
      const loginUrl = new URL('/login', req.url)
      loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
