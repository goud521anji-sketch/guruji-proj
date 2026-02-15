"use client";

import { useOnboarding } from "@/context/OnboardingContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isOnboarded, isLoggedIn, isLoading } = useOnboarding();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        console.log("ProtectedRoute Check:", { isLoading, isLoggedIn, isOnboarded, pathname });
        if (!isLoading) {
            if (!isLoggedIn) {
                console.log("Redirecting to /login");
                router.push("/login");
            } else if (isLoggedIn && !isOnboarded && pathname !== "/onboarding") {
                console.log("Redirecting to /onboarding");
                router.push("/onboarding");
            }

            // Explicitly allow access to /onboarding if onboarded (do not redirect away)
            if (isLoggedIn && isOnboarded && pathname === "/onboarding") {
                console.log("User is onboarded but checking /onboarding. Allow access.");
            }
        }
    }, [isOnboarded, isLoggedIn, isLoading, router, pathname]);

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-50">Loading...</div>;
    }

    if (!isLoggedIn) {
        return null;
    }

    if (!isOnboarded && pathname !== "/onboarding") {
        return null;
    }

    return <>{children}</>;
}
