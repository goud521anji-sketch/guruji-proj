"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/context/OnboardingContext";

export function Navbar() {
    const { isOnboarded, isLoggedIn, logout } = useOnboarding();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    return (
        <nav className="border-b border-slate-800 bg-slate-900/95 backdrop-blur-md sticky top-0 z-50">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white">
                    <BookOpen className="h-6 w-6 text-blue-400" />
                    <span>Guruji</span>
                </Link>

                {isLoggedIn && isOnboarded && (
                    <div className="flex items-center gap-6 hidden md:flex">
                        <Link href="/learning-path" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
                            Learning Path
                        </Link>
                        <Link href="/career" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
                            Career
                        </Link>
                    </div>
                )}

                <div className="flex items-center gap-4">
                    {!isLoggedIn ? (
                        <>
                            <Link href="/login" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
                                Login
                            </Link>
                            <Button asChild className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-white border-none">
                                <Link href="/login">Get Started</Link>
                            </Button>
                        </>
                    ) : (
                        <div className="flex items-center gap-4">
                            {!isOnboarded ? (
                                <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white border-none">
                                    <Link href="/onboarding">Complete Profile</Link>
                                </Button>
                            ) : (
                                <Button asChild variant="outline" className="border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-white">
                                    <Link href="/dashboard">Dashboard</Link>
                                </Button>
                            )}
                            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-slate-400 hover:text-red-400">
                                Logout
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
