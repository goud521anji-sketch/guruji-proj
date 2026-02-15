"use client";
import { Navbar } from "@/components/Navbar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Trophy, Flame, Award, Medal } from "lucide-react";

// ProtectedRoute is handled by layout
export default function GamificationPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col">
            <main className="container mx-auto py-12 px-4 flex-1">
                <h1 className="text-3xl font-bold mb-8 text-center text-white">Your Achievements</h1>

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <Card className="bg-gradient-to-br from-orange-900/30 to-orange-800/30 border-orange-500/30">
                        <CardContent className="pt-6 flex flex-col items-center text-center">
                            <Flame className="h-12 w-12 text-orange-500 mb-2" />
                            <div className="text-3xl font-bold text-orange-400">12 Days</div>
                            <div className="text-orange-300 font-medium">Current Streak</div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-yellow-900/30 to-yellow-800/30 border-yellow-500/30">
                        <CardContent className="pt-6 flex flex-col items-center text-center">
                            <Trophy className="h-12 w-12 text-yellow-500 mb-2" />
                            <div className="text-3xl font-bold text-yellow-400">1,250</div>
                            <div className="text-yellow-300 font-medium">Total XP</div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 border-blue-500/30">
                        <CardContent className="pt-6 flex flex-col items-center text-center">
                            <Medal className="h-12 w-12 text-blue-500 mb-2" />
                            <div className="text-3xl font-bold text-blue-400">Silver</div>
                            <div className="text-blue-300 font-medium">League</div>
                        </CardContent>
                    </Card>
                </div>

                <h2 className="text-2xl font-bold mb-6 text-white">Badges</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {['Fast Learner', 'Code Warrior', 'Bug Hunter', 'Night Owl'].map((badge, i) => (
                        <div key={badge} className="flex flex-col items-center p-4 bg-slate-900 rounded-lg border border-slate-800 hover:shadow-md hover:border-slate-700 transition-all">
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${i < 2 ? 'bg-purple-900/30' : 'bg-slate-800 grayscale'}`}>
                                <Award className={`h-8 w-8 ${i < 2 ? 'text-purple-400' : 'text-slate-600'}`} />
                            </div>
                            <span className={`font-medium text-sm ${i < 2 ? 'text-slate-200' : 'text-slate-500'}`}>{badge}</span>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
