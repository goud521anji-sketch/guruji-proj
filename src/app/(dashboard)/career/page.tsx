"use client";
import { Navbar } from "@/components/Navbar";
import { careerInsights } from "@/lib/data";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Briefcase, TrendingUp, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

// Removed ProtectedRoute as it is already in the layout
export default function CareerPage() {
    return (
        <div className="min-h-screen bg-slate-950 flex flex-col">
            {/* Navbar removed as it might be redundant with sidebar, but keeping for now if layout doesn't cover it fully or if user wants it */}
            <main className="container mx-auto py-12 px-4 flex-1">
                <h1 className="text-3xl font-bold mb-8 text-center text-white">Career Insights</h1>
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {careerInsights.map((job: any) => (
                        <Card key={job.role} className="hover:shadow-lg transition-shadow bg-slate-800 border-slate-700">
                            <CardHeader>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-blue-900/30 rounded-lg border border-blue-900/50">
                                        <Briefcase className="h-6 w-6 text-blue-400" />
                                    </div>
                                    <CardTitle className="text-slate-100">{job.role}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                                    <span className="text-slate-400 flex items-center gap-2">
                                        <DollarSign className="h-4 w-4" /> Average Salary
                                    </span>
                                    <span className="font-semibold text-slate-200">{job.avgSalary}</span>
                                </div>
                                <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                                    <span className="text-slate-400 flex items-center gap-2">
                                        <TrendingUp className="h-4 w-4" /> Demand
                                    </span>
                                    <span className={cn("font-semibold",
                                        job.demand === "High" ? "text-green-400" :
                                            job.demand === "Growing" ? "text-blue-400" : "text-slate-300"
                                    )}>{job.demand}</span>
                                </div>
                                <div>
                                    <span className="text-sm text-slate-500 mb-2 block">Top Skills Required:</span>
                                    <div className="flex flex-wrap gap-2">
                                        {job.skills.map((skill: string) => (
                                            <span key={skill} className="bg-slate-700 text-slate-200 px-2 py-1 rounded text-xs border border-slate-600">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    );
}
