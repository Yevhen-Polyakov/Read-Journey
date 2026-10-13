import axios, {AxiosError} from "axios";

export type ApiError = AxiosError<{error: string}>

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
})