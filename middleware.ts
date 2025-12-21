import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Read token from cookie
  const token = request.cookies.get('adminToken')?.value

  const isLoginPage = pathname === '/login'
  const isDashboardPage = pathname.startsWith('/dashboard')

  // ❌ No token → trying to access dashboard
  if (!token && isDashboardPage) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // ✅ Token exists → trying to access login
  if (token && isLoginPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/login', '/dashboard/:path*'],
}
