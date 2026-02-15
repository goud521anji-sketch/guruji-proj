import ProtectedRoute from "@/components/ProtectedRoute";

import DashboardLayout from "@/app/(dashboard)/layout";

export default function RoadmapsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ProtectedRoute>
            <DashboardLayout>{children}</DashboardLayout>
        </ProtectedRoute>
    );
}
