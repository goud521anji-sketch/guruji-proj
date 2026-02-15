"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Bot, Sparkles, Loader2 } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AIPlannerPage() {
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim()) return;

        setLoading(true);
        // Simulate AI delay
        setTimeout(() => {
            setResult({
                title: `Custom Roadmap: ${prompt}`,
                steps: [
                    "Phase 1: Foundations & Basics (Week 1-2)",
                    "Phase 2: Core Concepts & Practice (Week 3-5)",
                    "Phase 3: Advanced Topics & Projects (Week 6-8)",
                    "Phase 4: Final Project & Review (Week 9-12)"
                ]
            });
            setLoading(false);
        }, 2000);
    };

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col">
                <Navbar />
                <main className="container mx-auto py-12 px-4 flex-1 max-w-3xl">
                    <div className="text-center mb-10 space-y-4">
                        <div className="inline-flex items-center justify-center p-3 bg-purple-900/30 rounded-full mb-4">
                            <Bot className="h-8 w-8 text-purple-400" />
                        </div>
                        <h1 className="text-4xl font-bold text-white">AI Roadmap Generator</h1>
                        <p className="text-slate-400 text-lg">
                            Describe your learning goal, and our AI will craft a personalized path for you.
                        </p>
                    </div>

                    <Card className="p-6 mb-8 bg-slate-900 border-slate-800">
                        <form onSubmit={handleGenerate} className="flex gap-4">
                            <Input
                                placeholder="e.g., I want to learn Data Analysis with Python in 3 months..."
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                className="flex-1 h-12 text-lg bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:ring-purple-500"
                            />
                            <Button type="submit" size="lg" disabled={loading || !prompt} className="gap-2 bg-purple-600 hover:bg-purple-700 text-white">
                                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5" />}
                                Generate
                            </Button>
                        </form>
                    </Card>

                    {result && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h2 className="text-2xl font-bold flex items-center gap-2 text-white">
                                <Sparkles className="h-5 w-5 text-yellow-500" />
                                Your Custom Plan
                            </h2>
                            <div className="space-y-4">
                                {result.steps.map((step: string, i: number) => (
                                    <Card key={i} className="bg-slate-900 border-l-4 border-l-purple-500 border-y-slate-800 border-r-slate-800">
                                        <CardContent className="p-4 font-medium text-lg text-slate-200">
                                            {step}
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                            <div className="flex justify-center mt-8">
                                <Button variant="outline" onClick={() => { setPrompt(""); setResult(null); }} className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
                                    Create Another
                                </Button>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </ProtectedRoute>
    );
}
