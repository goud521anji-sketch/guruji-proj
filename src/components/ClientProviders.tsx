"use client";

import { OnboardingProvider } from "@/context/OnboardingContext";
import { ThemeProvider } from "@/components/ThemeProvider";

import { RoadmapProvider } from "@/context/RoadmapContext";

export function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <OnboardingProvider>
                <RoadmapProvider>
                    {children}
                </RoadmapProvider>
            </OnboardingProvider>
        </ThemeProvider>
    );
}
