'use client';

import DashboardNavbar from '@/components/dashboard/DashboardNavbar';
import TrendsChart from '@/components/dashboard/TrendsChart';
import IncidentList from '@/components/dashboard/IncidentList';
import KPIGrid from '@/components/dashboard/KPIGrid';
import AdvancedAnalytics from '@/components/dashboard/AdvancedAnalytics';
import { useWorkspace } from '@/hooks/useWorkspace';
import { useDashboardAnalytics } from '@/hooks/useDashboardAnalytics';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function DashboardContent() {
    const { slug, id } = useParams() as { slug?: string, id?: string };
    const { organizations, setWorkspace, activeProject, setIsSyncing, isDemo } = useWorkspace();
    const { stats, trends, analysis, isLoading } = useDashboardAnalytics();

    useEffect(() => {
        if (organizations.length > 0) {
            if (slug) {
                const org = organizations.find(o => o.slug === slug);
                if (!org) return;

                if (id) {
                    const project = org.projects.find(p => p.id === id);
                    if (project && (activeProject?.id !== id)) {
                        setIsSyncing(true);
                        setWorkspace(org, project);
                        setTimeout(() => setIsSyncing(false), 500);
                    }
                } else {
                    // All Projects view
                    if (activeProject !== null) {
                        setIsSyncing(true);
                        setWorkspace(org, null);
                        setTimeout(() => setIsSyncing(false), 500);
                    }
                }
            } else if (isDemo && !activeProject) {
                // Auto-select first org/project in demo mode if nothing selected
                const firstOrg = organizations[0];
                const firstProject = firstOrg.projects[0] || null;
                setIsSyncing(true);
                setWorkspace(firstOrg, firstProject);
                setTimeout(() => setIsSyncing(false), 500);
            }
        }
    }, [slug, id, organizations, setWorkspace, activeProject, setIsSyncing, isDemo]);

    return (
        <div className="min-h-screen bg-[#F9FAFB] selection:bg-primary/20 selection:text-primary">
            <DashboardNavbar />

            <main className="container mx-auto px-6 py-8">
                <div className="mb-10">
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">Active Incidents Overview</h1>
                    <p className="text-gray-500">Real-time monitoring of your infrastructure performance.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-8">
                        <KPIGrid stats={stats} loading={isLoading} />
                        <TrendsChart data={trends} loading={isLoading} />
                        <AdvancedAnalytics data={analysis} loading={isLoading} />
                    </div>

                    {/* Sidebar Area */}
                    <div className="lg:col-span-1 h-full lg:sticky lg:top-24">
                        <IncidentList />
                    </div>
                </div>
            </main>
        </div>
    );
}
