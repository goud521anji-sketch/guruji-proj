"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Map, Calendar, Trophy, BarChart, Settings, BookOpen, LogOut, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOnboarding } from "@/context/OnboardingContext";
import { Button } from "@/components/ui/button";

const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: Map, label: "Learning Path", href: "/learning-path" },
    { icon: Briefcase, label: "Career", href: "/career" },
    { icon: Trophy, label: "Achievements", href: "/gamification" },
    { icon: BarChart, label: "Assessments", href: "/assessments" },
    { icon: Settings, label: "Settings", href: "/settings" },
];

export function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { isLoggedIn, logout } = useOnboarding();

    // Hide sidebar on public routes
    const publicRoutes = ["/", "/login", "/onboarding"];
    if (publicRoutes.includes(pathname)) return null;

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    return (
        <div className="flex h-screen w-64 flex-col border-r border-slate-800 bg-slate-950 flex-shrink-0">
            <div className="flex h-16 items-center border-b border-slate-800 px-6">
                <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl text-white">
                    <BookOpen className="h-6 w-6 text-blue-500" />
                    <span>Guruji</span>
                </Link>
            </div>
            <div className="flex-1 overflow-y-auto py-4">
                <nav className="grid items-start px-2 text-sm font-medium space-y-1">
                    {sidebarItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-slate-400 transition-all hover:text-white hover:bg-slate-800",
                                pathname === item.href && "bg-slate-800 text-white"
                            )}
                        >
                            <item.icon className="h-4 w-4" />
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </div>
            <div className="border-t border-slate-800 p-4">
                <Button
                    variant="ghost"
                    className="w-full justify-start text-slate-400 hover:text-red-400 hover:bg-slate-900"
                    onClick={handleLogout}
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </Button>
            </div>
        </div>
    );
}
