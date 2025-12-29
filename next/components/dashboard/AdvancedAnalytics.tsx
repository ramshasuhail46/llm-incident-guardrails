'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { Clock, AlertTriangle, BrainCircuit } from 'lucide-react';

interface AdvancedAnalyticsProps {
    data: {
        severityDistribution: { name: string; value: number }[];
        mttr: number;
        topAiIssues: { issue: string; count: number }[];
    };
    loading: boolean;
}

const COLORS = ['#ef4444', '#f59e0b', '#3b82f6', '#10b981'];

export default function AdvancedAnalytics({ data, loading }: AdvancedAnalyticsProps) {
    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white h-[300px] rounded-2xl border border-gray-100 shadow-sm animate-pulse"></div>
                ))}
            </div>
        );
    }

    const { severityDistribution, mttr, topAiIssues } = data || { severityDistribution: [], mttr: 0, topAiIssues: [] };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {/* Severity Distribution */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:border-primary/10 transition-colors">
                <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 bg-red-50 rounded-lg">
                        <AlertTriangle size={16} className="text-red-500" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm">Severity Distribution</h3>
                </div>
                <div className="h-[200px] w-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={severityDistribution}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {severityDistribution.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <RechartsTooltip />
                            <Legend verticalAlign="bottom" height={50} iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '10px', paddingTop: '16px' }} />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="text-center">
                            <span className="text-2xl font-bold text-gray-900">
                                {severityDistribution.reduce((acc, curr) => acc + curr.value, 0)}
                            </span>
                            <p className="text-[10px] text-gray-400 uppercase tracking-wider">Total</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* MTTR Card */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:border-primary/10 transition-colors flex flex-col items-center justify-center text-center relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-blue-500/10 transition-all"></div>

                <div className="p-4 bg-blue-50 rounded-full mb-6 relative z-10">
                    <Clock size={32} className="text-blue-500" />
                </div>

                <h3 className="text-gray-500 font-medium text-sm mb-2 relative z-10">Mean Time to Resolution</h3>
                <div className="flex items-baseline gap-1 relative z-10">
                    <span className="text-4xl font-bold text-gray-900">{mttr}</span>
                    <span className="text-sm text-gray-500 font-medium">min</span>
                </div>
                <p className="text-xs text-gray-400 mt-4 max-w-[200px] relative z-10">Average time from creation to resolution for resolved incidents.</p>
            </div>

            {/* Top AI Issues */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:border-primary/10 transition-colors">
                <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 bg-purple-50 rounded-lg">
                        <BrainCircuit size={16} className="text-purple-500" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm">Top AI Issues</h3>
                </div>
                <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={topAiIssues} layout="vertical" margin={{ left: 0, right: 30 }}>
                            <XAxis type="number" hide />
                            <YAxis
                                type="category"
                                dataKey="issue"
                                width={100}
                                tick={{ fontSize: 10, fill: '#6B7280' }}
                                interval={0}
                            />
                            <RechartsTooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', border: '1px solid #f3f4f6' }} />
                            <Bar dataKey="count" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={20} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
