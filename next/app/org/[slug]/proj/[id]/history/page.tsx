'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    Search,
    Filter,
    Calendar,
    ChevronLeft,
    ChevronRight,
    FileText,
    AlertTriangle,
    CheckCircle2,
    Archive as ArchiveIcon,
    History
} from 'lucide-react';

interface Incident {
    id: string;
    incidentId: string;
    createdAt: string;
    severity: string;
    status: string;
    projectId: string;
    project: {
        name: string;
    };
    auditLogs: any[];
}

interface Pagination {
    total: number;
    pages: number;
    currentPage: number;
    limit: number;
}

export default function ProjectHistoryArchive() {
    const { slug, id: projectId } = useParams() as { slug: string; id: string };
    const router = useRouter();

    // State
    const [incidents, setIncidents] = useState<Incident[]>([]);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [loading, setLoading] = useState(true);

    // Filters
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [page, setPage] = useState(1);

    const fetchArchive = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                limit: '20',
                projectId: projectId
            });
            if (startDate) params.append('startDate', startDate);
            if (endDate) params.append('endDate', endDate);

            const res = await fetch(`/api/incidents/archive?${params.toString()}`);
            const data = await res.json();
            setIncidents(data.incidents || []);
            setPagination(data.pagination || null);
        } catch (err) {
            console.error("Failed to fetch archive:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArchive();
    }, [page, startDate, endDate]);

    const getSeverityStyles = (severity: string) => {
        switch (severity.toUpperCase()) {
            case 'CRITICAL': return 'bg-red-50 text-red-700 border-red-100';
            case 'HIGH': return 'bg-orange-50 text-orange-700 border-orange-100';
            case 'MEDIUM': return 'bg-yellow-50 text-yellow-700 border-yellow-100';
            default: return 'bg-gray-50 text-gray-700 border-gray-100';
        }
    };

    return (
        <div className="min-h-screen bg-[#F3F4F6] p-8">
            <div className="max-w-[1400px] mx-auto">
                {/* Header */}
                <div className="mb-8 flex justify-between items-center">
                    <div>
                        <div className="flex items-center gap-2 text-gray-400 mb-1">
                            <History size={16} />
                            <span className="text-xs font-bold uppercase tracking-widest">Project History</span>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Incident Registry</h1>
                    </div>
                </div>

                {/* Filter Bar */}
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6 flex flex-wrap gap-4 items-end">
                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 tracking-wider">Start Date</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => { setStartDate(e.target.value); setPage(1); }}
                            className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 tracking-wider">End Date</label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => { setEndDate(e.target.value); setPage(1); }}
                            className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
                        />
                    </div>
                    <button
                        onClick={() => { setStartDate(''); setEndDate(''); setPage(1); }}
                        className="px-4 py-2 text-sm font-bold text-gray-500 hover:text-gray-700"
                    >
                        Reset
                    </button>
                </div>

                {/* Data Table */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-100">
                                    <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider w-48">Date & Time</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider w-40">Incident ID</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider w-24">Severity</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Resolved By</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {loading ? (
                                    Array(10).fill(0).map((_, i) => (
                                        <tr key={i} className="animate-pulse">
                                            <td colSpan={5} className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-full"></div></td>
                                        </tr>
                                    ))
                                ) : incidents.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-gray-400 italic">No historical records found</td>
                                    </tr>
                                ) : (
                                    incidents.map((incident) => (
                                        <tr key={incident.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {new Date(incident.createdAt).toLocaleDateString()}
                                                </div>
                                                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">
                                                    {new Date(incident.createdAt).toLocaleTimeString()}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <code className="text-[11px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                                                    #{incident.incidentId}
                                                </code>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-0.5 rounded-[4px] text-[10px] font-black uppercase tracking-widest border ${getSeverityStyles(incident.severity)}`}>
                                                    {incident.severity}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                {incident.auditLogs?.[0]?.user ? (
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600 uppercase">
                                                            {incident.auditLogs[0].user.email.charAt(0)}
                                                        </div>
                                                        <span className="text-xs font-medium text-gray-700">{incident.auditLogs[0].user.email}</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest italic">Archived</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => router.push(`/org/${slug}/proj/${projectId}/history/${incident.id}`)}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 text-white rounded-lg text-xs font-bold hover:bg-gray-800 transition-all shadow-sm"
                                                >
                                                    <FileText size={14} />
                                                    View Report
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {pagination && pagination.pages > 1 && (
                        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/30">
                            <span className="text-xs font-medium text-gray-500">
                                Showing <span className="text-gray-900">{((page - 1) * 20) + 1}</span> to <span className="text-gray-900">{Math.min(page * 20, pagination.total)}</span> of <span className="text-gray-900">{pagination.total}</span> records
                            </span>
                            <div className="flex gap-2">
                                <button
                                    disabled={page === 1}
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    className="p-1.5 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition-all"
                                >
                                    <ChevronLeft size={16} />
                                </button>
                                <button
                                    disabled={page === pagination.pages}
                                    onClick={() => setPage(p => Math.min(pagination.pages, p + 1))}
                                    className="p-1.5 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition-all"
                                >
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
