"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

const initialSchedule = [
    { id: 1, day: "Monday", tasks: ["HTML Structure", "Semantic Tags"], completed: true },
    { id: 2, day: "Tuesday", tasks: ["CSS Selectors", "Box Model"], completed: false },
    { id: 3, day: "Wednesday", tasks: ["Flexbox Layouts", "Grid System"], completed: false },
    { id: 4, day: "Thursday", tasks: ["JavaScript Variables", "Data Types"], completed: false },
    { id: 5, day: "Friday", tasks: ["Functions & Scope", "DOM Manipulation"], completed: false },
];

export default function PlannerPage() {
    const [schedule, setSchedule] = useState(initialSchedule);

    const toggleTask = (dayId: number) => {
        setSchedule(schedule.map(day =>
            day.id === dayId ? { ...day, completed: !day.completed } : day
        ));
    };

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col">
            <main className="container mx-auto py-8 px-4 flex-1 max-w-4xl">
                <h1 className="text-3xl font-bold mb-6 text-white">Daily Learning Planner</h1>
                <div className="space-y-4">
                    {schedule.map((day) => (
                        <Card key={day.id} className={cn("transition-colors border", day.completed ? "bg-green-900/20 border-green-800" : "bg-slate-800 border-slate-700")}>
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-center">
                                    <CardTitle className={cn("text-lg font-semibold", day.completed ? "text-green-400" : "text-slate-200")}>{day.day}</CardTitle>
                                    <button onClick={() => toggleTask(day.id)}>
                                        {day.completed ? (
                                            <CheckCircle2 className="h-6 w-6 text-green-500" />
                                        ) : (
                                            <Circle className="h-6 w-6 text-slate-500 hover:text-blue-400 transition-colors" />
                                        )}
                                    </button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <ul className="list-disc list-inside space-y-1 ml-2">
                                    {day.tasks.map(task => (
                                        <li key={task} className={cn("text-slate-300", day.completed && "line-through text-slate-500")}>
                                            {task}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    );
}
