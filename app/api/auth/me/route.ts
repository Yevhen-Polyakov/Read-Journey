import { cookies } from "next/headers"
import { api, ApiError } from "../../api"
import { NextResponse } from "next/server"

export async function GET(){
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accessToken')?.value

    if(!accessToken){
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try{
        const {data} = await api.get('/users/current', {
            headers: { Authorization: `Bearer ${accessToken}` }
        })

        return NextResponse.json(data)
    }catch (error) {
        return NextResponse.json(
            {
                error: (error as ApiError).response?.data?.error ?? (error as ApiError).message,
            },

            {status: (error as ApiError).status}
        )
    }
}