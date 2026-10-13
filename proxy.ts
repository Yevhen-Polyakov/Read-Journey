import { NextRequest, NextResponse } from "next/server";

const privateRoutes = ['/recommended', '/library', '/reading']
const publicRoutes = ['/login', '/register']

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
}

export async function proxy(request: NextRequest){
    const accessToken = request.cookies.get('accessToken')?.value
    const refreshToken = request.cookies.get('refreshToken')?.value

    const {pathname} = request.nextUrl

    const isPrivateRoutes = privateRoutes.some((route)=>
        pathname === route || pathname.startsWith(`${route}/`))

    const isPublicRoutes = publicRoutes.some((route)=>
        pathname === route || pathname.startsWith(`${route}/`))

    if(isPublicRoutes && accessToken) {
        return NextResponse.redirect(new URL('/recommended', request.url))
    }

    if(!isPrivateRoutes || accessToken) {
        return NextResponse.next()
    }

    if(refreshToken){
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/current/refresh`, {
                headers: { Authorization: `Bearer ${refreshToken}` }
            })

            if(res.ok){
                const data = await res.json()
                const response = NextResponse.next()

                response.cookies.set('accessToken', data.token, { ...cookieOptions, maxAge: 60 * 60 })
                response.cookies.set('refreshToken', data.refreshToken, { ...cookieOptions, maxAge: 60 * 60 * 24 * 7 })

                return response
            }
        } catch {
            
        }
    }

    const response = NextResponse.redirect(new URL('/login', request.url))
    response.cookies.delete('refreshToken')
    return response
}

export const config = {
    matcher: ['/recommended/:path*', '/library/:path*', '/reading/:path*', '/login', '/register'],
}