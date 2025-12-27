'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { CheckCircle, AlertTriangle, Info, Loader2, Zap } from 'lucide-react';
import Navbar from '@/components/landing/Navbar';

export default function PublicReportPage() {
    const { id } = useParams();
    const [status, setStatus] = useState('PENDING');
    const [result, setResult] = useState<any>(null);

    useEffect(() => {
        if (!id || status !== 'PENDING') return;

        const pollInterval = setInterval(async () => {
            try {
                const response = await fetch(`/api/diagnose/${id}`);
                const data = await response.json();

                if (data.status === 'SUCCESS') {
                    setStatus('SUCCESS');
                    setResult(data.result);
                    clearInterval(pollInterval);
                } else if (data.status === 'FAILURE' || data.status === 'REVOKED') {
                    setStatus('FAILURE');
                    clearInterval(pollInterval);
                }
            } catch (error) {
                console.error('Polling failed:', error);
                setStatus('FAILURE');
                clearInterval(pollInterval);
            }
        }, 2000);

        return () => clearInterval(pollInterval);
    }, [id, status]);

    return (
        <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
            <Navbar />

            <main className="flex-1 flex flex-col items-center justify-center p-6 mt-20">
                <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="p-8 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                {status === 'PENDING' ? <Loader2 className="animate-spin" size={24} /> : <CheckCircle size={24} />}
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Incident Diagnosis Report</h1>
                                <p className="text-xs text-gray-400 font-medium uppercase tracking-widest mt-1">ID: {id}</p>
                            </div>
                        </div>
                        <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${status === 'SUCCESS' ? 'bg-green-100 text-green-600' :
                                status === 'FAILURE' ? 'bg-red-100 text-red-600' : 'bg-primary/10 text-primary animate-pulse'
                            }`}>
                            {status}
                        </div>
                    </div>

                    <div className="p-8">
                        {status === 'SUCCESS' && result ? (
                            <div className="space-y-8">
                                {/* Summary */}
                                <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                                    <h2 className="flex items-center gap-2 text-primary font-bold mb-4">
                                        <Info size={18} /> Executive Summary
                                    </h2>
                                    <p className="text-gray-700 leading-relaxed italic text-lg">
                                        "{result.summary || 'No summary provided.'}"
                                    </p>
                                </div>

                                {/* Hypotheses */}
                                <div className="space-y-6">
                                    <h2 className="text-xl font-bold text-gray-900">Root Cause Analysis</h2>
                                    {result.hypotheses && result.hypotheses.map((hypo: any, idx: number) => (
                                        <div key={idx} className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                            <div className="flex justify-between items-start mb-4">
                                                <h3 className="flex items-center gap-3 font-bold text-gray-900">
                                                    <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs">{hypo.rank}</span>
                                                    {hypo.cause}
                                                </h3>
                                                <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-lg">
                                                    {Math.round(hypo.confidence * 100)}% Match
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Technical Evidence</p>
                                                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                                        {hypo.evidence.map((ev: string, i: number) => (
                                                            <li key={i}>{ev}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div className="md:border-l md:border-gray-50 md:pl-6">
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Resolution Path</p>
                                                    <p className="text-sm text-gray-700 font-medium leading-relaxed">
                                                        {hypo.mitigation_strategy}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : status === 'PENDING' ? (
                            <div className="py-24 flex flex-col items-center text-center">
                                <div className="w-20 h-20 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-8"></div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">Analyzing Incident Signals</h2>
                                <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
                                    The IncidentFlow reasoning engine is currently processing the data. This usually takes around 30-60 seconds.
                                </p>
                            </div>
                        ) : (
                            <div className="py-24 flex flex-col items-center text-center">
                                <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-8">
                                    <AlertTriangle size={40} />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">Analysis Failed</h2>
                                <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
                                    We encountered an issue while processing this report. Please verify the incident data and try again.
                                </p>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="mt-8 px-8 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-all"
                                >
                                    Retry Analysis
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="p-6 bg-gray-50/50 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                        <p>© 2025 IncidentFlow Inc. AI-Generated Incident Diagnosis.</p>
                        <div className="flex gap-6">
                            <a href="#" className="hover:text-primary transition-colors">Documentation</a>
                            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
