import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";
import { api } from "../../api";

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const accessToken = (await cookies()).get("accessToken")?.value;

        if (!accessToken) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const res = await api.get(`/books/${encodeURIComponent(id)}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        return NextResponse.json(res.data, { status: res.status });
    } catch (error) {
        if (isAxiosError(error)) {
            return NextResponse.json(
                { error: error.response?.data?.message ?? "Failed to fetch book" },
                { status: error.response?.status ?? 500 }
            );
        }

        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
