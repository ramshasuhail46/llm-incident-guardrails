import Sidebar from '../../components/dashboard/Sidebar';
import DemoBanner from '../../components/dashboard/DemoBanner';
import { Suspense } from 'react';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen">
            <DemoBanner />
            <div className="flex flex-1 bg-[#F9FAFB]">
                <Suspense fallback={<div className="w-72 border-r border-gray-100 bg-white" />}>
                    <Sidebar />
                </Suspense>
                <div className="flex-1 flex flex-col min-w-0">
                    {children}
                </div>
            </div>
        </div>
    );
}
