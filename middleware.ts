import axios, { AxiosResponse } from 'axios';
import { NextResponse, type NextRequest } from 'next/server'
const isValidToken = async (token: string | undefined) => {
    if (token === undefined) return false;
    const response: AxiosResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/validate`, {
        token
    }, {
        validateStatus: function (status) {
            return status >= 200 && status < 500;
        }
    })
    return response.data?.isValid;
}
export async function middleware(request: NextRequest) {
    const currentUser = request.cookies.get('currentUser')?.value;
    //TODO: add public routes to a constant
    const publicRoutes = ['/login', '/signup', '/welcome']
    const isValid = await isValidToken(currentUser);
    //TODO: Validate that the user token is valid
    if (currentUser !== undefined && isValid && publicRoutes.includes(request.nextUrl.pathname)) {
        return Response.redirect(new URL('/', request.url))
    }
    if (!isValid && !publicRoutes.includes(request.nextUrl.pathname)) {
        return Response.redirect(new URL('/login', request.url))
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}