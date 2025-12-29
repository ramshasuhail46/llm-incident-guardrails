'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    ChevronLeft,
    Clock,
    Bot,
    Activity,
    ShieldCheck,
    AlertCircle,
    Info,
    ExternalLink,
    Code2
} from 'lucide-react';
import { useWorkspace } from '@/hooks/useWorkspace';

interface ReportData {
    id: string;
    incidentId: string;
    createdAt: string;
    severity: string;
    status: string;
    rawSignals: any;
    aiDiagnosis: any;
    confidenceScore: number;
    suggestedAction: string;
    project: {
        name: string;
    };
    auditLogs: {
        id: string;
        action: string;
        details: string;
        createdAt: string;
        user: {
            email: string;
        };
    }[];
}

export default function IncidentReport() {
    const { slug, id: projectId, incidentId } = useParams() as { slug: string, id: string, incidentId: string };
    const router = useRouter();
    const { isDemo } = useWorkspace();
    const [report, setReport] = useState<ReportData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchReport() {
            try {
                const res = await fetch(`/api/incidents/${incidentId}/report${isDemo ? '?demo=true' : ''}`);
                const data = await res.json();
                setReport(data);
            } catch (err) {
                console.error("Failed to fetch report:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchReport();
    }, [incidentId, isDemo]);

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (!report) return (
        <div className="p-8 text-center text-gray-500 italic">Report not found</div>
    );

    return (
        <div className="min-h-screen bg-[#F3F4F6] p-8">
            <div className="max-w-5xl mx-auto">
                {/* Back Button & Header */}
                <div className="mb-10">
                    <button
                        onClick={() => router.push(`/org/${slug}/proj/${projectId}/history${isDemo ? '?demo=true' : ''}`)}
                        className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 font-bold text-xs uppercase tracking-widest mb-4 transition-all"
                    >
                        <ChevronLeft size={16} />
                        Back to Archive
                    </button>
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-3xl font-black text-gray-900 tracking-tight leading-none uppercase">
                                    Full Report
                                </h1>
                                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest border border-gray-200">
                                    {report.project.name}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <code className="text-sm font-bold text-blue-600">#{report.incidentId}</code>
                                <span className="text-gray-300">|</span>
                                <span className="text-gray-400 text-xs font-medium">Internal Reference: {incidentId}</span>
                            </div>
                        </div>
                        <div className={`px-4 py-2 rounded-xl border-2 flex flex-col items-end ${report.severity === 'CRITICAL' ? 'border-red-500/20 bg-red-50' : 'border-gray-200 bg-white'
                            }`}>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Severity</span>
                            <span className={`text-xl font-black ${report.severity === 'CRITICAL' ? 'text-red-600' : 'text-gray-900'
                                }`}>{report.severity}</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Technical Analysis */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Summary Card */}
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
                            <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <AlertCircle size={14} className="text-primary" />
                                Executive Summary
                            </h2>
                            <p className="text-lg text-gray-800 font-medium leading-relaxed mb-8 italic border-l-4 border-primary/20 pl-6">
                                "{report.aiDiagnosis?.issue || 'No issue summary available'}"
                            </p>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Impact Scope</span>
                                    <span className="text-sm text-gray-700 font-bold">{report.aiDiagnosis?.impact || 'Unknown'}</span>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Confidence Score</span>
                                    <span className="text-sm font-black text-primary">{(report.confidenceScore * 100).toFixed(1)}%</span>
                                </div>
                            </div>
                        </div>

                        {/* Raw Data Section */}
                        <div className="bg-gray-900 rounded-2xl border border-gray-800 shadow-2xl p-8">
                            <h2 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <Code2 size={14} className="text-blue-400" />
                                Technical Payload
                            </h2>
                            <div className="space-y-6">
                                <div>
                                    <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest block mb-2">Diagnosis Metadata</span>
                                    <pre className="bg-black/50 p-4 rounded-xl text-[11px] text-blue-400 font-mono overflow-x-auto border border-white/5">
                                        {JSON.stringify(report.aiDiagnosis, null, 2)}
                                    </pre>
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest block mb-2">Ingested Signals</span>
                                    <pre className="bg-black/50 p-4 rounded-xl text-[11px] text-green-400 font-mono overflow-x-auto border border-white/5">
                                        {JSON.stringify(report.rawSignals, null, 2)}
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Timeline & Registry */}
                    <div className="space-y-8">
                        {/* Timeline Registry */}
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
                            <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-8 flex items-center gap-2 relative z-10">
                                <Activity size={14} className="text-primary" />
                                Event Timeline
                            </h2>

                            <div className="space-y-12 relative">
                                {/* Vertical Line */}
                                <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gray-100"></div>

                                {/* Start Event */}
                                <div className="relative flex gap-4">
                                    <div className="w-6 h-6 rounded-full bg-blue-50 border-2 border-blue-200 flex items-center justify-center shrink-0 relative z-10 bg-white">
                                        <Info size={12} className="text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-tight mb-0.5">Detection</p>
                                        <p className="text-xs font-bold text-gray-900">Incident Signals Received</p>
                                        <p className="text-[10px] text-gray-400 font-medium">{new Date(report.createdAt).toLocaleString()}</p>
                                    </div>
                                </div>

                                {/* AI Event */}
                                <div className="relative flex gap-4">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center shrink-0 relative z-10 bg-white">
                                        <Bot size={12} className="text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-primary uppercase tracking-tight mb-0.5">AI Analysis</p>
                                        <p className="text-xs font-bold text-gray-900">Automated Diagnosis Generated</p>
                                        <p className="text-[10px] text-gray-400 font-medium">Computed in 1.2s</p>
                                    </div>
                                </div>

                                {/* Resolution Event */}
                                {report.auditLogs.find((l: any) => l.action === 'RESOLVE_INCIDENT') ? (
                                    <div className="relative flex gap-4">
                                        <div className="w-6 h-6 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center shrink-0 relative z-10 bg-white">
                                            <ShieldCheck size={12} className="text-green-500" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-green-600 uppercase tracking-tight mb-0.5">Resolution</p>
                                            <p className="text-xs font-bold text-gray-900">Marked as Resolved</p>
                                            <p className="text-[10px] text-gray-400 font-medium">{new Date(report.auditLogs.find((l: any) => l.action === 'RESOLVE_INCIDENT')!.createdAt).toLocaleString()}</p>
                                            <div className="mt-2 text-[10px] bg-gray-50 p-2 rounded border border-gray-100 italic text-gray-500">
                                                Confirmed by {report.auditLogs.find((l: any) => l.action === 'RESOLVE_INCIDENT')?.user.email}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="relative flex gap-4 opacity-50">
                                        <div className="w-6 h-6 rounded-full bg-gray-50 border-2 border-gray-100 flex items-center justify-center shrink-0 relative z-10 bg-white text-gray-300">
                                            <Clock size={12} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-tight mb-0.5">Resolution</p>
                                            <p className="text-xs font-bold text-gray-400 italic">Pending Manual Review</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Suggested Action History */}
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                            <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <ExternalLink size={14} className="text-gray-400" />
                                Mitigation Strategy
                            </h2>
                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                <p className="text-xs text-gray-600 leading-relaxed font-medium">
                                    {report.suggestedAction || 'No mitigation steps were suggested by AI for this incident.'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
