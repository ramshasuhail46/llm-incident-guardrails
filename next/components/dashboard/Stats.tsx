'use client';

import { useDashboardAnalytics } from '@/hooks/useDashboardAnalytics';
import { useWorkspace } from '@/hooks/useWorkspace';

export default function Stats() {
    const { stats, isLoading, activeProject } = useDashboardAnalytics();
    const { isSyncing } = useWorkspace();

    const showSkeleton = isLoading || isSyncing;

    if (showSkeleton) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2].map((i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm animate-pulse">
                        <div className="h-4 w-24 bg-gray-100 rounded mb-4"></div>
                        <div className="h-8 w-16 bg-gray-200 rounded"></div>
                        <div className="mt-4 h-1.5 w-full bg-gray-50 rounded-full"></div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm group hover:border-primary/20 transition-all duration-300">
                <h3 className="text-gray-500 text-sm font-medium mb-1">Active Incidents</h3>
                <div className="flex items-end gap-3">
                    <span className="text-4xl font-bold text-gray-900 group-hover:scale-110 transition-transform origin-bottom-left inline-block">
                        {stats?.active || 0}
                    </span>
                    <span className={`text-xs font-bold ${stats?.activeTrend > 0 ? 'text-red-500' : 'text-green-500'} mb-1.5 flex items-center gap-0.5`}>
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        {stats?.activeTrend}%
                    </span>
                </div>
                <div className="mt-4 w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all duration-1000 ease-out" style={{ width: `${Math.min((stats?.active / stats?.total) * 100, 100) || 0}%` }}></div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm group hover:border-secondary/20 transition-all duration-300">
                <h3 className="text-gray-500 text-sm font-medium mb-1">Total Incidents</h3>
                <div className="flex items-end gap-3">
                    <span className="text-4xl font-bold text-gray-900 group-hover:scale-110 transition-transform origin-bottom-left inline-block">
                        {stats?.total || 0}
                    </span>
                    <span className="text-xs font-bold text-green-500 mb-1.5 flex items-center gap-0.5">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L9 12.586V5a1 1 0 112 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {stats?.totalTrend}%
                    </span>
                </div>
                <div className="mt-4 w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="w-full h-full bg-secondary rounded-full"></div>
                </div>
            </div>
        </div >
    );
}
