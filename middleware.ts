import { NextResponse, type NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const currentUser = request.cookies.get('currentUser')?.value

    const publicRoutes = ['/login', '/signup']

    // if (currentUser && !request.nextUrl.pathname.startsWith('/dashboard')) {
    //     return Response.redirect(new URL('/dashboard', request.url))
    // }

    //TODO: Validate that the user token is valid
    if (currentUser && publicRoutes.includes(request.nextUrl.pathname)) {
        return Response.redirect(new URL('/', request.url))
    }


    if (!currentUser && !publicRoutes.includes(request.nextUrl.pathname)) {
        return Response.redirect(new URL('/login', request.url))
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}