"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useRoadmap } from "@/context/RoadmapContext";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChevronDown, ChevronRight, CheckCircle2, Circle, Clock, Calendar, BookOpen, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function RoadmapPage() {
    const params = useParams();
    const router = useRouter();
    const { userRoadmap, toggleTopicCompletion } = useRoadmap();
    const [expandedMonths, setExpandedMonths] = useState<number[]>([1]); // Default expand first month

    // Handle initial loading or missing roadmap
    useEffect(() => {
        // If no roadmap exists, or domain mismatch (though we might allow viewing history later), redirect
        // For now, if no roadmap, go to dashboard or roadmaps to generate one
        const timeout = setTimeout(() => {
            if (!userRoadmap) {
                // router.push("/roadmaps"); // Uncomment to enforce redirect
            }
        }, 1000);
        return () => clearTimeout(timeout);
    }, [userRoadmap, router]);

    if (!userRoadmap) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
                    <AlertCircle className="h-12 w-12 text-slate-500 mb-4" />
                    <h2 className="text-2xl font-bold text-white mb-2">No Roadmap Found</h2>
                    <p className="text-slate-400 mb-6">You haven't generated a roadmap for this domain yet.</p>
                    <Button onClick={() => router.push("/roadmaps")}>Create Roadmap</Button>
                </div>
            </div>
        );
    }

    const { domain, monthlyPlan, totalMonths } = userRoadmap;

    // Calculate Progress
    const totalTopics = monthlyPlan.flatMap(m => m.modules.flatMap(mod => mod.topics)).length;
    const completedTopics = monthlyPlan.flatMap(m => m.modules.flatMap(mod => mod.topics)).filter(t => t.isCompleted).length;
    const progressPercentage = Math.round((completedTopics / totalTopics) * 100) || 0;

    const toggleMonth = (month: number) => {
        setExpandedMonths(prev =>
            prev.includes(month) ? prev.filter(m => m !== month) : [...prev, month]
        );
    };

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col">
            <Navbar />

            <main className="container mx-auto py-8 px-4 flex-1 max-w-5xl">

                {/* Header / Overview */}
                <div className="mb-10 space-y-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                <span className="text-blue-500">{domain}</span> Mastery Path
                            </h1>
                            <div className="flex items-center gap-4 text-slate-400 text-sm">
                                <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {totalMonths} Months Timeline</span>
                                <span className="flex items-center gap-1"><BookOpen className="h-4 w-4" /> {totalTopics} Topics</span>
                            </div>
                        </div>
                        <Card className="bg-slate-900 border-slate-800 w-full md:w-64">
                            <CardContent className="p-4">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-slate-400">Progress</span>
                                    <span className="text-white font-mono">{progressPercentage}%</span>
                                </div>
                                <Progress value={progressPercentage} className="h-2" />
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Timeline */}
                <div className="space-y-6">
                    {monthlyPlan.map((monthPlan) => (
                        <div key={monthPlan.month} className="relative pl-8 md:pl-0">
                            {/* Vertical Line for Desktop */}
                            <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-800 hidden md:block -translate-x-1/2 md:left-8"></div>

                            <Card className={cn(
                                "border-slate-800 bg-slate-900/50 transition-all duration-300 overflow-hidden",
                                monthPlan.status === "locked" ? "opacity-60 grayscale" : "hover:border-slate-700"
                            )}>
                                {/* Month Header */}
                                <div
                                    className="p-4 md:p-6 flex items-center justify-between cursor-pointer group"
                                    onClick={() => toggleMonth(monthPlan.month)}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={cn(
                                            "h-10 w-10 md:h-12 md:w-12 rounded-full flex items-center justify-center font-bold text-lg shadow-lg z-10 shrink-0",
                                            monthPlan.status === "completed" ? "bg-green-500 text-white" :
                                                monthPlan.status === "active" ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-500"
                                        )}>
                                            {monthPlan.month}
                                        </div>
                                        <div>
                                            <h3 className={cn("text-lg md:text-xl font-semibold", monthPlan.status === "active" ? "text-white" : "text-slate-300")}>
                                                Month {monthPlan.month}: {monthPlan.title}
                                            </h3>
                                            <p className="text-sm text-slate-500">{monthPlan.modules.length} Modules • ~{monthPlan.modules.reduce((acc, m) => acc + m.estimatedHours, 0)} Hours</p>
                                        </div>
                                    </div>
                                    <ChevronDown className={cn("h-5 w-5 text-slate-500 transition-transform duration-300", expandedMonths.includes(monthPlan.month) ? "rotate-180" : "")} />
                                </div>

                                {/* Modules & Topics */}
                                <div className={cn(
                                    "grid transition-all duration-300 ease-in-out",
                                    expandedMonths.includes(monthPlan.month) ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                )}>
                                    <div className="overflow-hidden">
                                        <div className="p-4 md:p-6 pt-0 space-y-4">
                                            {monthPlan.modules.map((module, modIdx) => (
                                                <div key={module.id} className="bg-slate-950/50 rounded-lg p-4 border border-slate-800/50">
                                                    <div className="flex justify-between items-start mb-3">
                                                        <h4 className="font-medium text-slate-200">{module.title}</h4>
                                                        <span className="text-xs text-slate-500 flex items-center gap-1 bg-slate-900 px-2 py-1 rounded">
                                                            <Clock className="h-3 w-3" /> {module.estimatedHours}h
                                                        </span>
                                                    </div>
                                                    <div className="space-y-2">
                                                        {module.topics.map((topic) => (
                                                            <div
                                                                key={topic.id}
                                                                className="flex items-start gap-3 p-2 rounded hover:bg-slate-900/50 transition-colors cursor-pointer group/topic"
                                                                onClick={() => toggleTopicCompletion(topic.id)}
                                                            >
                                                                <div className={cn(
                                                                    "mt-0.5 transition-colors",
                                                                    topic.isCompleted ? "text-green-500" : "text-slate-600 group-hover/topic:text-slate-500"
                                                                )}>
                                                                    {topic.isCompleted ? <CheckCircle2 className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
                                                                </div>
                                                                <div className="flex-1">
                                                                    <p className={cn("text-sm transition-colors", topic.isCompleted ? "text-slate-500 line-through" : "text-slate-300")}>
                                                                        {topic.title}
                                                                    </p>
                                                                    <span className="text-[10px] uppercase tracking-wider text-slate-600 font-medium">{topic.type}</span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>

            </main>
        </div>
    );
}
