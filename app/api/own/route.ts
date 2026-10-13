import { NextRequest, NextResponse } from "next/server";
import { api } from "../api";
import axios from "axios";
import { cookies } from "next/headers";

 export async function GET(request: NextRequest){
    try{
        const cookieStore = await cookies()
        const accessToken = cookieStore.get('accessToken')?.value

        if(!accessToken){
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const status = request.nextUrl.searchParams.get('status')

        const res = await api.get('/books/own', {
            params: status ? {status} : {},
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })

        return NextResponse.json(res.data)
    } catch(error) {
        if(axios.isAxiosError(error)) {
            return NextResponse.json(
                {error: error.response?.data?.error ?? 'Failed to fetch books'},
                {status: error.response?.status ?? 500}
            )
        }

        return NextResponse.json(
            {error: 'Internal server error'},
            {status: 500}
        )
    }
  }