import { ROADMAP_TEMPLATES, RoadmapModule, Topic } from "@/data/roadmap_templates";

export interface UserRoadmap {
    domain: string;
    totalMonths: number;
    generatedAt: string;
    monthlyPlan: MonthlyPlan[];
    dailyPlan: DailyPlan[];
    weeklyPlan: WeeklyPlan[];
}

export interface MonthlyPlan {
    month: number;
    title: string;
    modules: RoadmapModule[];
    status: "locked" | "active" | "completed";
}

export interface DailyPlan {
    day: number;
    title: string;
    topics: Topic[];
    totalMinutes: number;
    isCompleted: boolean;
}

export interface WeeklyPlan {
    week: number;
    title: string;
    days: DailyPlan[];
    isCompleted: boolean;
}

export function generateRoadmap(
    domain: string,
    dailyHours: number,
    completionMonths: number,
    skillLevel: "Beginner" | "Intermediate" | "Advanced" = "Beginner"
): UserRoadmap {
    // 1. Get Base Template
    const template = ROADMAP_TEMPLATES[domain] || ROADMAP_TEMPLATES["GenAI"] || ROADMAP_TEMPLATES["Default"];

    // 2. Filter Modules by Skill Level
    // Beginner: All modules
    // Intermediate: Skip "Beginner" modules (Assuming they are foundations)
    // Advanced: Skip "Beginner" and "Intermediate" (Focus on Advanced)
    // NOTE: This is a strict interpretation. In reality, we might want to keep some.
    let filteredModules = template.modules;
    if (skillLevel === "Intermediate") {
        filteredModules = template.modules.filter(m => m.difficulty !== "Beginner");
    } else if (skillLevel === "Advanced") {
        filteredModules = template.modules.filter(m => m.difficulty === "Advanced");
    }

    // Ensure we have SOMETHING. If too aggressive, revert to all.
    if (filteredModules.length === 0) filteredModules = template.modules;

    // 3. Calculate Capacity for Monthly Plan
    const daysPerMonth = 30;
    const monthlyCapacityHours = dailyHours * daysPerMonth;

    // 4. Distribute Modules into Monthly Plan
    const monthlyPlan: MonthlyPlan[] = [];
    let currentMonth = 1;
    let currentMonthLoad = 0;
    let currentMonthModules: RoadmapModule[] = [];

    filteredModules.forEach((module) => {
        // Simple bin-packing for months
        if (currentMonthLoad + module.estimatedHours > monthlyCapacityHours * 1.2 && currentMonthModules.length > 0) {
            monthlyPlan.push({
                month: currentMonth,
                title: `Phase ${currentMonth}`,
                modules: [...currentMonthModules],
                status: currentMonth === 1 ? "active" : "locked"
            });
            currentMonth++;
            currentMonthLoad = 0;
            currentMonthModules = [];
        }
        currentMonthModules.push(module);
        currentMonthLoad += module.estimatedHours;
    });

    if (currentMonthModules.length > 0) {
        monthlyPlan.push({
            month: currentMonth,
            title: `Phase ${currentMonth}`,
            modules: [...currentMonthModules],
            status: currentMonth === 1 ? "active" : "locked"
        });
    }

    // 5. Generate Daily Plan
    // Flatten topics from the filtered modules in order
    const allTopics: Topic[] = filteredModules.flatMap(m => m.topics);
    const dailyPlan: DailyPlan[] = [];

    const dailyMinutesCapacity = dailyHours * 60;
    let currentDay = 1;
    let currentDayTopics: Topic[] = [];
    let currentDayMinutes = 0;

    allTopics.forEach(topic => {
        const topicMinutes = topic.estimatedMinutes || 60; // Default 60 if missing

        // If adding this topic exceeds daily capacity comfortably
        // Allow overflow if it's the ONLY topic (don't get stuck)
        if (currentDayMinutes + topicMinutes > dailyMinutesCapacity && currentDayTopics.length > 0) {
            dailyPlan.push({
                day: currentDay,
                title: `Day ${currentDay}`,
                topics: [...currentDayTopics],
                totalMinutes: currentDayMinutes,
                isCompleted: false
            });
            currentDay++;
            currentDayTopics = [];
            currentDayMinutes = 0;
        }

        currentDayTopics.push(topic);
        currentDayMinutes += topicMinutes;
    });

    // Final day
    if (currentDayTopics.length > 0) {
        dailyPlan.push({
            day: currentDay,
            title: `Day ${currentDay}`,
            topics: [...currentDayTopics],
            totalMinutes: currentDayMinutes,
            isCompleted: false
        });
    }

    // 6. Generate Weekly Plan
    const weeklyPlan: WeeklyPlan[] = [];
    const daysPerWeek = 7; // Simple 7-day week

    for (let i = 0; i < dailyPlan.length; i += daysPerWeek) {
        const weekDays = dailyPlan.slice(i, i + daysPerWeek);
        const weekNumber = Math.floor(i / daysPerWeek) + 1;

        weeklyPlan.push({
            week: weekNumber,
            title: `Week ${weekNumber}`,
            days: weekDays,
            isCompleted: false
        });
    }

    return {
        domain: template.domain,
        totalMonths: monthlyPlan.length,
        generatedAt: new Date().toISOString(),
        monthlyPlan,
        dailyPlan,
        weeklyPlan
    };
}
