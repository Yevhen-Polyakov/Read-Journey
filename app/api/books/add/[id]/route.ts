import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { isAxiosError } from "axios";
import { api } from "../../../api";

export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const accessToken = (await cookies()).get("accessToken")?.value;

        if (!accessToken) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const response = await api.post(`/books/add/${encodeURIComponent(id)}`, undefined, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return NextResponse.json(response.data, { status: response.status });
    } catch (error) {
        if (isAxiosError(error)) {
            return NextResponse.json(
                { error: error.message, response: error.response?.data },
                { status: error.response?.status ?? 500 }
            );
        }

        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}