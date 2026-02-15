export interface Topic {
    id: string;
    title: string;
    type: "video" | "article" | "project" | "quiz";
    estimatedMinutes?: number; // Default ~30-60 if missing
    isCompleted?: boolean;
}

export interface RoadmapModule {
    id: string;
    title: string;
    description: string;
    estimatedHours: number;
    difficulty: "Beginner" | "Intermediate" | "Advanced";
    topics: Topic[];
}

export interface RoadmapTemplate {
    domain: string;
    description: string;
    modules: RoadmapModule[];
}

export const ROADMAP_TEMPLATES: Record<string, RoadmapTemplate> = {
    "GenAI": {
        domain: "GenAI",
        description: "Master Generative AI, LLMs, and Prompt Engineering.",
        modules: [
            {
                id: "m1",
                title: "Fundamentals of AI & Python",
                description: "Core concepts of Artificial Intelligence and Python programming.",
                estimatedHours: 40,
                difficulty: "Beginner",
                topics: [
                    { id: "t1", title: "Introduction to AI/ML", type: "article", estimatedMinutes: 45 },
                    { id: "t2", title: "Python Basics for Data Science", type: "video", estimatedMinutes: 120 },
                    { id: "t3", title: "NumPy & Pandas Essentials", type: "project", estimatedMinutes: 180 },
                    { id: "t3.1", title: "Data Visualization with Matplotlib", type: "video", estimatedMinutes: 90 },
                    { id: "t3.2", title: "Statistics for AI", type: "article", estimatedMinutes: 60 }
                ]
            },
            {
                id: "m2",
                title: "Machine Learning Basics",
                description: "Supervised and Unsupervised Learning algorithms.",
                estimatedHours: 50,
                difficulty: "Beginner",
                topics: [
                    { id: "t4", title: "Linear & Logistic Regression", type: "video", estimatedMinutes: 90 },
                    { id: "t5", title: "Decision Trees & Random Forests", type: "article", estimatedMinutes: 60 },
                    { id: "t6", title: "Scikit-Learn Mini-Project", type: "project", estimatedMinutes: 240 },
                    { id: "t6.1", title: "K-Means Clustering", type: "video", estimatedMinutes: 75 },
                    { id: "t6.2", title: "Model Evaluation Metrics", type: "article", estimatedMinutes: 45 }
                ]
            },
            {
                id: "m3",
                title: "Deep Learning Foundations",
                description: "Neural Networks and Backpropagation.",
                estimatedHours: 60,
                difficulty: "Intermediate",
                topics: [
                    { id: "t7", title: "Neural Networks Architecture", type: "video", estimatedMinutes: 120 },
                    { id: "t8", title: "TensorFlow/PyTorch Basics", type: "video", estimatedMinutes: 150 },
                    { id: "t9", title: "Building a Simple NN", type: "project", estimatedMinutes: 300 },
                    { id: "t9.1", title: "Backpropagation Logic", type: "article", estimatedMinutes: 60 }
                ]
            },
            {
                id: "m4",
                title: "Natural Language Processing (NLP)",
                description: "Text processing and language modeling.",
                estimatedHours: 55,
                difficulty: "Intermediate",
                topics: [
                    { id: "t10", title: "Tokenization & Embeddings", type: "article", estimatedMinutes: 60 },
                    { id: "t11", title: "RNNs and LSTMs", type: "video", estimatedMinutes: 90 },
                    { id: "t12", title: "Transformers Architecture", type: "video", estimatedMinutes: 120 },
                    { id: "t12.1", title: "Attention Mechanism", type: "article", estimatedMinutes: 45 }
                ]
            },
            {
                id: "m5",
                title: "Large Language Models (LLMs)",
                description: "Working with state-of-the-art LLMs.",
                estimatedHours: 70,
                difficulty: "Advanced",
                topics: [
                    { id: "t13", title: "BERT, GPT, and T5", type: "article", estimatedMinutes: 90 },
                    { id: "t14", title: "Prompt Engineering Guide", type: "video", estimatedMinutes: 120 },
                    { id: "t15", title: "Fine-tuning LLMs", type: "project", estimatedMinutes: 360 },
                    { id: "t15.1", title: "LoRA & PEFT", type: "video", estimatedMinutes: 90 }
                ]
            },
            {
                id: "m6",
                title: "GenAI Applications",
                description: "Building real-world GenAI apps.",
                estimatedHours: 65,
                difficulty: "Advanced",
                topics: [
                    { id: "t16", title: "LangChain Framework", type: "video", estimatedMinutes: 150 },
                    { id: "t17", title: "RAG (Retrieval Augmented Generation)", type: "project", estimatedMinutes: 300 },
                    { id: "t18", title: "Building an AI Agent", type: "project", estimatedMinutes: 420 },
                    { id: "t18.1", title: "Vector Databases (Pinecone/Chroma)", type: "article", estimatedMinutes: 60 }
                ]
            }
        ]
    },
    "Data Science": {
        domain: "Data Science",
        description: "Analyze vast datasets, build predictive models, and visualize insights.",
        modules: [
            {
                id: "ds1",
                title: "Data Analysis with Python",
                description: "Master Pandas and NumPy for data manipulation.",
                estimatedHours: 35,
                difficulty: "Beginner",
                topics: [
                    { id: "dst1", title: "Python for Data Analysis", type: "video", estimatedMinutes: 120 },
                    { id: "dst2", title: "Pandas DataFrame Mastery", type: "project", estimatedMinutes: 240 },
                    { id: "dst3", title: "NumPy Vectorization", type: "article", estimatedMinutes: 60 }
                ]
            },
            {
                id: "ds2",
                title: "Data Visualization",
                description: "Tell stories with data using Matplotlib and Seaborn.",
                estimatedHours: 25,
                difficulty: "Beginner",
                topics: [
                    { id: "dst4", title: "Matplotlib Fundamentals", type: "video", estimatedMinutes: 90 },
                    { id: "dst5", title: "Advanced Seaborn Plots", type: "article", estimatedMinutes: 60 },
                    { id: "dst6", title: "Dashboard Creation Project", type: "project", estimatedMinutes: 180 }
                ]
            },
            {
                id: "ds3",
                title: "Statistical Analysis",
                description: "Probability and Hypothesis Testing.",
                estimatedHours: 40,
                difficulty: "Intermediate",
                topics: [
                    { id: "dst7", title: "Probability Distributions", type: "video", estimatedMinutes: 120 },
                    { id: "dst8", title: "Hypothesis Testing (A/B Testing)", type: "project", estimatedMinutes: 240 },
                    { id: "dst9", title: "Bayesian Statistics", type: "article", estimatedMinutes: 90 }
                ]
            },
            {
                id: "ds4",
                title: "Machine Learning for Data Science",
                description: "Predictive modeling and classification.",
                estimatedHours: 55,
                difficulty: "Intermediate",
                topics: [
                    { id: "dst10", title: "Feature Engineering", type: "video", estimatedMinutes: 120 },
                    { id: "dst11", title: "Supervised Learning Algorithms", type: "video", estimatedMinutes: 180 },
                    { id: "dst12", title: "Customer Churn Prediction Project", type: "project", estimatedMinutes: 360 }
                ]
            }
        ]
    },
    // Fallback/Default Template for other domains
    "Default": {
        domain: "General Tech",
        description: "A foundational path for technology mastery.",
        modules: [
            {
                id: "dm1",
                title: "Computer Science Fundamentals",
                description: "Basics of computing and logic.",
                estimatedHours: 35,
                difficulty: "Beginner",
                topics: [
                    { id: "dt1", title: "How Computers Work", type: "video", estimatedMinutes: 45 },
                    { id: "dt1.1", title: "Binary & Logic Gates", type: "article", estimatedMinutes: 30 }
                ]
            },
            {
                id: "dm2",
                title: "Programming Basics",
                description: "Writing your first code.",
                estimatedHours: 45,
                difficulty: "Beginner",
                topics: [
                    { id: "dt2", title: "Variables & Loops", type: "project", estimatedMinutes: 120 },
                    { id: "dt2.1", title: "Functions & Scope", type: "video", estimatedMinutes: 60 }
                ]
            }
        ]
    }
};
