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
        const res = await api.post("/books/reading/start", body, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        return NextResponse.json(res.data, { status: res.status });
    } catch (error) {
        if (isAxiosError(error)) {
            return NextResponse.json(
                { error: error.response?.data?.message ?? error.message },
                { status: error.response?.status ?? 500 }
            );
        }

        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
