"use client";

import { useRoadmap } from "@/context/RoadmapContext";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { CheckCircle2, Circle, Target, BookOpen, Clock, Trophy, Zap, CheckCircle, PlayCircle, ArrowRight, Award, AlertCircle, Flame } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

function StatsCard({ icon: Icon, label, value, trend, color }: any) {
    return (
        <Card className="bg-slate-800 border-slate-700 p-6">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-400">{label}</p>
                    <h3 className="text-2xl font-bold text-slate-200 mt-2">{value}</h3>
                </div>
                <div className={`p-2 rounded-lg bg-${color}-500/10`}>
                    <Icon className={`h-5 w-5 text-${color}-500`} />
                </div>
            </div>
            <p className="text-xs text-slate-500 mt-4">{trend}</p>
        </Card>
    );
}

export default function DashboardPage() {
    const router = useRouter();
    const { userRoadmap } = useRoadmap();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    if (!userRoadmap) {
        return (
            <div className="max-w-7xl mx-auto p-8 text-center bg-slate-900 rounded-xl border border-slate-800">
                <div className="h-20 w-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                    <BookOpen className="h-10 w-10 text-slate-500" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Welcome to Guruji</h2>
                <p className="text-slate-400 mb-6">You haven't set up a learning path yet.</p>
                <Button onClick={() => router.push("/onboarding")} className="bg-blue-600 hover:bg-blue-500">
                    Create My Learning Path
                </Button>
            </div>
        );
    }

    const { domain, monthlyPlan, dailyPlan } = userRoadmap;

    // Calculate Stats
    const totalTopics = monthlyPlan.flatMap((m: any) => m.modules.flatMap((mod: any) => mod.topics)).length;
    const completedTopics = monthlyPlan.flatMap((m: any) => m.modules.flatMap((mod: any) => mod.topics)).filter((t: any) => t.isCompleted).length;
    const progressPercentage = Math.round((completedTopics / totalTopics) * 100) || 0;

    // Find next/active content
    const activeMonth = monthlyPlan.find((m: any) => m.status === "active") || monthlyPlan[0];
    const currentModule = activeMonth.modules.find((m: any) => m.topics.some((t: any) => !t.isCompleted)) || activeMonth.modules[0];
    const nextTopic = currentModule?.topics.find((t: any) => !t.isCompleted);

    // Recent streak (mocked for now, but could be calculated from completed timestamps if we tracked them)
    const streakDays = 3;

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
                    <p className="text-slate-400">Track your progress and keep learning.</p>
                </div>
                <div className="flex gap-4">
                    <Card className="bg-slate-800 border-slate-700 p-4 flex items-center gap-3">
                        <div className="p-2 bg-amber-500/10 rounded-full">
                            <Target className="h-5 w-5 text-amber-500" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-400">Current Learning Domain</p>
                            <p className="font-semibold text-slate-200">{domain}</p>
                        </div>
                    </Card>
                </div>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    icon={BookOpen}
                    label="Topics Completed"
                    value={completedTopics}
                    trend={`${totalTopics - completedTopics} remaining`}
                    color="blue"
                />
                <StatsCard
                    icon={Clock}
                    label="Est. Hours Left"
                    value={Math.round((totalTopics - completedTopics) * 0.75)} // Rough estimate
                    trend="Based on roadmap"
                    color="purple"
                />
                <StatsCard
                    icon={Trophy}
                    label="Modules Active"
                    value={monthlyPlan.filter((m: any) => m.status === "active" || m.status === "completed").length}
                    trend={`Phase ${activeMonth.month}`}
                    color="amber"
                />
                <StatsCard
                    icon={Zap}
                    label="Current Streak"
                    value={`${streakDays} Days`}
                    trend="Keep it up!"
                    color="green"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Learning Path Progress */}
                <Card className="lg:col-span-2 bg-slate-800 border-slate-700">
                    <CardHeader>
                        <CardTitle className="text-white">Current Learning Path</CardTitle>
                        <CardDescription className="text-slate-400">{domain} Mastery</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-300">Overall Progress</span>
                                    <span className="font-medium text-blue-400">{progressPercentage}%</span>
                                </div>
                                <Progress value={progressPercentage} className="h-2 bg-slate-700" indicatorClassName="bg-blue-500" />
                            </div>

                            <div className="space-y-4">
                                {nextTopic ? (
                                    <div className="flex items-center gap-4 p-4 rounded-lg bg-blue-900/20 border border-blue-800/50">
                                        <div className="p-3 rounded-full bg-blue-900/40">
                                            <PlayCircle className="h-6 w-6 text-blue-400" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-xs text-blue-300 font-medium uppercase mb-1">Up Next</p>
                                            <h4 className="font-medium text-slate-200 text-lg">{nextTopic.title}</h4>
                                            <p className="text-sm text-slate-500">{currentModule.title} • {nextTopic.estimatedMinutes || 60} mins</p>
                                        </div>
                                        <Button asChild className="bg-blue-600 hover:bg-blue-500">
                                            <Link href="/learning-path">Resume</Link>
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="p-4 rounded-lg bg-green-900/20 border border-green-800/50 flex items-center gap-3">
                                        <CheckCircle2 className="h-6 w-6 text-green-400" />
                                        <div>
                                            <h4 className="font-medium text-green-100">All caught up!</h4>
                                            <p className="text-sm text-green-200/60">You've completed all currently planned topics.</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Activity / Next Steps */}
                <div className="space-y-6">
                    <Card className="bg-slate-800 border-slate-700">
                        <CardHeader>
                            <CardTitle className="text-white">Daily Challenge</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-4 rounded-lg bg-gradient-to-br from-orange-900/50 to-red-900/50 border border-orange-500/20">
                                <div className="flex gap-3 mb-2">
                                    <Flame className="h-5 w-5 text-orange-400" />
                                    <h4 className="font-semibold text-orange-100">Maintain Your Streak!</h4>
                                </div>
                                <p className="text-sm text-orange-200/80 mb-3">
                                    Answer today's question to keep your {streakDays}-day streak alive.
                                </p>
                                <Button size="sm" asChild className="w-full bg-orange-600 hover:bg-orange-500 text-white border-none">
                                    <Link href="/assessments">Answer Now</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-slate-800 border-slate-700">
                        <CardHeader>
                            <CardTitle className="text-white">Daily Streak</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between items-center mb-4">
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-white">{streakDays}</p>
                                    <p className="text-xs text-slate-400">Current Streak</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-slate-500">30</p>
                                    <p className="text-xs text-slate-400">Target Goal</p>
                                </div>
                            </div>
                            <div className="flex justify-between gap-1">
                                {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
                                    <div
                                        key={i}
                                        className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium border ${i < streakDays // Mocking active days
                                            ? "bg-green-500/20 border-green-500/50 text-green-500"
                                            : "bg-slate-900 border-slate-700 text-slate-500"
                                            }`}
                                    >
                                        {day}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
