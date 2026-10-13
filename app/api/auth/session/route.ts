import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { api } from "../../api"

export async function GET(){
    const cookieStore = await cookies()

    const accessToken = cookieStore.get('accessToken')?.value
    const refreshToken = cookieStore.get('refreshToken')?.value

    if(accessToken) {
        try {
            await api.get('/users/current', {
                headers: { Authorization: `Bearer ${accessToken}` }
            })

            return NextResponse.json({ success: true})
        } catch {
        
        }
    }

    if(refreshToken) {
        try {
            const { data } = await api.get('/users/current/refresh', {
                headers: { Authorization: `Bearer ${refreshToken}` }
            })

            const options = {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax" as const,
                path: "/",
            }

            cookieStore.set('accessToken', data.token, { ...options, maxAge: 60 * 60 })
            cookieStore.set('refreshToken', data.refreshToken, { ...options, maxAge: 60 * 60 * 24 * 7 })

            return NextResponse.json({success: true})
        } catch {
            cookieStore.delete('accessToken')
            cookieStore.delete('refreshToken')
        }
    }

    if(accessToken) {
        cookieStore.delete('accessToken')
    }

    return NextResponse.json({ success: false})
}