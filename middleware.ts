import axios, { AxiosResponse } from 'axios';
import { NextResponse, type NextRequest } from 'next/server'
const isValidToken = async (token: string | undefined) => {
    if (token === undefined) return false;
    console.log(token);

    const response: AxiosResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/validate`, {
        token
    }, {
        validateStatus: function (status) {
            return status >= 200 && status < 500;
        }
    })
    console.log('isValidToken', response.data?.isValid);
    return response.data?.isValid;
}
export async function middleware(request: NextRequest) {
    const currentUser = request.cookies.get('currentUser')?.value;
    console.log('current user', currentUser);

    const publicRoutes = ['/login', '/signup']
    const isValid = await isValidToken(currentUser);
    console.log('middleware isValid', isValid);

    // if (currentUser && !request.nextUrl.pathname.startsWith('/dashboard')) {
    //     return Response.redirect(new URL('/dashboard', request.url))
    // }

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