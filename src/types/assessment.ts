export type Difficulty = "Easy" | "Medium" | "Hard";
export type QuestionType = "Daily" | "Weekly";

export interface Question {
    id: string;
    domain: string;
    topic: string;
    difficulty: Difficulty;
    type: QuestionType;
    question: string;
    options: string[];
    correctAnswer: number; // Index of correct option
    explanation: string;
}

export interface UserProgress {
    userId: string;
    domain: string;
    streakCount: number;
    lastActiveDate: string | null; // ISO Date string
    weeklyScore: number; // 0 to 100
    completedQuestions: string[]; // IDs of answered questions
    skillLevelEstimate: Difficulty;
    topicScores: Record<string, number>; // Topic -> score
}
