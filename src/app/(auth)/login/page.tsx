"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useOnboarding } from "@/context/OnboardingContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const { login } = useOnboarding();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Please enter both email and password.");
            return;
        }

        // Simulating login API call
        console.log("Logging in with", email);

        login(email);
        router.push("/onboarding");
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
            <div className="absolute top-0 left-0 w-full p-6">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl text-slate-900 dark:text-white w-fit">
                    <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    <span>Guruji</span>
                </Link>
            </div>
            <div className="flex-1 flex items-center justify-center p-4">
                <Card className="w-full max-w-md shadow-lg dark:bg-slate-900 dark:border-slate-800">
                    <CardHeader className="space-y-1">
                        <div className="flex justify-center mb-4">
                            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30">
                                <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-500" />
                            </div>
                        </div>
                        <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
                        <CardDescription className="text-center">
                            Enter your email to sign in to your account
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleLogin}>
                        <CardContent className="space-y-4">
                            {error && (
                                <div className="p-3 rounded-md bg-red-50 text-red-500 text-sm dark:bg-red-900/20 dark:text-red-400">
                                    {error}
                                </div>
                            )}
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Email
                                </label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="dark:bg-slate-950 dark:border-slate-800"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Password
                                </label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="dark:bg-slate-950 dark:border-slate-800"
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4">
                            <Button className="w-full" type="submit">Sign In</Button>
                            <div className="text-center text-sm text-slate-500 dark:text-slate-400">
                                Don&apos;t have an account?{" "}
                                <Link href="/register" className="text-blue-600 hover:underline dark:text-blue-500">
                                    Sign up
                                </Link>
                            </div>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
}
