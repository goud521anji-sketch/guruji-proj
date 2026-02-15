export interface RoadmapStep {
    id: string;
    title: string;
    description: string;
    status: 'pending' | 'in-progress' | 'completed';
    resources: Resource[];
    estimatedHours: number;
}

export interface Resource {
    id: string;
    title: string;
    url: string;
    type: 'video' | 'article' | 'course' | 'doc';
    platform?: string;
}

export interface Roadmap {
    id: string;
    title: string;
    description: string;
    category: string; // 'Web Dev', 'AI/ML', etc.
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    duration: string; // e.g., "3 Months"
    rating: number;
    steps: RoadmapStep[];
    skills: string[];
}

export interface UserProfile {
    name: string;
    // Basic Info
    primaryGoal: string; // 'Web Developer', 'AI/ML Engineer', etc.
    currentSkillLevel: 'beginner' | 'intermediate' | 'advanced';
    dailyLearningTime: number; // hours

    // Educational Details
    educationLevel: string; // '10th', '12th', 'B.Tech', etc.
    fieldOfStudy?: string; // 'Computer Science', 'ECE', etc.
    yearOfStudy?: string; // '1st Year', 'Final Year', etc.

    // Technical Background
    hasProgrammingExperience: boolean;
    knownLanguages: string[]; // ['Java', 'Python']

    // Learning Preferences
    learningStyle: string[]; // ['Videos', 'Articles']
    deviceAccess: 'mobile' | 'laptop' | 'both';

    // Goal Planning
    goalTimeline: string; // '3 Months', '1 Year'
    isPreparingForPlacements: boolean;
    placementFocus?: string[]; // ['DSA', 'Aptitude']

    // App State
    completedRoadmaps: string[];
    savedRoadmaps: string[];
    currentRoadmapId?: string;
}

export interface DayPlan {
    day: number;
    topic: string;
    isCompleted: boolean;
}
