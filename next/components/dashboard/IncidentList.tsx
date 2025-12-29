'use client';

import { useState, useEffect } from 'react';
import { Zap, Loader2, ChevronRight, Hash } from 'lucide-react';
import DiagnosisResultModal from './DiagnosisResultModal';
import IncidentDetail from './IncidentDetail';
import { useWorkspace } from '@/hooks/useWorkspace';

export default function IncidentList() {
    const { activeProject, isSyncing } = useWorkspace();
    const [incidents, setIncidents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [hasHydrated, setHasHydrated] = useState(false);

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'pending': return 'bg-gray-400';
            case 'diagnosing': return 'bg-blue-500';
            case 'diagnosed': return 'bg-yellow-500';
            case 'mitigated': return 'bg-primary';
            case 'resolved': return 'bg-green-500';
            default: return 'bg-gray-300';
        }
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);

        if (diffMins < 60) return `${diffMins} mins ago`;
        const diffHours = Math.floor(diffMins / 60);
        if (diffHours < 24) return `${diffHours} hours ago`;
        return date.toLocaleDateString();
    };

    useEffect(() => {
        async function fetchIncidents() {
            setLoading(true);
            try {
                const res = await fetch('/api/dashboard/incidents');
                const data = await res.json();
                setIncidents(data);
            } catch (err) {
                console.error("Failed to fetch incidents:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchIncidents();
        setHasHydrated(true);
    }, [activeProject]);

    const showSkeleton = loading || isSyncing;
    const showProjectBadge = !activeProject;

    const [diagnosingId, setDiagnosingId] = useState<string | null>(null);
    const [taskId, setTaskId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [diagnosisStatus, setDiagnosisStatus] = useState('PENDING');
    const [diagnosisResult, setDiagnosisResult] = useState<any>(null);

    const [selectedIncident, setSelectedIncident] = useState<any>(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const handleDiagnose = async (id: string) => {
        setDiagnosingId(id);
        setDiagnosisStatus('PENDING');
        setDiagnosisResult(null);
        setIsModalOpen(true);

        try {
            const response = await fetch('/api/diagnose', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    signals: {
                        incident_id: id,
                        title: incidents.find(i => i.id === id)?.title,
                        timestamp: new Date().toISOString(),
                    }
                }),
            });

            const data = await response.json();
            if (data.taskId) {
                setTaskId(data.taskId);
            } else {
                setDiagnosisStatus('FAILURE');
            }
        } catch (error) {
            console.error('Diagnosis request failed:', error);
            setDiagnosisStatus('FAILURE');
        }
    };

    useEffect(() => {
        if (!taskId || diagnosisStatus !== 'PENDING') return;

        const pollInterval = setInterval(async () => {
            try {
                const response = await fetch(`/api/diagnose/${taskId}`);
                const data = await response.json();

                if (data.status === 'SUCCESS') {
                    setDiagnosisStatus('SUCCESS');
                    setDiagnosisResult(data.result);
                    setTaskId(null);
                    clearInterval(pollInterval);
                } else if (data.status === 'FAILURE' || data.status === 'REVOKED') {
                    setDiagnosisStatus('FAILURE');
                    setTaskId(null);
                    clearInterval(pollInterval);
                }
            } catch (error) {
                console.error('Polling failed:', error);
                setDiagnosisStatus('FAILURE');
                clearInterval(pollInterval);
            }
        }, 2000);

        return () => clearInterval(pollInterval);
    }, [taskId, diagnosisStatus]);

    const handleRowClick = (incident: any) => {
        setSelectedIncident(incident);
        setIsDetailOpen(true);
    };

    const handleResolve = async (id: string) => {
        try {
            const res = await fetch(`/api/incidents/${id}/resolve`, {
                method: 'POST',
            });
            if (res.ok) {
                // Update local state
                setIncidents(prev => prev.map(inc => inc.id === id ? { ...inc, status: 'RESOLVED' } : inc));
            }
        } catch (error) {
            console.error('Failed to resolve incident:', error);
            throw error;
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full hover:border-primary/10 transition-colors duration-300">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900">Recent Incidents</h3>
                <div className="flex gap-2">
                    <button className="text-xs font-bold bg-gray-50 text-gray-400 px-3 py-1.5 rounded-lg border border-gray-100 cursor-not-allowed">All Status</button>
                </div>
            </div>

            <div className="overflow-y-auto flex-1 min-h-[400px]">
                {showSkeleton ? (
                    Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="p-4 border-b border-gray-50 animate-pulse flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-3 h-3 rounded-full bg-gray-100"></div>
                                <div>
                                    <div className="h-4 w-32 bg-gray-100 rounded mb-2"></div>
                                    <div className="h-2 w-24 bg-gray-50 rounded"></div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : !Array.isArray(incidents) ? (
                    <div className="p-8 text-center text-red-400 italic">
                        Failed to load incidents. Please check your database connection.
                    </div>
                ) : incidents.length === 0 ? (
                    <div className="p-8 text-center text-gray-400 italic">No incidents found</div>
                ) : (
                    incidents.map((incident) => (
                        <div
                            key={incident.id}
                            onClick={() => handleRowClick(incident)}
                            className="p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors flex items-center justify-between group cursor-pointer"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-3 h-3 rounded-full ${getStatusColor(incident.status)} shadow-sm`}></div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h4 className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-1">{incident.title}</h4>
                                        <p className="text-xs text-gray-400">{hasHydrated ? formatTime(incident.createdAt) : ''}</p>
                                        {showProjectBadge && (
                                            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-gray-100 text-[9px] font-bold text-gray-500 uppercase tracking-tight">
                                                <Hash size={10} />
                                                {incident.projectName}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                                        Last {formatTime(incident.time)}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDiagnose(incident.id);
                                    }}
                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/5 text-primary text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all hover:bg-primary hover:text-white shadow-sm"
                                >
                                    <Zap size={12} fill="currentColor" />
                                    DIAGNOSE
                                </button>
                                <button className="p-1.5 text-gray-400 hover:text-gray-600 transition-all">
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <button className="p-4 text-xs font-bold text-primary hover:bg-primary/5 transition-colors border-t border-gray-50">
                View all incidents
            </button>

            <DiagnosisResultModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                result={diagnosisResult}
                status={diagnosisStatus}
            />

            <IncidentDetail
                isOpen={isDetailOpen}
                onClose={() => setIsDetailOpen(false)}
                incident={selectedIncident}
                onResolve={handleResolve}
            />
        </div>
    );
}
