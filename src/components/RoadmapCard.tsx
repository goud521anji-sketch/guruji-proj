import Link from "next/link";
import { Clock, BarChart, Star, ChevronRight } from "lucide-react";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Roadmap } from "@/types";

interface RoadmapCardProps {
    roadmap: Roadmap;
}

export function RoadmapCard({ roadmap }: RoadmapCardProps) {
    return (
        <Card className="flex flex-col h-full transition-all hover:shadow-xl hover:border-slate-600">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-xl mb-1 text-slate-100">{roadmap.title}</CardTitle>
                        <CardDescription className="text-slate-400">{roadmap.category}</CardDescription>
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-900/30 text-yellow-500 px-2 py-1 rounded text-xs font-medium border border-yellow-900/50">
                        <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                        {roadmap.rating}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex-1">
                <p className="text-sm text-slate-400 mb-4 line-clamp-2">{roadmap.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {roadmap.skills.slice(0, 3).map(skill => (
                        <span key={skill} className="bg-slate-700 text-slate-200 px-2 py-1 rounded text-xs border border-slate-600">
                            {skill}
                        </span>
                    ))}
                    {roadmap.skills.length > 3 && (
                        <span className="text-xs text-slate-500 flex items-center">+{roadmap.skills.length - 3} more</span>
                    )}
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {roadmap.duration}
                    </div>
                    <div className="flex items-center gap-1">
                        <BarChart className="h-3 w-3" />
                        {roadmap.difficulty}
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Link href={`/roadmaps/${roadmap.id}`} className="w-full">
                    <Button className="w-full gap-2">
                        View Path <ChevronRight className="h-4 w-4" />
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
