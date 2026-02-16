"use client";

import { useOnboarding } from "@/context/OnboardingContext";
import { useRoadmap } from "@/context/RoadmapContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Check, ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { subjects, getSubjectsByCategory } from "@/data/subjects";

const STEPS = [
    "Basic Info",
    "Education",
    "Technical",
    "Preferences & Goals"
];

const TOTAL_STEPS = 4;

const EDUCATION_LEVELS = ["10th / School", "12th / Intermediate", "Diploma", "B.Tech / B.E", "Degree (BSc, BCom, BA)", "MCA / M.Tech", "Other"];
const STUDY_FIELDS = ["Computer Science", "IT", "ECE", "Mechanical", "Civil", "Non-Technical", "Other"];
const YEARS = ["1st Year", "2nd Year", "3rd Year", "Final Year", "Graduate"];
const PROGRAMMING_LANGUAGES = ["C", "C++", "Java", "Python", "JavaScript"];
const LEARNING_STYLES = ["Videos", "Articles", "Projects", "Documentation"];

export default function OnboardingPage() {
    const router = useRouter();
    // STRICT 1-based Indexing
    const [currentStep, setCurrentStep] = useState(1);

    // No auto-redirect on mount. Logic should be handled by ProtectedRoute.

    const subjectsByCategory = getSubjectsByCategory();


    const [formData, setFormData] = useState({
        // Basic
        name: "",
        selectedSubject: "", // Renamed from primaryGoal
        currentSkillLevel: "beginner",
        dailyLearningTime: 2,

        // Education
        educationLevel: "",
        fieldOfStudy: "",
        yearOfStudy: "",

        // Tech
        hasProgrammingExperience: "no", // "yes" | "no"
        knownLanguages: [] as string[],
        otherLanguages: "",

        // Preferences
        learningStyle: [] as string[],
        deviceAccess: "laptop",

        // Goal
        goalTimeline: "6 Months",
        isPreparingForPlacements: "no", // "yes" | "no"
        placementFocus: [] as string[], // "DSA", "Aptitude", "Interview Prep"
    });

    const { completeOnboarding } = useOnboarding();
    const { generateUserRoadmap } = useRoadmap();

    const finishOnboarding = () => {
        console.log("Finishing at step:", currentStep);

        if (currentStep === TOTAL_STEPS) {
            localStorage.setItem("isOnboarded", "true");
            if (formData.selectedSubject) {
                localStorage.setItem("selectedSubject", formData.selectedSubject);
                // Keep userGoal for backward compatibility
                localStorage.setItem("userGoal", formData.selectedSubject);

                // Parse Inputs
                const monthsMap: Record<string, number> = {
                    "1 Month": 1, "3 Months": 3, "6 Months": 6, "1 Year": 12
                };
                const totalMonths = monthsMap[formData.goalTimeline] || 6;

                // Capitalize Skill Level properly
                const skillLevel = (formData.currentSkillLevel.charAt(0).toUpperCase() + formData.currentSkillLevel.slice(1)) as "Beginner" | "Intermediate" | "Advanced";

                // Generate Roadmap
                generateUserRoadmap(
                    formData.selectedSubject,
                    formData.dailyLearningTime,
                    totalMonths,
                    skillLevel
                );
            }
            completeOnboarding();
            router.push("/dashboard");
        }
    };

    const handleNext = () => {
        setCurrentStep(prev => {
            if (prev < TOTAL_STEPS) {
                return prev + 1;
            }
            return prev;
        });
    };

    const handleBack = () => {
        setCurrentStep(prev => (prev > 1 ? prev - 1 : prev));
    };

    // Safe Form Submission
    const onFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (currentStep === TOTAL_STEPS) {
            finishOnboarding();
        } else {
            handleNext();
        }
    };

    const updateField = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const toggleArrayItem = (field: "knownLanguages" | "learningStyle" | "placementFocus", item: string) => {
        setFormData(prev => {
            const list = prev[field];
            return {
                ...prev,
                [field]: list.includes(item) ? list.filter(i => i !== item) : [...list, item]
            };
        });
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col">
            <Navbar />
            <div className="flex-1 container mx-auto py-10 px-4 flex justify-center">
                <Card className="w-full max-w-2xl shadow-lg h-fit bg-slate-900 border-slate-800">
                    <CardHeader>
                        <div className="flex justify-between items-center mb-4">
                            {STEPS.map((step, idx) => {
                                const stepNum = idx + 1;
                                return (
                                    <div key={idx} className="flex flex-col items-center flex-1">
                                        <div className={cn(
                                            "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-1 transition-colors",
                                            stepNum === currentStep ? "bg-blue-600 text-white" :
                                                stepNum < currentStep ? "bg-green-500 text-white" : "bg-slate-700 text-slate-300"
                                        )}>
                                            {stepNum < currentStep ? <Check className="w-4 h-4" /> : stepNum}
                                        </div>
                                        <span className={cn(
                                            "text-xs hidden sm:block",
                                            stepNum === currentStep ? "font-semibold text-blue-400" :
                                                stepNum < currentStep ? "text-green-400" : "text-slate-400"
                                        )}>{step}</span>
                                    </div>
                                );
                            })}
                        </div>
                        <CardTitle>{STEPS[currentStep - 1]}</CardTitle>
                        <CardDescription>Step {currentStep} of {TOTAL_STEPS}</CardDescription>
                    </CardHeader>

                    <form onSubmit={onFormSubmit}>
                        <CardContent className="space-y-6 min-h-[300px]">
                            {/* Step 1: Basic Info */}
                            {currentStep === 1 && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Full Name</label>
                                        <Input
                                            placeholder="Enter your name"
                                            value={formData.name}
                                            onChange={(e) => updateField("name", e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Primary Learning Domain</label>
                                        <select
                                            className="flex h-10 w-full rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white focus:ring-2 focus:ring-blue-500 appearance-none"
                                            value={formData.selectedSubject}
                                            onChange={(e) => updateField("selectedSubject", e.target.value)}
                                        >
                                            <option value="">Select Domain</option>
                                            {Object.entries(subjectsByCategory).map(([category, categorySubjects]) => (
                                                <optgroup key={category} label={category}>
                                                    {categorySubjects.map(s => (
                                                        <option key={s.name} value={s.name}>
                                                            {s.icon} {s.name}
                                                        </option>
                                                    ))}
                                                </optgroup>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Skill Level</label>
                                        <div className="flex gap-4">
                                            {["Beginner", "Intermediate", "Advanced"].map(level => (
                                                <label key={level} className="flex items-center space-x-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="skillLevel"
                                                        value={level.toLowerCase()}
                                                        checked={formData.currentSkillLevel === level.toLowerCase()}
                                                        onChange={(e) => updateField("currentSkillLevel", e.target.value)}
                                                        className="h-4 w-4 text-blue-500 focus:ring-blue-500 bg-slate-800 border-slate-600"
                                                    />
                                                    <span>{level}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Daily Learning Time (Hours)</label>
                                        <Input
                                            type="number" min="1" max="12"
                                            value={formData.dailyLearningTime}
                                            onChange={(e) => updateField("dailyLearningTime", parseInt(e.target.value) || 0)}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Educational Details */}
                            {currentStep === 2 && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Current Education</label>
                                        <select
                                            className="flex h-10 w-full rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white focus:ring-2 focus:ring-blue-500 appearance-none"
                                            value={formData.educationLevel}
                                            onChange={(e) => updateField("educationLevel", e.target.value)}
                                        >
                                            <option value="">Select Education</option>
                                            {EDUCATION_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Field of Study</label>
                                        <select
                                            className="flex h-10 w-full rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white focus:ring-2 focus:ring-blue-500 appearance-none"
                                            value={formData.fieldOfStudy}
                                            onChange={(e) => updateField("fieldOfStudy", e.target.value)}
                                        >
                                            <option value="">Select Field</option>
                                            {STUDY_FIELDS.map(f => <option key={f} value={f}>{f}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Year of Study</label>
                                        <select
                                            className="flex h-10 w-full rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white focus:ring-2 focus:ring-blue-500 appearance-none"
                                            value={formData.yearOfStudy}
                                            onChange={(e) => updateField("yearOfStudy", e.target.value)}
                                        >
                                            <option value="">Select Year</option>
                                            {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                                        </select>
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Technical Background */}
                            {currentStep === 3 && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Do you have programming experience?</label>
                                        <div className="flex gap-4">
                                            {["Yes", "No"].map(opt => (
                                                <label key={opt} className="flex items-center space-x-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="hasExp"
                                                        value={opt.toLowerCase()}
                                                        checked={formData.hasProgrammingExperience === opt.toLowerCase()}
                                                        onChange={(e) => updateField("hasProgrammingExperience", e.target.value)}
                                                        className="h-4 w-4 text-blue-500 bg-slate-800 border-slate-600 focus:ring-blue-500"
                                                    />
                                                    <span>{opt}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {formData.hasProgrammingExperience === "yes" && (
                                        <div className="space-y-4 pt-4 border-t">
                                            <label className="text-sm font-medium">Known Languages</label>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                                {PROGRAMMING_LANGUAGES.map(lang => (
                                                    <label key={lang} className="flex items-center space-x-2 cursor-pointer p-2 border rounded hover:bg-slate-800 border-slate-700">
                                                        <input
                                                            type="checkbox"
                                                            checked={formData.knownLanguages.includes(lang)}
                                                            onChange={() => toggleArrayItem("knownLanguages", lang)}
                                                            className="rounded text-blue-500 bg-slate-800 border-slate-600 focus:ring-blue-500"
                                                        />
                                                        <span>{lang}</span>
                                                    </label>
                                                ))}
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Others (comma separated)</label>
                                                <Input
                                                    placeholder="e.g. Ruby, Go, Rust"
                                                    value={formData.otherLanguages}
                                                    onChange={(e) => updateField("otherLanguages", e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Step 4: Preferences & Goals (Merged) */}
                            {currentStep === 4 && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">

                                    {/* -- PREFERENCES SECTION -- */}
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-semibold text-blue-400">Learning Preferences</h3>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Preferred Learning Style</label>
                                            <div className="grid grid-cols-2 gap-3">
                                                {LEARNING_STYLES.map(style => (
                                                    <label key={style} className={`flex items-center space-x-2 cursor-pointer p-3 border rounded-lg transition-all ${formData.learningStyle.includes(style) ? "border-blue-500 bg-blue-900/20" : "hover:bg-slate-800 border-slate-700 bg-slate-900"}`}>
                                                        <input
                                                            type="checkbox"
                                                            checked={formData.learningStyle.includes(style)}
                                                            onChange={() => toggleArrayItem("learningStyle", style)}
                                                            className="rounded text-blue-500 focus:ring-blue-500 bg-slate-800 border-slate-600"
                                                        />
                                                        <span>{style}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-2 pt-2">
                                            <label className="text-sm font-medium">Device Access</label>
                                            <div className="flex gap-4">
                                                {["Mobile only", "Laptop", "Both"].map(d => (
                                                    <label key={d} className="flex items-center space-x-2 cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            name="device"
                                                            value={d.toLowerCase()}
                                                            checked={formData.deviceAccess === d.toLowerCase()}
                                                            onChange={(e) => updateField("deviceAccess", e.target.value)}
                                                            className="h-4 w-4 text-blue-500 bg-slate-800 border-slate-600 focus:ring-blue-500"
                                                        />
                                                        <span>{d}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* -- GOALS SECTION -- */}
                                    <div className="space-y-4 border-t border-slate-800 pt-6">
                                        <h3 className="text-xl font-semibold text-blue-400">Career Goals</h3>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Goal Timeline</label>
                                            <select
                                                className="flex h-10 w-full rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white focus:ring-2 focus:ring-blue-500 appearance-none"
                                                value={formData.goalTimeline}
                                                onChange={(e) => updateField("goalTimeline", e.target.value)}
                                            >
                                                {["1 Month", "3 Months", "6 Months", "1 Year"].map(t => <option key={t} value={t}>{t}</option>)}
                                            </select>
                                        </div>

                                        <div className="space-y-2 pt-2">
                                            <label className="text-sm font-medium">Preparing for Placements?</label>
                                            <div className="flex gap-4">
                                                {["Yes", "No"].map(opt => (
                                                    <label key={opt} className="flex items-center space-x-2 cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            name="placements"
                                                            value={opt.toLowerCase()}
                                                            checked={formData.isPreparingForPlacements === opt.toLowerCase()}
                                                            onChange={(e) => updateField("isPreparingForPlacements", e.target.value)}
                                                            className="h-4 w-4 text-blue-500 bg-slate-800 border-slate-600 focus:ring-blue-500"
                                                        />
                                                        <span>{opt}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        {formData.isPreparingForPlacements === "yes" && (
                                            <div className="space-y-2 pt-2 animate-in fade-in">
                                                <label className="text-sm font-medium">Placement Focus</label>
                                                <div className="flex gap-3">
                                                    {["DSA", "Aptitude", "Interview Prep"].map(focus => (
                                                        <label key={focus} className="flex items-center space-x-2 cursor-pointer p-2 border rounded bg-slate-50">
                                                            <input
                                                                type="checkbox"
                                                                checked={formData.placementFocus.includes(focus)}
                                                                onChange={() => toggleArrayItem("placementFocus", focus)}
                                                                className="rounded text-blue-600"
                                                            />
                                                            <span className="text-sm">{focus}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline" type="button" onClick={handleBack} disabled={currentStep === 1} className="gap-2">
                                <ChevronLeft className="h-4 w-4" /> Back
                            </Button>
                            {currentStep === TOTAL_STEPS ? (
                                <Button type="button" onClick={finishOnboarding} className="gap-2 bg-blue-600 hover:bg-blue-700">
                                    Finish & Generate <ChevronRight className="h-4 w-4" />
                                </Button>
                            ) : (
                                <Button type="button" onClick={handleNext} className="gap-2">
                                    Next <ChevronRight className="h-4 w-4" />
                                </Button>
                            )}
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
}
