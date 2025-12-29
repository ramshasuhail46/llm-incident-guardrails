'use client';

import { BarChart3, Loader2 } from 'lucide-react';
import { useDashboardAnalytics } from '@/hooks/useDashboardAnalytics';

export default function TopIssues() {
    const { analysis, isLoading } = useDashboardAnalytics();
    const data = analysis?.topAiIssues || [];

    if (isLoading) {
        return (
            <div className="h-48 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center justify-center">
                <Loader2 className="animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col h-full">
            <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                <BarChart3 size={16} className="text-primary" />
                AI Analysis: Top Issues
            </h3>
            <div className="space-y-3 flex-1 overflow-y-auto">
                {data.map((issue: any, i: number) => (
                    <div key={i} className="relative group">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-[10px] font-bold text-gray-700 truncate max-w-[80%]">{issue.issue}</span>
                            <span className="text-[10px] font-bold text-primary">{issue.count}</span>
                        </div>
                        <div className="w-full h-2 bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                            <div
                                className="h-full bg-primary/40 group-hover:bg-primary transition-all duration-500 rounded-full"
                                style={{ width: `${Math.min((issue.count / data[0].count) * 100, 100)}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
                {data.length === 0 && <p className="text-[10px] text-gray-400 italic text-center mt-8">No analysis data available</p>}
            </div>
        </div>
    );
}
