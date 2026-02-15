import { Roadmap, UserProfile } from "@/types";

export const roadmaps: Roadmap[] = [
    {
        id: "1",
        title: "Generative AI (GenAI)",
        description: "Master LLMs, Transformers, RAG pipelines, and prompt engineering.",
        category: "GenAI",
        difficulty: "Advanced",
        duration: "6 Months",
        rating: 4.9,
        skills: ["Python", "PyTorch", "Transformers", "LangChain", "OpenAI API", "RAG"],
        steps: []
    },
    {
        id: "2",
        title: "Data Science Specialization",
        description: "Analyze vast datasets, build predictive models, and visualize insights.",
        category: "Data Science",
        difficulty: "Intermediate",
        duration: "8 Months",
        rating: 4.7,
        skills: ["Python", "Pandas", "NumPy", "Scikit-Learn", "Matplotlib", "SQL"],
        steps: []
    },
    {
        id: "3",
        title: "Machine Learning Ops (MLOps)",
        description: "End-to-end ML model development, deployment, and monitoring.",
        category: "Machine Learning",
        difficulty: "Advanced",
        duration: "7 Months",
        rating: 4.8,
        skills: ["TensorFlow", "Keras", "Docker", "Kubernetes", "MLflow", "CI/CD"],
        steps: []
    },
    {
        id: "4",
        title: "Full Stack Web Development",
        description: "Build modern, scalable web applications from scratch.",
        category: "Web Development",
        difficulty: "Beginner",
        duration: "6 Months",
        rating: 4.8,
        skills: ["HTML", "CSS", "React", "Next.js", "Node.js", "PostgreSQL"],
        steps: []
    },
    {
        id: "5",
        title: "Cybersecurity Analyst",
        description: "Learn network security, ethical hacking, and threat mitigation.",
        category: "Cybersecurity",
        difficulty: "Intermediate",
        duration: "6 Months",
        rating: 4.6,
        skills: ["Linux", "Networking", "Python", "Ethical Hacking", "Cryptography"],
        steps: []
    },
    {
        id: "6",
        title: "Cloud Computing Architect",
        description: "Design and manage scalable cloud infrastructure on AWS/Azure.",
        category: "Cloud Computing",
        difficulty: "Intermediate",
        duration: "6 Months",
        rating: 4.7,
        skills: ["AWS", "Azure", "Docker", "Terraform", "Microservices"],
        steps: []
    }
];

export const mockUser: UserProfile = {
    name: "Aditya",
    // Basic Info
    primaryGoal: "GenAI", // Updated to Subject
    currentSkillLevel: "intermediate",
    dailyLearningTime: 4,

    // Educational Details
    educationLevel: "B.Tech",
    fieldOfStudy: "Computer Science",
    yearOfStudy: "3rd Year",

    // Technical Background
    hasProgrammingExperience: true,
    knownLanguages: ["Python", "JavaScript"],

    // Learning Preferences
    learningStyle: ["Projects", "Documentation"],
    deviceAccess: "laptop",

    // Goal Planning
    goalTimeline: "6 Months",
    isPreparingForPlacements: true,
    placementFocus: ["DSA", "System Design"],

    // App State
    completedRoadmaps: [],
    savedRoadmaps: ["1"],
    currentRoadmapId: "1"
};

export const careerInsights = [
    {
        role: "AI Engineer",
        avgSalary: "₹12,00,000 - ₹25,00,000",
        demand: "Very High",
        skills: ["Python", "PyTorch", "LLMs"]
    },
    {
        role: "Full Stack Developer",
        avgSalary: "₹6,00,000 - ₹15,00,000",
        demand: "High",
        skills: ["React", "Node.js", "SQL"]
    }
];
