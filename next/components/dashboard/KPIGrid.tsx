'use client';

import { motion } from 'framer-motion';
import { Activity, Zap, CheckCircle } from 'lucide-react';

interface InsightCardProps {
    title: string;
    value: string | number;
    subtitle: string;
    icon: React.ReactNode;
    trend?: string;
    trendType?: 'positive' | 'negative' | 'neutral';
    color: string;
    loading?: boolean;
}

function InsightCard({ title, value, subtitle, icon, trend, trendType = 'neutral', color, loading }: InsightCardProps) {
    if (loading) {
        return (
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-[160px] flex flex-col justify-between animate-pulse">
                <div className="flex justify-between items-start">
                    <div className="h-4 w-24 bg-gray-100 rounded"></div>
                    <div className="h-10 w-10 bg-gray-100 rounded-full"></div>
                </div>
                <div>
                    <div className="h-8 w-16 bg-gray-100 rounded mb-2"></div>
                    <div className="h-3 w-32 bg-gray-100 rounded"></div>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm glass hover:border-primary/10 transition-colors duration-300 relative overflow-hidden group"
        >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-${color}-500/5 rounded-full blur-3xl -mr-16 -mt-16 transition-all duration-500 group-hover:bg-${color}-500/10`}></div>

            <div className="flex justify-between items-start mb-4 relative z-10">
                <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
                <div className={`p-2 bg-${color}-50 rounded-lg text-${color}-600`}>
                    {icon}
                </div>
            </div>

            <div className="relative z-10">
                <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-3xl font-bold text-gray-900">{value}</span>
                    {trend && (
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${trendType === 'positive' ? 'bg-green-50 text-green-600' :
                            trendType === 'negative' ? 'bg-red-50 text-red-600' :
                                'bg-gray-50 text-gray-600'
                            }`}>
                            {trend}
                        </span>
                    )}
                </div>
                <p className="text-xs text-gray-500">{subtitle}</p>
            </div>
        </motion.div>
    );
}

export default function KPIGrid({ stats, loading }: { stats: any, loading: boolean }) {
    // Helper to calculate confidence color
    const getConfidenceColor = (score: number) => {
        if (score > 0.9) return 'green';
        if (score > 0.7) return 'yellow';
        return 'orange';
    };

    const confidenceScore = stats?.avgConfidence || 0;
    const confidenceColor = getConfidenceColor(confidenceScore);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <InsightCard
                title="Total Incidents"
                value={stats?.total || 0}
                subtitle={`${stats?.active || 0} currently active`}
                icon={<Activity size={20} />}
                trend={stats?.activeTrend ? `+${stats.activeTrend}% vs last week` : undefined}
                trendType="neutral"
                color="blue"
                loading={loading}
            />

            <InsightCard
                title="Average AI Confidence"
                value={`${(confidenceScore * 100).toFixed(1)}%`}
                subtitle="Based on recent AI diagnoses"
                icon={<Zap size={20} />}
                trend={confidenceScore > 0.8 ? "High Confidence" : "Needs Review"}
                trendType={confidenceScore > 0.8 ? 'positive' : 'negative'}
                color={confidenceColor}
                loading={loading}
            />

            <InsightCard
                title="System Uptime"
                value={`${stats?.uptime || 100}%`}
                subtitle="Last 30 days"
                icon={<CheckCircle size={20} />}
                trend="Stable"
                trendType="positive"
                color="green"
                loading={loading}
            />
        </div>
    );
}
