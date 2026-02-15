import { Sidebar } from "@/components/Sidebar";
import { OnboardingPopup } from "@/components/OnboardingPopup";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ProtectedRoute>
            <div className="flex min-h-screen bg-slate-950 text-slate-200">
                <Sidebar />
                <main className="flex-1 h-screen overflow-y-auto w-full">
                    {children}
                    <OnboardingPopup />
                </main>
            </div>
        </ProtectedRoute>
    );
}
