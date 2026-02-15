export interface Subject {
    name: string;
    category: string;
    icon: string;
    difficulty: "Beginner" | "Intermediate" | "Advanced";
    demand: "High" | "Medium" | "Low";
}

export const subjects: Subject[] = [
    // AI & Data
    {
        name: "GenAI",
        category: "AI & Data",
        icon: "🧠",
        difficulty: "Intermediate",
        demand: "High"
    },
    {
        name: "Machine Learning",
        category: "AI & Data",
        icon: "🤖",
        difficulty: "Advanced",
        demand: "High"
    },
    {
        name: "Data Science",
        category: "AI & Data",
        icon: "📊",
        difficulty: "Intermediate",
        demand: "High"
    },
    {
        name: "Deep Learning",
        category: "AI & Data",
        icon: "🕸️",
        difficulty: "Advanced",
        demand: "High"
    },
    {
        name: "Computer Vision",
        category: "AI & Data",
        icon: "👁️",
        difficulty: "Advanced",
        demand: "Medium"
    },
    {
        name: "NLP (Natural Language Processing)",
        category: "AI & Data",
        icon: "🗣️",
        difficulty: "Advanced",
        demand: "High"
    },
    {
        name: "Data Analytics for Business",
        category: "AI & Data",
        icon: "📈",
        difficulty: "Beginner",
        demand: "High"
    },

    // Software Development
    {
        name: "Web Development",
        category: "Software Development",
        icon: "🌐",
        difficulty: "Beginner",
        demand: "High"
    },
    {
        name: "Mobile App Development",
        category: "Software Development",
        icon: "📱",
        difficulty: "Intermediate",
        demand: "High"
    },
    {
        name: "Game Development",
        category: "Software Development",
        icon: "🎮",
        difficulty: "Intermediate",
        demand: "Medium"
    },
    {
        name: "DevOps",
        category: "Software Development",
        icon: "♾️",
        difficulty: "Intermediate",
        demand: "High"
    },
    {
        name: "AR/VR Development",
        category: "Software Development",
        icon: "👓",
        difficulty: "Advanced",
        demand: "Medium"
    },

    // Infrastructure & Cloud
    {
        name: "Cloud Computing",
        category: "Infrastructure & Cloud",
        icon: "☁️",
        difficulty: "Intermediate",
        demand: "High"
    },
    {
        name: "Cybersecurity",
        category: "Infrastructure & Cloud",
        icon: "🔒",
        difficulty: "Intermediate",
        demand: "High"
    },
    {
        name: "Blockchain & Web3",
        category: "Infrastructure & Cloud",
        icon: "⛓️",
        difficulty: "Advanced",
        demand: "Medium"
    },
    {
        name: "IoT (Internet of Things)",
        category: "Infrastructure & Cloud",
        icon: "📡",
        difficulty: "Intermediate",
        demand: "Medium"
    },
    {
        name: "Edge Computing",
        category: "Infrastructure & Cloud",
        icon: "⚡",
        difficulty: "Advanced",
        demand: "Medium"
    },

    // Emerging Technologies
    {
        name: "Quantum Computing",
        category: "Emerging Technologies",
        icon: "⚛️",
        difficulty: "Advanced",
        demand: "High"
    },
    {
        name: "Robotics & Automation",
        category: "Emerging Technologies",
        icon: "🤖",
        difficulty: "Advanced",
        demand: "Medium"
    },
    {
        name: "Bioinformatics",
        category: "Emerging Technologies",
        icon: "🧬",
        difficulty: "Advanced",
        demand: "Medium"
    },
    {
        name: "Space Technology",
        category: "Emerging Technologies",
        icon: "🚀",
        difficulty: "Advanced",
        demand: "Low"
    },
    {
        name: "Neurotechnology",
        category: "Emerging Technologies",
        icon: "🧠",
        difficulty: "Advanced",
        demand: "High"
    },

    // Business & Tech
    {
        name: "Product Management",
        category: "Business & Tech",
        icon: "📦",
        difficulty: "Beginner",
        demand: "High"
    },
    {
        name: "Financial Technology (FinTech)",
        category: "Business & Tech",
        icon: "💳",
        difficulty: "Intermediate",
        demand: "High"
    },
    {
        name: "Tech Entrepreneurship",
        category: "Business & Tech",
        icon: "🚀",
        difficulty: "Intermediate",
        demand: "High"
    },
    {
        name: "AI Product Management",
        category: "Business & Tech",
        icon: "🤖",
        difficulty: "Intermediate",
        demand: "High"
    }
];

export const getSubjectsByCategory = () => {
    const grouped: Record<string, Subject[]> = {};
    subjects.forEach(subject => {
        if (!grouped[subject.category]) {
            grouped[subject.category] = [];
        }
        grouped[subject.category].push(subject);
    });
    return grouped;
};
