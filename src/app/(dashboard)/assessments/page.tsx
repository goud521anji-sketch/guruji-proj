"use client";

import { useRoadmap } from "@/context/RoadmapContext";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Clock, Target, ArrowRight, Zap, Brain, Code2, BookOpen } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { AssessmentService } from "@/lib/assessment-service"; // Start using the service
import { UserProgress } from "@/types/assessment";

export default function AssessmentsPage() {
    const { userRoadmap } = useRoadmap();
    const [progress, setProgress] = useState<UserProgress | null>(null);

    useEffect(() => {
        // Load progress
        const p = AssessmentService.getProgress();
        setProgress(p);
    }, []);

    if (!userRoadmap) {
        return (
            <div className="flex h-[80vh] items-center justify-center p-8">
                <Card className="max-w-md w-full bg-slate-900 border-slate-800 text-center p-8">
                    <div className="mx-auto w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                        <Brain className="h-8 w-8 text-slate-500" />
                    </div>
                    <h2 className="text-xl font-bold text-white mb-2">No Active Roadmap</h2>
                    <p className="text-slate-400 mb-6">Start a learning path to unlock assessments tailored to you.</p>
                    <Button asChild>
                        <Link href="/onboarding">Get Started</Link>
                    </Button>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8 px-4 space-y-8">
            <header>
                <h1 className="text-3xl font-bold text-white mb-2">Assessments</h1>
                <p className="text-slate-400">Validate your skills and track your growth in <span className="text-blue-400">{userRoadmap.domain}</span>.</p>
            </header>

            {/* Stats Overview */}
            <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-slate-900 border-slate-800">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-slate-400">Skill Level</CardTitle>
                        <Trophy className="h-4 w-4 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{progress?.skillLevelEstimate || "Beginner"}</div>
                        <p className="text-xs text-slate-500 mt-1">Based on quiz performance</p>
                    </CardContent>
                </Card>
                <Card className="bg-slate-900 border-slate-800">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-slate-400">Weekly Score</CardTitle>
                        <Target className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{progress?.weeklyScore || 0}/100</div>
                        <Progress value={progress?.weeklyScore || 0} className="h-2 mt-2 bg-slate-800" indicatorClassName="bg-green-500" />
                    </CardContent>
                </Card>
                <Card className="bg-slate-900 border-slate-800">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-slate-400">Current Streak</CardTitle>
                        <Zap className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{progress?.streakCount || 0} Days</div>
                        <p className="text-xs text-slate-500 mt-1">Keep learning daily!</p>
                    </CardContent>
                </Card>
            </div>

            <h2 className="text-xl font-bold text-white mt-8">Available Tests</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Daily Quiz Card */}
                <Card className="bg-gradient-to-br from-blue-900/20 to-slate-900 border-blue-900/50 hover:border-blue-700 transition-colors cursor-pointer group">
                    <CardHeader>
                        <div className="flex justify-between items-start mb-2">
                            <Badge variant="outline" className="bg-blue-900/40 text-blue-400 border-blue-800">Daily</Badge>
                            <Clock className="h-5 w-5 text-slate-500 group-hover:text-blue-400 transition-colors" />
                        </div>
                        <CardTitle className="text-white group-hover:text-blue-200">Daily Quiz</CardTitle>
                        <CardDescription>Quick 5-minute check on recent topics.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
                            <Zap className="h-4 w-4 text-amber-500" />
                            <span>Boost your streak</span>
                        </div>
                        <Button className="w-full bg-blue-600 hover:bg-blue-500">
                            Start Quiz
                        </Button>
                    </CardContent>
                </Card>

                {/* Weekly Assessment Card */}
                <Card className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-colors">
                    <CardHeader>
                        <div className="flex justify-between items-start mb-2">
                            <Badge variant="outline" className="bg-purple-900/40 text-purple-400 border-purple-800">Weekly</Badge>
                            <Brain className="h-5 w-5 text-slate-500" />
                        </div>
                        <CardTitle className="text-white">Weekly Review</CardTitle>
                        <CardDescription>Comprehensive test on this week's modules.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
                            <Trophy className="h-4 w-4 text-purple-500" />
                            <span> earn XP & Badges</span>
                        </div>
                        <Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800">
                            Take Test
                        </Button>
                    </CardContent>
                </Card>

                {/* Code Challenge Card */}
                <Card className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-colors">
                    <CardHeader>
                        <div className="flex justify-between items-start mb-2">
                            <Badge variant="outline" className="bg-green-900/40 text-green-400 border-green-800">Practice</Badge>
                            <Code2 className="h-5 w-5 text-slate-500" />
                        </div>
                        <CardTitle className="text-white">Coding Challenge</CardTitle>
                        <CardDescription>Solve real-world coding problems.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
                            <BookOpen className="h-4 w-4 text-green-500" />
                            <span>Practical application</span>
                        </div>
                        <Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800">
                            Solve Now
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
