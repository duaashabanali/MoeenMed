import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    const isPublicPath = ['/forgot-password', '/login', '/reset-password', '/signup'].includes(path)
    const token = request.cookies.get('token')?.value || ''


    // If the user is logged in and tries to access public paths, redirect to the homepage
    if (token && isPublicPath) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    // If the user is not logged in and tries to access private paths, redirect to /login
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // For logged-in users accessing other paths, allow access
    return NextResponse.next()
}

export const config = {
    matcher: [
        '/',
        '/recording-list',
        '/forgot-password',
        '/login',
        '/reset-password',
        '/signup',
        '/dashboard',
        '/dashboard/:path*'
    ]
}
