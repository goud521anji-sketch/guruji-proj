"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { UserRoadmap, generateRoadmap, WeeklyPlan } from "@/lib/roadmap-generator";

interface RoadmapContextType {
    userRoadmap: UserRoadmap | null;
    generateUserRoadmap: (domain: string, dailyHours: number, totalMonths: number, skillLevel?: "Beginner" | "Intermediate" | "Advanced") => void;
    toggleTopicCompletion: (topicId: string) => void;
    resetRoadmap: () => void;
}

const RoadmapContext = createContext<RoadmapContextType | undefined>(undefined);

export function RoadmapProvider({ children }: { children: React.ReactNode }) {
    const [userRoadmap, setUserRoadmap] = useState<UserRoadmap | null>(null);

    // Load from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem("guruji_user_roadmap");
        if (stored) {
            try {
                const parsed: UserRoadmap = JSON.parse(stored);
                // Schema Migration: If dailyPlan is missing, regenerate it
                if (!parsed.dailyPlan) {
                    console.log("Migrating roadmap: Generating daily plan...");
                    // We need original inputs to regenerate. 
                    // If not stored, we might have to use defaults or fallback.
                    // For now, let's try to regenerate using current domain and defaults if params are lost.
                    // A better way is to just reset it if it's too broken, but let's try to save it.
                    const newRoadmap = generateRoadmap(parsed.domain, 2, parsed.totalMonths || 6);
                    // Note: '2' and '6' are guesses if we don't have them. 
                    // ideally we stored preferences. 
                    setUserRoadmap(newRoadmap);
                } else {
                    setUserRoadmap(parsed);
                }
            } catch (e) {
                console.error("Failed to parse stored roadmap", e);
            }
        }
    }, []);

    // Save to localStorage whenever roadmap changes
    useEffect(() => {
        if (userRoadmap) {
            localStorage.setItem("guruji_user_roadmap", JSON.stringify(userRoadmap));
        } else {
            // Only remove if explicitly null (reset), but initially it's null so be careful
            // We'll handle reset separately
        }
    }, [userRoadmap]);

    const generateUserRoadmap = async (domain: string, dailyHours: number, totalMonths: number, skillLevel: "Beginner" | "Intermediate" | "Advanced" = "Beginner") => {
        try {
            // Attempt to fetch from API first
            const res = await fetch("/api/generate-weekly-plan", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ domain, months: totalMonths, dailyHours, skillLevel }),
            });

            if (res.ok) {
                const data = await res.json();
                // Merge API data with full generation since API returns partial or full. 
                // However, since API calls generateRoadmap lib, it likely returns full object or parts. 
                // Our API implementation returns { weeklyPlan, monthlyPlan, domain, totalMonths }.
                // We need the FULL UserRoadmap structure (including dailyPlan, etc). 
                // Let's re-generate full locally but OVERRIDE with API data if needed, 
                // OR just use local if API is just a wrapper.
                // Requested goal: "Dynamic Weekly Plan Generator". 
                // Best approach: Use local lib for instant feedback, but API allows server-side expansion later.
                // For now, let's keep using local generator for speed and no-latency, 
                // as the API just calls the same function. 
                // BUT user requested API. So let's use the response to prove it works.

                // Construct full object based on API response + local generation for missing parts (dailyPlan)
                const fullRoadmap = generateRoadmap(domain, dailyHours, totalMonths, skillLevel);
                // Override weeklyPlan with one from API (should be identical)
                fullRoadmap.weeklyPlan = data.weeklyPlan;

                setUserRoadmap(fullRoadmap);
            } else {
                console.warn("API failed, falling back to local generation");
                const roadmap = generateRoadmap(domain, dailyHours, totalMonths, skillLevel);
                setUserRoadmap(roadmap);
            }
        } catch (error) {
            console.error("Error generating roadmap:", error);
            const roadmap = generateRoadmap(domain, dailyHours, totalMonths, skillLevel);
            setUserRoadmap(roadmap);
        }

        localStorage.setItem("selectedSubject", domain);
    };

    const toggleTopicCompletion = (topicId: string) => {
        if (!userRoadmap) return;

        const newRoadmap = { ...userRoadmap };

        // Update in Monthly Plan
        newRoadmap.monthlyPlan.forEach(month => {
            month.modules.forEach(module => {
                const topic = module.topics.find(t => t.id === topicId);
                if (topic) topic.isCompleted = !topic.isCompleted;
            });
        });

        // Update in Daily Plan
        newRoadmap.dailyPlan.forEach(day => {
            const topic = day.topics.find(t => t.id === topicId);
            if (topic) topic.isCompleted = !topic.isCompleted;
        });

        // Update in Weekly Plan
        if (newRoadmap.weeklyPlan) {
            newRoadmap.weeklyPlan.forEach(week => {
                week.days.forEach(day => {
                    const topic = day.topics.find(t => t.id === topicId);
                    if (topic) topic.isCompleted = !topic.isCompleted;
                });
            });
        }

        setUserRoadmap(newRoadmap);
    };

    const resetRoadmap = () => {
        setUserRoadmap(null);
        localStorage.removeItem("guruji_user_roadmap");
    };

    return (
        <RoadmapContext.Provider value={{ userRoadmap, generateUserRoadmap, toggleTopicCompletion, resetRoadmap }}>
            {children}
        </RoadmapContext.Provider>
    );
}

export function useRoadmap() {
    const context = useContext(RoadmapContext);
    if (context === undefined) {
        throw new Error("useRoadmap must be used within a RoadmapProvider");
    }
    return context;
}
