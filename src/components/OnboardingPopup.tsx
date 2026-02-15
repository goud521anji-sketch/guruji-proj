"use client";

import { useOnboarding } from "@/context/OnboardingContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState, useEffect } from "react";

export function OnboardingPopup() {
    const { isOnboarded, isLoggedIn } = useOnboarding();
    const [isVisible, setIsVisible] = useState(false);

    const pathname = usePathname();

    useEffect(() => {
        // Show popup if not onboarded, but NOT if we are already on the onboarding page
        if (!isOnboarded && pathname !== "/onboarding") {
            // Add a small delay for better UX
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        } else {
            setIsVisible(false);
        }
    }, [isOnboarded, pathname]);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-4 right-4 z-50 max-w-sm w-full animate-in slide-in-from-bottom-5 fade-in duration-500">
            <div className="bg-slate-900 border border-slate-800 rounded-lg shadow-lg p-6 relative">
                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute top-2 right-2 text-slate-400 hover:text-white"
                >
                    <X className="h-4 w-4" />
                </button>
                <h3 className="text-lg font-semibold text-white mb-2">Complete your profile</h3>
                <p className="text-slate-400 text-sm mb-4">
                    Unlock personalized roadmaps and career guidance by completing your onboarding.
                </p>
                <Link href={isLoggedIn ? "/onboarding" : "/login"}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        {isLoggedIn ? "Go to Onboarding" : "Login to Continue"}
                    </Button>
                </Link>
            </div>
        </div>
    );
}
