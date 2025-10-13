// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// const PUBLIC_FILE = /\.(.*)$/

// export function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl

//   // Skip public files and api/auth routes
//   if (
//     pathname.startsWith('/api/auth') ||
//     pathname.startsWith('/_next') ||
//     PUBLIC_FILE.test(pathname) ||
//     pathname === '/' ||
//     pathname.startsWith('/about') ||
//     pathname.startsWith('/blog') ||
//     pathname.startsWith('/contact') ||
//     pathname.startsWith('/login')
//   ) {
//     return NextResponse.next()
//   }

//   // Protect /dashboard routes
//   if (pathname.startsWith('/dashboard')) {
//     const token = req.cookies.get('next-auth.session-token') || req.cookies.get('auth')

//     if (!token) {
//       const loginUrl = new URL('/login', req.url)
//       loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname)
//       return NextResponse.redirect(loginUrl)
//     }
//   }

//   return NextResponse.next()
// }

// export const config = {
//   matcher: ['/dashboard/:path*'],
// }

// middleware.ts
// import { NextResponse } from "next/server"
// import type { NextRequest } from "next/server"
// import { getToken } from "next-auth/jwt"

// export async function middleware(req: NextRequest) {
//   const token = await getToken({
//     req,
//     secret: process.env.NEXTAUTH_SECRET,
//   })

//   const { pathname } = req.nextUrl

//   // ✅ Allow public routes
//   if (
//     pathname.startsWith("/login") ||
//     pathname.startsWith("/api/auth") ||
//     pathname === "/" ||
//     pathname.startsWith("/_next") ||
//     pathname.includes(".")
//   ) {
//     return NextResponse.next()
//   }

//   // ✅ Protect /dashboard
//   if (pathname.startsWith("/dashboard")) {
//     if (!token) {
//       const loginUrl = new URL("/login", req.url)
//       loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname)
//       return NextResponse.redirect(loginUrl)
//     }
//   }

//   return NextResponse.next()
// }

// // ✅ Make sure it runs on dashboard pages
// export const config = {
//   matcher: ["/dashboard/:path*"],
// }



// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const isLoggedIn = req.cookies.get("isLoggedIn")?.value === "true";
  const { pathname } = req.nextUrl;

  // Protect ALL routes that start with /dashboard
  if (pathname.startsWith("/dashboard") && !isLoggedIn) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("from", pathname); // optional: redirect back later
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// 🔥 this ensures middleware runs on ALL subpaths like /dashboard/settings, /dashboard/users, etc.
export const config = {
  matcher: ["/dashboard/:path*"],
};
