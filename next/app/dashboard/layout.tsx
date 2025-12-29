import Sidebar from '@/components/dashboard/Sidebar';
import { Suspense } from 'react';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-[#F9FAFB]">
            <Suspense fallback={<div className="w-72 border-r border-gray-100 bg-white" />}>
                <Sidebar />
            </Suspense>
            <div className="flex-1 flex flex-col min-w-0">
                {children}
            </div>
        </div>
    );
}
