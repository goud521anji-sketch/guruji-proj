import Link from "next/link";
import { roadmaps } from "@/lib/data";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "lucide-react";
import { notFound } from "next/navigation";

export default function RoadmapDetailsPage({ params }: { params: { id: string } }) {
    const roadmap = roadmaps.find(r => r.id === params.id);

    if (!roadmap) {
        return notFound();
    }

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col">
            <Navbar />
            <main className="container mx-auto py-8 px-4 flex-1">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-6">
                        <Link href="/roadmaps" className="text-sm text-blue-400 hover:underline mb-2 inline-block hover:text-blue-300 transition-colors">&larr; Back to Roadmaps</Link>
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-3xl font-bold mb-2 text-white">{roadmap.title}</h1>
                                <p className="text-slate-400">{roadmap.description}</p>
                            </div>
                            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 border-none">Start Roadmap</Button>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 space-y-6">
                            <h2 className="text-xl font-semibold text-slate-200">Learning Path</h2>
                            <div className="space-y-4">
                                {roadmap.steps.map((step, index) => (
                                    <div key={step.id} className="bg-slate-900 border border-slate-800 rounded-lg p-4 relative hover:border-slate-700 transition-colors">
                                        <div className="flex gap-4">
                                            <div className="flex flex-col items-center">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-900/20">
                                                    {index + 1}
                                                </div>
                                                {index < roadmap.steps.length - 1 && (
                                                    <div className="w-0.5 h-full bg-slate-800 my-2" />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="font-semibold text-lg text-slate-200">{step.title}</h3>
                                                    <span className="text-xs text-slate-400 bg-slate-800 border border-slate-700 px-2 py-1 rounded">
                                                        {step.estimatedHours} Hours
                                                    </span>
                                                </div>
                                                <p className="text-sm text-slate-400 mb-3">{step.description}</p>

                                                {/* Resources */}
                                                <div className="space-y-2">
                                                    <p className="text-xs font-semibold text-slate-500 uppercase">Resources</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {step.resources.map(resource => (
                                                            <a
                                                                key={resource.id}
                                                                href={resource.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-xs flex items-center gap-1 bg-slate-800 text-slate-300 border border-slate-700 px-2 py-1 rounded hover:bg-slate-700 hover:text-white transition-all hover:border-slate-600"
                                                            >
                                                                {resource.title}
                                                            </a>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 sticky top-24">
                                <h3 className="font-semibold mb-4 text-slate-200">Overview</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between py-2 border-b border-slate-800">
                                        <span className="text-slate-400">Duration</span>
                                        <span className="font-medium text-slate-200">{roadmap.duration}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-slate-800">
                                        <span className="text-slate-400">Difficulty</span>
                                        <span className="font-medium text-slate-200">{roadmap.difficulty}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-slate-800">
                                        <span className="text-slate-400">Rating</span>
                                        <div className="flex items-center gap-1 text-yellow-500">
                                            <span className="font-medium">{roadmap.rating}/5</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
                                <h3 className="font-semibold mb-4 text-slate-200">Skills You'll Gain</h3>
                                <div className="flex flex-wrap gap-2">
                                    {roadmap.skills.map(skill => (
                                        <span key={skill} className="bg-emerald-950/30 text-emerald-400 border border-emerald-900/50 font-medium px-2 py-1 rounded text-xs">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
