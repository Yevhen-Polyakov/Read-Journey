import { AddNewBok, LibraryBook, Books, DeleteBookId } from "@/types/books";
import { nextServer } from "./api";


export type RegisterRequest = {
    name: string;
    email: string;
    password: string;
}

type LoginRequest = {
    email: string;
    password: string;
}

 export type User = {
    id: string;
    name: string;
    email:string;
    password: string;
    token: string;
    refreshToken: string;
}

export type BooksResponse = {
    results: Books[];
    totalPages: number;
    page: number;
    perPage: number;
}

export type StartReadingRequest = {
    id: string;
    page: number;
}


export const registerUser = async(data: RegisterRequest)=> {
    const response = await nextServer.post<User>('/auth/register', data);
    return response.data
}

export const loginUser = async (data: LoginRequest)=> {
    const response = await nextServer.post<User>('/auth/login', data)
    return response.data
}

export const getMe = async () => {
    const {data} = await nextServer.get<User>('/auth/me')
    return data
}

export const logout = async (): Promise<void> => {
    await nextServer.post('/auth/logout')
}

export const checkSession = async () => {
    const res = await nextServer.get<{ success: boolean }>('/auth/session')
    return res.data.success
}

export const getBooks = async (title: string, author: string, page?: number, limit?: number, totalPages?: number): Promise<BooksResponse> => {
    const res = await nextServer.get<BooksResponse>('/books', {
        params:{
            title: title || undefined,
            author: author || undefined,
            totalPages: totalPages || undefined,
            page,
            limit,
        }
    })

    return res.data
}

export const addBook = async (newBook: AddNewBok): Promise<LibraryBook> => {
    const res = await nextServer.post<LibraryBook>('/books', newBook)
    return res.data
}

export const addRecommendedBook = async (id: string): Promise<LibraryBook> => {
    const res = await nextServer.post<LibraryBook>(`/books/add/${id}`)
    return res.data
}

export const getOwnBooks = async (status?: 'unread' | 'in-progress' | 'done'): Promise<LibraryBook[]> => {
    const res = await nextServer.get<LibraryBook[]>('/own',{
        params: status ? {status} : {
            
        }
    })
    return res.data
}

export const deleteBook = async (id: string): Promise<DeleteBookId> => {
    const res = await nextServer.delete<DeleteBookId>(`/books/remove/${id}`)
    return res.data
}

export const getBookById = async(id: string): Promise<LibraryBook> => {
    const res = await nextServer.get<LibraryBook>(`/own/${id}`)
    return res.data
}

export const readingStart = async (id: string, page: number): Promise<LibraryBook> => {
    const body: StartReadingRequest = { id, page }
    const res = await nextServer.post<LibraryBook>('/books/start', body)
    return res.data
}

export const readingFinish = async (id: string, page: number): Promise<LibraryBook> => {
    const body: StartReadingRequest = { id, page }
    const res = await nextServer.post<LibraryBook>('/books/finish', body)
    return res.data
}

export const deleteReading = async (bookId: string, readingId: string): Promise<LibraryBook> => {
    const res = await nextServer.delete<LibraryBook>('/books/reading', {
        params: { bookId, readingId },
    })
    return res.data
}

