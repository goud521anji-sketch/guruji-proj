import { NextResponse } from "next/server";
import { roadmaps } from "@/lib/data";

export async function GET() {
    return NextResponse.json(roadmaps);
}

export async function POST(request: Request) {
    // Mock creation
    const body = await request.json();
    const newRoadmap = {
        ...body,
        id: Math.random().toString(36).substr(2, 9),
        rating: 0,
        steps: []
    };
    // In a real app, we would save to DB
    return NextResponse.json(newRoadmap, { status: 201 });
}
