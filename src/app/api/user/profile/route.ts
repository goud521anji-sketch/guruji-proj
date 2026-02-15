import { NextResponse } from "next/server";
import { UserProfile } from "@/types";

export async function POST(request: Request) {
    try {
        const body: UserProfile = await request.json();

        // Validate required fields (basic header validation)
        if (!body.name || !body.primaryGoal) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        // In a real app, save to database
        console.log("Saving user profile:", body);

        return NextResponse.json({
            message: "Profile created successfully",
            profile: body
        }, { status: 201 });
    } catch (error) {
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
