"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Code, Cpu, Shield, Database } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { useOnboarding } from "@/context/OnboardingContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
    const { isLoggedIn, isOnboarded, isLoading } = useOnboarding();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && isLoggedIn && isOnboarded) {
            router.push("/dashboard");
        }
    }, [isLoggedIn, isOnboarded, isLoading, router]);

    if (isLoading) {
        return <div className="min-h-screen bg-slate-950"></div>;
    }

    // Only show landing content if not logged in (or not onboarded yet)
    return (
        <div className="flex min-h-screen flex-col bg-slate-950">
            <Navbar />
            <main className="flex-1">
                {/* Hero Section */}
                <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 bg-slate-950 relative overflow-hidden">
                    {/* Subtle Glow Effect */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl -z-10 dark:bg-blue-500/20" />

                    <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center mx-auto relative z-10">
                        <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 pb-2">
                            Find Your Perfect Learning Path
                        </h1>
                        <p className="max-w-[42rem] leading-normal sm:text-xl sm:leading-8 text-slate-400">
                            Guruji provides personalized roadmaps for Web Development, AI/ML, and more.
                            Track your progress and achieve your career goals.
                        </p>
                        <div className="flex gap-4">
                            <Button asChild size="lg" className="h-11 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 border-none text-white hover:opacity-90">
                                <Link href="/login">Start Your Journey</Link>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Categories Section */}
                <section className="container py-8 md:py-12 lg:py-24 mx-auto bg-slate-950">
                    <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
                        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-semibold text-white">
                            Popular Categories
                        </h2>
                    </div>
                    <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-4 mt-8">
                        <CategoryCard icon={Code} title="Web Dev" />
                        <CategoryCard icon={Cpu} title="AI / ML" />
                        <CategoryCard icon={Shield} title="Cybersecurity" />
                        <CategoryCard icon={Database} title="Data Science" />
                    </div>
                </section>
            </main>
        </div>
    );
}

function CategoryCard({ icon: Icon, title }: { icon: any; title: string }) {
    return (
        <div className="relative overflow-hidden rounded-lg border p-2 transition-all hover:scale-105 hover:shadow-md bg-slate-800 border-slate-700">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <Icon className="h-12 w-12 text-blue-400" />
                <div className="space-y-2">
                    <h3 className="font-bold text-slate-200">{title}</h3>
                    <p className="text-sm text-slate-400">Explore paths</p>
                </div>
            </div>
        </div>
    );
}
