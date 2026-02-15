import { NextResponse } from "next/server";
import { roadmaps } from "@/lib/data";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const roadmap = roadmaps.find((r) => r.id === params.id);

    if (!roadmap) {
        return new NextResponse("Roadmap not found", { status: 404 });
    }

    return NextResponse.json(roadmap);
}
