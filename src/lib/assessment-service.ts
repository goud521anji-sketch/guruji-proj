import { UserProgress, Question, Difficulty } from "@/types/assessment";
import { calculateNewDifficulty } from "./adaptive-difficulty";

const STORAGE_KEY = "guruji_assessment_progress";

const DEFAULT_PROGRESS: UserProgress = {
    userId: "guest",
    domain: "GenAI", // Default
    streakCount: 0,
    lastActiveDate: null,
    weeklyScore: 0,
    completedQuestions: [],
    skillLevelEstimate: "Easy",
    topicScores: {}
};

export const AssessmentService = {
    getProgress: (): UserProgress => {
        if (typeof window === "undefined") return DEFAULT_PROGRESS;
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : DEFAULT_PROGRESS;
    },

    saveProgress: (progress: UserProgress) => {
        if (typeof window === "undefined") return;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    },

    // Daily Question Logic
    submitDailyAnswer: (isCorrect: boolean) => {
        const progress = AssessmentService.getProgress();
        const today = new Date().toISOString().split("T")[0];

        // Check if already answered today to prevent double streak
        if (progress.lastActiveDate === today) {
            // Already active today, just return (or maybe update stats but not streak)
            return progress;
        }

        if (isCorrect) {
            progress.streakCount += 1;
        } else {
            progress.streakCount = 0; // Reset on wrong answer as per rules
        }

        progress.lastActiveDate = today;
        AssessmentService.saveProgress(progress);
        return progress;
    },

    checkStreakMaintenance: () => {
        const progress = AssessmentService.getProgress();
        if (!progress.lastActiveDate) return;

        const today = new Date();
        const lastActive = new Date(progress.lastActiveDate);
        const diffDays = Math.floor((today.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));

        if (diffDays > 1) {
            // Missed a day
            progress.streakCount = 0;
            AssessmentService.saveProgress(progress);
        }
    },

    updateWeeklyScore: (score: number) => {
        const progress = AssessmentService.getProgress();
        progress.weeklyScore = score;

        // Update difficulty based on new score
        progress.skillLevelEstimate = calculateNewDifficulty(
            progress.skillLevelEstimate,
            score,
            progress.streakCount
        );

        AssessmentService.saveProgress(progress);
        return progress;
    },

    updateDomain: (domain: string) => {
        const progress = AssessmentService.getProgress();
        progress.domain = domain;
        AssessmentService.saveProgress(progress);
    }
};
