import { cookies } from "next/headers";
import { api } from "../../api";
import { NextResponse } from "next/server";

export async function POST() {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accessToken')?.value

    if (accessToken) {
        try {
            await api.post('/users/signout', null, {
                headers: { Authorization: `Bearer ${accessToken}` }
            })
        } catch {
            
        }
    }

    cookieStore.delete('accessToken')
    cookieStore.delete('refreshToken')

    return NextResponse.json({ message: 'Logged out successfully' })
}