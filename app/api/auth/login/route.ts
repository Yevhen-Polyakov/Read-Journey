import { NextRequest, NextResponse } from "next/server";
import { api, ApiError } from "../../api";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
    const body = await req.json();

    try {
        const apiRes = await api.post("users/signin", body);

        const cookieStore = await cookies();

        cookieStore.set("accessToken", apiRes.data.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60,
        });

        cookieStore.set("refreshToken", apiRes.data.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });

        return NextResponse.json(apiRes.data);

    } catch (error) {
        const apiError = error as ApiError;

        return NextResponse.json(
            {
                error: apiError.response?.data?.error ?? apiError.message,
            },
            {
                status: apiError.response?.status ?? 500,
            }
        );
    }
}
