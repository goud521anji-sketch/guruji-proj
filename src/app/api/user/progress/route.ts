import { NextResponse } from "next/server";
import { mockUser } from "@/lib/data";

export async function GET() {
    return NextResponse.json({
        completedRoadmaps: mockUser.completedRoadmaps,
        currentRoadmapId: mockUser.currentRoadmapId,
        // Add more user progress data as needed
    });
}

export async function POST(request: Request) {
    const body = await request.json();
    // Mock update
    return NextResponse.json({ message: "Progress updated", data: body });
}
