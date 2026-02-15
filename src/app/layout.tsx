import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClientProviders } from "@/components/ClientProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Guruji - Learning Roadmap Finder",
    description: "Find your personalized learning path",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body className={inter.className}>
                <ClientProviders>
                    {children}
                </ClientProviders>
            </body>
        </html>
    );
}
