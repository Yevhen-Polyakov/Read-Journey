import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { api } from "../api";
import { isAxiosError } from "axios";

export async function GET(request:NextRequest){
    try{
        const cookieStore = await cookies()
        const accessToken = cookieStore.get('accessToken')?.value

        if(!accessToken){
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { searchParams } = request.nextUrl
        const title = searchParams.get('title') ?? ''
        const author = searchParams.get('author') ?? ''
        const page = Number(searchParams.get('page') ?? 1)
        const limit = Number(searchParams.get('limit') ?? 10)
        const totalPages = searchParams.get('totalPages')

        const res = await api('/books/recommend',{
            params: {
                ...(title !== '' && {title}),
                ...(author !== '' && {author}),
                ...(totalPages !== null && {totalPages: Number(totalPages)}),
                page,
                limit,
            },
            headers:{
                Authorization: `Bearer ${accessToken}`
            }
        })

        return NextResponse.json(res.data, { status: res.status });
    } catch (error) {
    if (isAxiosError(error)) {
      
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status }
      );
    }
    
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

  export async function POST(request: NextRequest) {
    try {
      const cookieStore = await cookies()
      const accessToken = cookieStore.get('accessToken')?.value

      if (!accessToken) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }

      const newBook = await request.json()
      const res = await api.post('/books/add', newBook, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      return NextResponse.json(res.data, { status: res.status })
    } catch (error) {
      if (isAxiosError(error)) {
        return NextResponse.json(
          { error: error.message, response: error.response?.data },
          { status: error.response?.status ?? 500 }
        )
      }

      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
  }

 