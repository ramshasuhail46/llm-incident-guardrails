import { X, CheckCircle, AlertTriangle, Info, Clock, Shield, Brain, Lock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useWorkspace } from '@/hooks/useWorkspace';

interface IncidentDetailProps {
    isOpen: boolean;
    onClose: () => void;
    incident: any;
    onResolve: (id: string) => void;
}

export default function IncidentDetail({ isOpen, onClose, incident, onResolve }: IncidentDetailProps) {
    const { isDemo } = useWorkspace();
    const [isResolving, setIsResolving] = useState(false);

    if (!incident) return null;

    const getSeverityStyles = (severity: string) => {
        switch (severity.toUpperCase()) {
            case 'CRITICAL': return 'text-red-600 bg-red-50 border-red-100';
            case 'HIGH': return 'text-orange-600 bg-orange-50 border-orange-100';
            case 'MEDIUM': return 'text-yellow-600 bg-yellow-50 border-yellow-100';
            default: return 'text-blue-600 bg-blue-50 border-blue-100';
        }
    };

    const handleResolve = async () => {
        if (isDemo) return;
        setIsResolving(true);
        try {
            await onResolve(incident.id);
            onClose();
        } catch (error) {
            console.error('Failed to resolve incident:', error);
        } finally {
            setIsResolving(false);
        }
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 z-40 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            ></div>

            {/* Slide-over */}
            <div className={`fixed inset-y-0 right-0 w-full max-w-lg bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="h-full flex flex-col">
                    {/* Header */}
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className={`px-2 py-1 rounded text-[10px] font-bold border ${getSeverityStyles(incident.severity || 'INFO')}`}>
                                    {incident.severity || 'INFO'}
                                </span>
                                <span className="text-xs text-gray-400 font-medium">#{incident.incidentId}</span>
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">{incident.title}</h2>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-8">
                        {/* AI Diagnosis */}
                        <section>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="p-1.5 bg-primary/10 text-primary rounded-lg">
                                    <Brain size={18} />
                                </div>
                                <h3 className="font-bold text-gray-900">AI Diagnosis</h3>
                            </div>
                            <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
                                {incident.aiDiagnosis ? (
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Issue Summary</p>
                                            <p className="text-sm text-gray-700 leading-relaxed">
                                                {typeof incident.aiDiagnosis === 'object' ? incident.aiDiagnosis.issue : incident.aiDiagnosis}
                                            </p>
                                        </div>
                                        {incident.aiDiagnosis.root_cause && (
                                            <div>
                                                <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Root Cause</p>
                                                <p className="text-sm text-gray-700 leading-relaxed">{incident.aiDiagnosis.root_cause}</p>
                                            </div>
                                        )}
                                        {incident.suggestedAction && (
                                            <div className="pt-4 border-t border-primary/10">
                                                <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Suggested Action</p>
                                                <div className="flex gap-2">
                                                    <Shield size={16} className="text-primary shrink-0 mt-0.5" />
                                                    <p className="text-sm text-gray-700">{incident.suggestedAction}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="text-center py-4">
                                        <p className="text-sm text-gray-500 italic">No AI diagnosis available yet. Click "Diagnose" in the list to generate one.</p>
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* Incident Metrics */}
                        <section className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl border border-gray-100 bg-white shadow-sm">
                                <div className="flex items-center gap-2 text-gray-400 mb-1">
                                    <Clock size={14} />
                                    <span className="text-[10px] font-bold uppercase">Detected At</span>
                                </div>
                                <p className="text-sm font-semibold text-gray-900">
                                    {new Date(incident.time || incident.createdAt).toLocaleString()}
                                </p>
                            </div>
                            <div className="p-4 rounded-xl border border-gray-100 bg-white shadow-sm">
                                <div className="flex items-center gap-2 text-gray-400 mb-1">
                                    <AlertTriangle size={14} />
                                    <span className="text-[10px] font-bold uppercase">Confidence</span>
                                </div>
                                <p className="text-sm font-semibold text-gray-900">
                                    {incident.confidenceScore ? `${(incident.confidenceScore * 100).toFixed(0)}%` : 'N/A'}
                                </p>
                            </div>
                        </section>

                        {/* Raw Signals (Internal) */}
                        <section>
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Info size={16} className="text-gray-400" />
                                Raw Data
                            </h3>
                            <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto">
                                <pre className="text-[10px] text-gray-300 font-mono">
                                    {JSON.stringify(incident.rawSignals || {}, null, 2)}
                                </pre>
                            </div>
                        </section>
                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                        {incident.status === 'RESOLVED' ? (
                            <div className="flex items-center justify-center gap-2 text-green-600 font-bold bg-green-50 py-3 rounded-xl border border-green-100">
                                <CheckCircle size={18} />
                                This incident is resolved
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <button
                                    onClick={handleResolve}
                                    disabled={isResolving || isDemo}
                                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isResolving ? (
                                        <span className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            RESOLVING...
                                        </span>
                                    ) : (
                                        <>
                                            {isDemo && <Lock size={16} className="text-gray-400" />}
                                            <CheckCircle size={18} />
                                            MARK AS RESOLVED
                                        </>
                                    )}
                                </button>
                                {isDemo && (
                                    <p className="text-[11px] text-center text-gray-500 font-medium">
                                        Action disabled in Demo Mode. Sign up to enable full features.
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
