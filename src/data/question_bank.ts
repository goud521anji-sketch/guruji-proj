import { Question } from "@/types/assessment";

export const QUESTION_BANK: Question[] = [
    // --- GENAI ---
    {
        id: "genai-1",
        domain: "GenAI",
        topic: "LLMs",
        difficulty: "Easy",
        type: "Daily",
        question: "What does 'LLM' stand for?",
        options: ["Large Language Model", "Long Learning Machine", "Logits Language Map", "Low Latency Model"],
        correctAnswer: 0,
        explanation: "LLM stands for Large Language Model, a type of AI model designed to understand and generate human language."
    },
    {
        id: "genai-2",
        domain: "GenAI",
        topic: "Transformers",
        difficulty: "Medium",
        type: "Daily",
        question: "Which mechanism allows Transformers to process input data in parallel?",
        options: ["Recurrent Layers", "Self-Attention", "Convolution", "Gradient Descent"],
        correctAnswer: 1,
        explanation: "Self-Attention allows the model to weigh the importance of different words in a sentence simultaneously, enabling parallel processing."
    },
    {
        id: "genai-3",
        domain: "GenAI",
        topic: "Prompt Engineering",
        difficulty: "Easy",
        type: "Daily",
        question: "What is 'Chain-of-Thought' prompting?",
        options: ["Repeating the prompt", "Asking the model to explain its reasoning step-by-step", "Connecting multiple models", "Using a chain of different languages"],
        correctAnswer: 1,
        explanation: "Chain-of-Thought prompting encourages the model to break down complex problems into intermediate reasoning steps."
    },
    {
        id: "genai-4",
        domain: "GenAI",
        topic: "RAG",
        difficulty: "Hard",
        type: "Weekly",
        question: "In a RAG pipeline, what is the role of the 'Retriever'?",
        options: ["To generate the final answer", "To fetch relevant documents from a knowledge base", "To tokenize the input", "To fine-tune the model"],
        correctAnswer: 1,
        explanation: "The Retriever searches a vector database or knowledge base to find context relevant to the user's query before generation."
    },

    // --- WEB DEVELOPMENT ---
    {
        id: "web-1",
        domain: "Web Development",
        topic: "React",
        difficulty: "Easy",
        type: "Daily",
        question: "Which hook is used to handle side effects in functional components?",
        options: ["useState", "useEffect", "useContext", "useReducer"],
        correctAnswer: 1,
        explanation: "useEffect is designed to perform side effects like data fetching, subscriptions, or manual DOM manipulations."
    },
    {
        id: "web-2",
        domain: "Web Development",
        topic: "Next.js",
        difficulty: "Medium",
        type: "Daily",
        question: "What is the default rendering method for pages in Next.js (App Router)?",
        options: ["Client Side Rendering (CSR)", "Server Side Rendering (SSR)", "Static Site Generation (SSG)", "Incremental Static Regeneration (ISR)"],
        correctAnswer: 1,
        explanation: "In the App Router, components are Server Components by default, meaning they are rendered on the server."
    },
    {
        id: "web-3",
        domain: "Web Development",
        topic: "CSS",
        difficulty: "Easy",
        type: "Daily",
        question: "What property is used to change the text color of an element?",
        options: ["font-color", "text-style", "color", "background-color"],
        correctAnswer: 2,
        explanation: "The 'color' property in CSS sets the foreground color of an element's text content."
    },

    // --- DATA SCIENCE ---
    {
        id: "ds-1",
        domain: "Data Science",
        topic: "Pandas",
        difficulty: "Easy",
        type: "Daily",
        question: "Which Pandas function is used to read a CSV file?",
        options: ["pd.read_csv()", "pd.load_csv()", "pd.import_csv()", "pd.csv_read()"],
        correctAnswer: 0,
        explanation: "pd.read_csv() is the standard function to load data from a CSV file into a DataFrame."
    },
    {
        id: "ds-2",
        domain: "Data Science",
        topic: "Statistics",
        difficulty: "Medium",
        type: "Weekly",
        question: "What does the 'p-value' indicate in hypothesis testing?",
        options: ["The probability that the null hypothesis is true", "The probability of observing the data given the null hypothesis is true", " The confirmed accuracy of the test", "The error rate of the model"],
        correctAnswer: 1,
        explanation: "The p-value measures the evidence against the null hypothesis; a lower p-value indicates stronger evidence against it."
    },

    // --- CLOUD COMPUTING ---
    {
        id: "cloud-1",
        domain: "Cloud Computing",
        topic: "AWS",
        difficulty: "Easy",
        type: "Daily",
        question: "What service provides virtual servers in the cloud in AWS?",
        options: ["S3", "EC2", "Lambda", "RDS"],
        correctAnswer: 1,
        explanation: "Amazon EC2 (Elastic Compute Cloud) provides scalable virtual servers."
    },
    {
        id: "cloud-2",
        domain: "Cloud Computing",
        topic: "Docker",
        difficulty: "Medium",
        type: "Daily",
        question: "What is the command to build a Docker image from a Dockerfile?",
        options: ["docker create", "docker run", "docker build", "docker image make"],
        correctAnswer: 2,
        explanation: "'docker build' reads the Dockerfile in the specified directory and creates an image."
    }
];
