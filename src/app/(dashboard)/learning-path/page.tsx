"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useRoadmap } from "@/context/RoadmapContext";
import { WeeklyPlan } from "@/lib/roadmap-generator";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChevronDown, CheckCircle2, Circle, Clock, Calendar, BookOpen, AlertCircle, PlayCircle, FileText, Code2, Trophy, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const TopicIcon = ({ type }: { type: string }) => {
    switch (type) {
        case "video": return <PlayCircle className="h-4 w-4 text-blue-400" />;
        case "article": return <FileText className="h-4 w-4 text-orange-400" />;
        case "project": return <Code2 className="h-4 w-4 text-green-400" />;
        case "quiz": return <Trophy className="h-4 w-4 text-yellow-400" />;
        default: return <Circle className="h-4 w-4" />;
    }
};

export default function LearningPathPage() {
    const router = useRouter();
    const { userRoadmap, toggleTopicCompletion } = useRoadmap();
    const [expandedMonths, setExpandedMonths] = useState<number[]>([1]);
    const [expandedWeeks, setExpandedWeeks] = useState<number[]>([1]);

    const toggleWeek = (week: number) => {
        setExpandedWeeks(prev =>
            prev.includes(week) ? prev.filter(w => w !== week) : [...prev, week]
        );
    };

    const [weeklyPlan, setWeeklyPlan] = useState<WeeklyPlan[]>([]);

    // Redirect if no roadmap
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!userRoadmap) {
                // handle redirect
            }
        }, 1000);
        return () => clearTimeout(timeout);
    }, [userRoadmap]);

    useEffect(() => {
        if (userRoadmap) {
            generateWeeklyPlan();
        }
    }, [userRoadmap]);

    const generateWeeklyPlan = () => {
        if (!userRoadmap) return;

        const dailyHours = 2; // Default or fetch from user settings
        const weeklyMinutes = dailyHours * 7 * 60; // Convert to minutes for precision

        // Flatten all topics from monthly plan to preserve their state (completed/id/etc)
        const allTopics = userRoadmap.monthlyPlan.flatMap(month =>
            month.modules.flatMap(module => module.topics)
        );

        let week = 1;
        let currentWeekMinutes = 0;
        let plan: any[] = [];
        let weekDays: any[] = [];
        let currentDay = 1;
        let currentDayMinutes = 0;
        let dayTopics: any[] = [];

        // Distribute topics into Days and Weeks
        // Simplified Logic: Fill days, then fill weeks
        allTopics.forEach(topic => {
            const topicMinutes = topic.estimatedMinutes || 60;

            // Add to current day
            dayTopics.push(topic);
            currentDayMinutes += topicMinutes;

            // If day is full (approx 2 hours), push day
            if (currentDayMinutes >= (dailyHours * 60)) {
                weekDays.push({
                    day: currentDay,
                    title: `Day ${currentDay}`,
                    topics: [...dayTopics],
                    totalMinutes: currentDayMinutes,
                    isCompleted: dayTopics.every(t => t.isCompleted)
                });
                currentDay++;
                dayTopics = [];
                currentDayMinutes = 0;
            }

            // If week is full (7 days), push week
            if (weekDays.length === 7) {
                plan.push({
                    week: week,
                    title: `Week ${week}`,
                    days: [...weekDays],
                    isCompleted: weekDays.every(d => d.isCompleted)
                });
                week++;
                weekDays = [];
            }
        });

        // Handle remaining topics/days
        if (dayTopics.length > 0) {
            weekDays.push({
                day: currentDay,
                title: `Day ${currentDay}`,
                topics: [...dayTopics],
                totalMinutes: currentDayMinutes,
                isCompleted: dayTopics.every(t => t.isCompleted)
            });
        }

        if (weekDays.length > 0) {
            plan.push({
                week: week,
                title: `Week ${week}`,
                days: [...weekDays],
                isCompleted: weekDays.every(d => d.isCompleted)
            });
        }

        console.log("Weekly Plan Generated:", plan);
        setWeeklyPlan(plan);
    };

    if (!userRoadmap) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col">

                <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
                    <div className="h-20 w-20 bg-slate-900 rounded-full flex items-center justify-center mb-6 border border-slate-800">
                        <BookOpen className="h-10 w-10 text-slate-500" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">Start Your Journey</h2>
                    <p className="text-slate-400 mb-8 max-w-md">You haven't generated a learning path yet. Complete your profile to get a personalized roadmap.</p>
                    <Button onClick={() => router.push("/onboarding")} className="bg-blue-600 hover:bg-blue-500 text-lg py-6 px-8 rounded-xl">
                        Create My Learning Path
                    </Button>
                </div>
            </div>
        );
    }

    const { domain, monthlyPlan, totalMonths } = userRoadmap;

    // Calculate Overall Progress
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

            <main className="container mx-auto py-8 px-4 flex-1 max-w-6xl space-y-12">

                {/* SECTION 1: HEADER */}
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-4">
                        <div>
                            <span className="text-blue-500 font-medium tracking-wider text-sm uppercase">Learning Path</span>
                            <h1 className="text-3xl md:text-5xl font-bold text-white mt-2">
                                {domain}
                            </h1>
                        </div>
                        <p className="text-slate-400 text-lg">
                            Estimated completion: <span className="text-white font-medium">{totalMonths} Months</span>
                        </p>
                        <div className="flex gap-4 pt-2">
                            <div className="bg-slate-900 px-4 py-2 rounded-lg border border-slate-800 flex items-center gap-2">
                                <BookOpen className="h-4 w-4 text-slate-400" />
                                <span className="text-slate-200">{monthlyPlan.length} Modules</span>
                            </div>
                            <div className="bg-slate-900 px-4 py-2 rounded-lg border border-slate-800 flex items-center gap-2">
                                <Trophy className="h-4 w-4 text-slate-400" />
                                <span className="text-slate-200">{totalTopics} Topics</span>
                            </div>
                        </div>
                    </div>
                    <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
                        <CardContent className="p-6 flex flex-col justify-center h-full">
                            <div className="flex justify-between text-sm mb-3 font-medium">
                                <span className="text-slate-400">Total Progress</span>
                                <span className="text-blue-400">{progressPercentage}%</span>
                            </div>
                            <Progress value={progressPercentage} className="h-3 bg-slate-800 mb-2" indicatorClassName="bg-gradient-to-r from-blue-600 to-indigo-500" />
                            <p className="text-xs text-slate-500 text-right">{completedTopics} of {totalTopics} completed</p>
                        </CardContent>
                    </Card>
                </div>

                {/* SECTION 2: AUTO-GENERATED WEEKLY PLANNER */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <Calendar className="h-6 w-6 text-blue-500" />
                        <h2 className="text-2xl font-bold text-white">Your Weekly Plan</h2>
                    </div>

                    <div className="space-y-8">
                        {weeklyPlan?.map((week) => (
                            <div key={week.week} className={cn("space-y-4 transition-all duration-300", week.isCompleted && "opacity-60")}>
                                <div
                                    className="flex items-center gap-4 cursor-pointer hover:bg-slate-900/50 p-2 rounded-lg transition-colors"
                                    onClick={() => toggleWeek(week.week)}
                                >
                                    <div className="h-8 w-8 rounded-full bg-blue-900/30 border border-blue-800 flex items-center justify-center text-blue-400 font-bold text-xs ring-4 ring-slate-950">
                                        W{week.week}
                                    </div>
                                    <h3 className="text-xl font-semibold text-slate-200 flex-1">{week.title}</h3>
                                    <ChevronDown className={cn("text-slate-500 transition-transform duration-300", expandedWeeks.includes(week.week) ? "rotate-180" : "")} />
                                </div>

                                {expandedWeeks.includes(week.week) && (
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pl-4 md:pl-0 animate-in slide-in-from-top-2 duration-200">
                                        {week.days.map((day) => {
                                            const isDayComplete = day.topics.every(t => t.isCompleted);
                                            return (
                                                <Card key={day.day} className={cn(
                                                    "border-slate-800 transition-all hover:border-slate-700",
                                                    isDayComplete ? "bg-slate-900/40" : "bg-slate-900"
                                                )}>
                                                    <CardHeader className="p-4 pb-2">
                                                        <div className="flex justify-between items-center">
                                                            <CardTitle className="text-base text-slate-200">{day.title}</CardTitle>
                                                            {isDayComplete && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                                                        </div>
                                                        <CardDescription className="text-xs">{day.totalMinutes} mins est.</CardDescription>
                                                    </CardHeader>
                                                    <CardContent className="p-4 pt-2 space-y-2">
                                                        {day.topics.map((topic) => (
                                                            <div
                                                                key={topic.id}
                                                                onClick={() => toggleTopicCompletion(topic.id)}
                                                                className={cn(
                                                                    "flex items-start gap-3 p-2 rounded-lg cursor-pointer transition-colors group",
                                                                    topic.isCompleted ? "hover:bg-slate-800/80" : "hover:bg-slate-800"
                                                                )}
                                                            >
                                                                <div className={cn(
                                                                    "mt-0.5 h-4 w-4 rounded border flex items-center justify-center shrink-0 transition-colors",
                                                                    topic.isCompleted ? "bg-green-500 border-green-500" : "border-slate-600 group-hover:border-blue-500"
                                                                )}>
                                                                    {topic.isCompleted && <CheckCircle2 className="h-3 w-3 text-black" />}
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <p className={cn(
                                                                        "text-sm leading-tight transition-colors",
                                                                        topic.isCompleted ? "text-slate-500 line-through" : "text-slate-300"
                                                                    )}>
                                                                        {topic.title}
                                                                    </p>
                                                                    <div className="flex items-center gap-2 mt-1.5">
                                                                        <TopicIcon type={topic.type} />
                                                                        <span className="text-[10px] text-slate-500 uppercase">{topic.type}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </CardContent>
                                                </Card>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        ))}

                        {weeklyPlan.length === 0 ? (
                            <div className="p-8 text-center">
                                <p className="text-slate-500 animate-pulse">Generating your personalized weekly schedule...</p>
                            </div>
                        ) : null}
                    </div>
                </section>

                <div className="h-px bg-slate-800/50" />

                {/* SECTION 3: ROADMAP OVERVIEW */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <MapIcon className="h-6 w-6 text-blue-500" />
                            <h2 className="text-2xl font-bold text-white">Roadmap Overview</h2>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => setExpandedMonths(monthlyPlan.map(m => m.month))} className="text-xs text-slate-400">
                            Expand All
                        </Button>
                    </div>

                    <div className="space-y-4">
                        {monthlyPlan.map((monthPlan) => (
                            <Card key={monthPlan.month} className={cn(
                                "border-slate-800 bg-slate-900/40 overflow-hidden",
                                monthPlan.status === "locked" ? "opacity-60 grayscale" : ""
                            )}>
                                <div
                                    className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-900/60 transition-colors"
                                    onClick={() => toggleMonth(monthPlan.month)}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={cn(
                                            "h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm border",
                                            monthPlan.status === "completed" ? "bg-green-900/20 border-green-800 text-green-400" :
                                                monthPlan.status === "active" ? "bg-blue-900/20 border-blue-800 text-blue-400" : "bg-slate-800 border-slate-700 text-slate-500"
                                        )}>
                                            M{monthPlan.month}
                                        </div>
                                        <h3 className="text-lg font-semibold text-white">{monthPlan.title}</h3>
                                    </div>
                                    <ChevronDown className={cn("transition-transform duration-300", expandedMonths.includes(monthPlan.month) ? "rotate-180" : "")} />
                                </div>

                                {expandedMonths.includes(monthPlan.month) && (
                                    <div className="border-t border-slate-800/50 bg-slate-950/30">
                                        {monthPlan.modules.map((module) => (
                                            <div key={module.id} className="p-5 border-b border-slate-800/50 last:border-0 relative">
                                                {/* Left border line linking modules inside the month could go here */}
                                                <div className="flex flex-wrap md:flex-nowrap justify-between mb-4 gap-2">
                                                    <h4 className="font-semibold text-slate-200">{module.title}</h4>
                                                    <span className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded h-fit whitespace-nowrap">
                                                        {module.estimatedHours} Hours • {module.difficulty}
                                                    </span>
                                                </div>
                                                <div className="grid md:grid-cols-2 gap-3 pl-2">
                                                    {module.topics.map((topic) => (
                                                        <div
                                                            key={topic.id}
                                                            onClick={() => toggleTopicCompletion(topic.id)}
                                                            className={cn(
                                                                "flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer",
                                                                topic.isCompleted
                                                                    ? "bg-green-950/10 border-green-900/30"
                                                                    : "bg-slate-900/50 border-slate-800 hover:border-slate-700"
                                                            )}
                                                        >
                                                            <div className={cn(
                                                                "h-5 w-5 rounded border flex items-center justify-center shrink-0 transition-colors",
                                                                topic.isCompleted ? "bg-green-500 border-green-500 text-black" : "border-slate-600"
                                                            )}>
                                                                {topic.isCompleted && <CheckCircle2 className="h-3.5 w-3.5" />}
                                                            </div>
                                                            <span className={cn("text-sm transition-colors", topic.isCompleted ? "text-slate-500 line-through" : "text-slate-300")}>
                                                                {topic.title}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </Card>
                        ))}
                    </div>
                </section>

            </main>
        </div>
    );
}

function MapIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polygon points="3 6 9 3 15 6 21 3 21 21 15 18 9 21 3 18 3 6" />
            <line x1="9" x2="9" y1="3" y2="21" />
            <line x1="15" x2="15" y1="6" y2="18" />
        </svg>
    )
}
