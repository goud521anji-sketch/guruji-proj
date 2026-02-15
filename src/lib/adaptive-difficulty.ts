import { Difficulty, UserProgress } from "@/types/assessment";

export function calculateNewDifficulty(currentDifficulty: Difficulty, weeklyScore: number, streak: number): Difficulty {
    // Rules:
    // If streak > 7 AND weeklyScore > 80% -> Increase
    // If streak < 3 AND weeklyScore < 50% -> Decrease

    if (streak > 7 && weeklyScore > 80) {
        if (currentDifficulty === "Easy") return "Medium";
        if (currentDifficulty === "Medium") return "Hard";
    }

    if (streak < 3 && weeklyScore < 50) {
        if (currentDifficulty === "Hard") return "Medium";
        if (currentDifficulty === "Medium") return "Easy";
    }

    return currentDifficulty;
}

export function recommendTopics(userProgress: UserProgress): string[] {
    // Simple logic: return topics with low scores
    return Object.entries(userProgress.topicScores)
        .filter(([_, score]) => score < 60)
        .map(([topic]) => topic);
}
