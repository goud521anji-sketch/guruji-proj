"use client";

import { useEffect } from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        // Enforce dark mode as per requirements
        document.documentElement.classList.add("dark");
    }, []);

    return <>{children}</>;
}
