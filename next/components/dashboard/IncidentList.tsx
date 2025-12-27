'use client';

import { useState, useEffect } from 'react';
import { Zap, Loader2, ChevronRight } from 'lucide-react';
import DiagnosisResultModal from './DiagnosisResultModal';

export default function IncidentList() {
    const [incidents] = useState([
        { id: 1, title: 'API Gateway Timeout', status: 'critical', time: '10 mins ago', color: 'bg-red-500' },
        { id: 2, title: 'Database latency increase', status: 'warning', time: '25 mins ago', color: 'bg-yellow-500' },
        { id: 3, title: 'Auth service healthy', status: 'resolved', time: '1 hour ago', color: 'bg-green-500' },
        { id: 4, title: 'S3 bucket access error', status: 'critical', time: '2 hours ago', color: 'bg-red-500' },
        { id: 5, title: 'Frontend build failure', status: 'warning', time: '3 hours ago', color: 'bg-yellow-500' },
    ]);

    const [diagnosingId, setDiagnosingId] = useState<number | null>(null);
    const [taskId, setTaskId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [diagnosisStatus, setDiagnosisStatus] = useState('PENDING');
    const [diagnosisResult, setDiagnosisResult] = useState<any>(null);

    const handleDiagnose = async (id: number) => {
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

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900">Recent Incidents</h3>
                <div className="flex gap-2">
                    <button className="text-xs font-bold bg-gray-50 text-gray-500 px-3 py-1.5 rounded-lg border border-gray-200">All Status</button>
                </div>
            </div>

            <div className="overflow-y-auto flex-1">
                {incidents.map((incident) => (
                    <div key={incident.id} className="p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                            <div className={`w-3 h-3 rounded-full ${incident.color} shadow-sm`}></div>
                            <div>
                                <h4 className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-1">{incident.title}</h4>
                                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Last {incident.time}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => handleDiagnose(incident.id)}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/5 text-primary text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all hover:bg-primary hover:text-white"
                            >
                                <Zap size={12} fill="currentColor" />
                                DIANGNOSE
                            </button>
                            <button className="p-1.5 text-gray-400 hover:text-gray-600 transition-all">
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                ))}
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
        </div>
    );
}
