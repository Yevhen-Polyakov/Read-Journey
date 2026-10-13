import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { isAxiosError } from "axios";
import { api } from "../../api";

export async function POST(request: NextRequest) {
    try {
        const accessToken = (await cookies()).get("accessToken")?.value;

        if (!accessToken) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const res = await api.post("/books/reading/finish", body, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        return NextResponse.json(res.data, { status: res.status });
    } catch (error) {
        if (isAxiosError(error)) {
            const status = error.response?.status ?? 500;
            const message = status === 409
                ? error.response?.data?.message ?? "Reading is not started, the book is already read, or the stop page is less than the start page"
                : error.response?.data?.message ?? error.message;

            return NextResponse.json({ error: message }, { status });
        }

        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
