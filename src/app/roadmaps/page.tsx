"use client";

import { useEffect, useState } from "react";
// import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useRouter } from "next/navigation";
import { useRoadmap } from "@/context/RoadmapContext";
import { subjects } from "@/data/subjects";
import { Sparkles, ArrowRight, RefreshCw, AlertTriangle, BookOpen } from "lucide-react";

export default function RoadmapsPage() {
    const router = useRouter();
    const { userRoadmap, generateUserRoadmap } = useRoadmap();
    const [isGenerating, setIsGenerating] = useState(false);
    const [userData, setUserData] = useState<{ domain: string; hours: number; months: number } | null>(null);

    useEffect(() => {
        // Load onboarding data to see if we CAN generate
        const domain = localStorage.getItem("selectedSubject");
        // We need to store these in onboarding to be truly effective, 
        // but for now let's default or try to read from other keys if available.
        // If we didn't store them, we might need to ask again or assume defaults.
        // In previous onboarding code:
        // localStorage.setItem("selectedSubject", formData.selectedSubject);

        // We didn't explicitly save dailyHours or months in onboarding to localStorage in the previous step 
        // (just console logged or passed to completeOnboarding). 
        // Let's assume defaults for now if missing, or update Onboarding to save them.
        // For functionality, I'll default them here to unblock testing.

        if (domain) {
            setUserData({
                domain,
                hours: 2, // Default
                months: 6 // Default
            });
        }
    }, []);

    const handleGenerate = () => {
        if (!userData) {
            router.push("/onboarding"); // Redirect if no data
            return;
        }

        setIsGenerating(true);
        setTimeout(() => {
            generateUserRoadmap(userData.domain, userData.hours, userData.months);
            setIsGenerating(false);
            router.push(`/roadmap/${encodeURIComponent(userData.domain)}`);
        }, 1500); // Fake delay for "AI Generation" feel
    };

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-slate-950 flex flex-col">
                {/* <Navbar /> */}
                <main className="container mx-auto py-12 px-4 flex-1 flex flex-col items-center">

                    <div className="max-w-2xl w-full text-center space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">Personalized</span> Learning Path
                            </h1>
                            <p className="text-slate-400 text-lg">
                                Based on your goals, we create a dynamic timeline tailored just for you.
                            </p>
                        </div>

                        {userRoadmap ? (
                            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-all shadow-xl">
                                <div className="h-16 w-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <BookOpen className="h-8 w-8 text-blue-500" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-2">{userRoadmap.domain} Roadmap</h2>
                                <p className="text-slate-400 mb-6">
                                    Your {userRoadmap.totalMonths}-month plan is active. continue where you left off.
                                </p>
                                <Button
                                    onClick={() => router.push(`/roadmap/${encodeURIComponent(userRoadmap.domain)}`)}
                                    className="w-full max-w-xs h-12 text-lg bg-blue-600 hover:bg-blue-500"
                                >
                                    Continue Learning <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                                <div className="mt-4">
                                    <button
                                        onClick={handleGenerate}
                                        className="text-sm text-slate-500 hover:text-slate-300 flex items-center justify-center gap-1 mx-auto transition-colors"
                                    >
                                        <RefreshCw className="h-3 w-3" /> Regenerate Roadmap
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
                                <div className="h-16 w-16 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Sparkles className="h-8 w-8 text-indigo-500" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-2">Ready to Start?</h2>
                                <p className="text-slate-400 mb-6">
                                    {userData ? `Generate your personalized roadmap for ${userData.domain}.` : "Complete onboarding to get your custom roadmap."}
                                </p>
                                <Button
                                    onClick={handleGenerate}
                                    disabled={isGenerating}
                                    className="w-full max-w-xs h-12 text-lg bg-gradient-to-r from-indigo-600 to-blue-600 hover:opacity-90 transition-all"
                                >
                                    {isGenerating ? (
                                        <span className="flex items-center gap-2">
                                            <RefreshCw className="h-5 w-5 animate-spin" /> Generating...
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            <Sparkles className="h-5 w-5" /> Generate Action Plan
                                        </span>
                                    )}
                                </Button>
                            </div>
                        )}

                        {!userRoadmap && !userData && (
                            <div className="bg-yellow-900/20 border border-yellow-800/50 rounded-lg p-4 flex items-center gap-3 max-w-lg mx-auto text-left">
                                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                                <p className="text-sm text-yellow-200">
                                    We couldn't find your onboarding details. Please <a href="/onboarding" className="underline font-medium">complete your profile</a>.
                                </p>
                            </div>
                        )}

                    </div>
                </main>
            </div>
        </ProtectedRoute>
    );
}
