"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface OnboardingContextType {
    isOnboarded: boolean;
    isLoggedIn: boolean;
    completeOnboarding: () => void;
    resetOnboarding: () => void;
    login: (email: string) => void;
    logout: () => void;
    isLoading: boolean;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
    const [isOnboarded, setIsOnboarded] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedOnboarded = localStorage.getItem("guruji_onboarding_completed");
        const storedLoggedIn = localStorage.getItem("guruji_is_logged_in");

        if (storedOnboarded === "true") setIsOnboarded(true);
        if (storedLoggedIn === "true") setIsLoggedIn(true);

        setIsLoading(false);
    }, []);

    const completeOnboarding = () => {
        localStorage.setItem("guruji_onboarding_completed", "true");
        setIsOnboarded(true);
    };

    const resetOnboarding = () => {
        localStorage.removeItem("guruji_onboarding_completed");
        setIsOnboarded(false);
    };

    const login = (email: string) => {
        console.log("LOGIN CALLED", { email });
        localStorage.setItem("guruji_is_logged_in", "true");
        setIsLoggedIn(true);
    };

    const logout = () => {
        console.log("LOGOUT CALLED");
        localStorage.removeItem("guruji_is_logged_in");
        localStorage.removeItem("guruji_onboarding_completed");
        setIsLoggedIn(false);
        setIsOnboarded(false);
    };

    console.log("Auth State:", { isLoggedIn, isOnboarded, isLoading });

    return (
        <OnboardingContext.Provider value={{ isOnboarded, completeOnboarding, resetOnboarding, isLoading, isLoggedIn, login, logout }}>
            {children}
        </OnboardingContext.Provider>
    );
}

export function useOnboarding() {
    const context = useContext(OnboardingContext);
    if (context === undefined) {
        throw new Error("useOnboarding must be used within an OnboardingProvider");
    }
    return context;
}
