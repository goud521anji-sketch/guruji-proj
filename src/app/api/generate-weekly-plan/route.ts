
import { NextResponse } from "next/server";
import { generateRoadmap } from "@/lib/roadmap-generator";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { domain, months, dailyHours, skillLevel } = body;

        if (!domain || !months || !dailyHours) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Use the existing logic from lib/roadmap-generator
        // This ensures consistent generation whether called from client or server
        const roadmap = generateRoadmap(domain, dailyHours, months, skillLevel || "Beginner");

        return NextResponse.json({
            weeklyPlan: roadmap.weeklyPlan,
            monthlyPlan: roadmap.monthlyPlan,
            domain: roadmap.domain,
            totalMonths: roadmap.totalMonths
        });
    } catch (error) {
        console.error("Failed to generate weekly plan:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
