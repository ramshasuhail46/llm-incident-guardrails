import { X, CheckCircle, AlertTriangle, Info } from 'lucide-react';

interface DiagnosisResultModalProps {
    isOpen: boolean;
    onClose: () => void;
    result: any;
    status: string;
}

export default function DiagnosisResultModal({ isOpen, onClose, result, status }: DiagnosisResultModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-all duration-300">
            <div
                className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl transform transition-all scale-100 animate-in fade-in zoom-in duration-300"
            >
                <div className="relative p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                            <CheckCircle size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">AI Diagnosis Result</h3>
                            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Status: {status}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-8 max-h-[70vh] overflow-y-auto">
                    {status === 'SUCCESS' && result ? (
                        <div className="space-y-6">
                            {/* Summary Section */}
                            <div className="p-4 bg-primary/5 border border-primary/10 rounded-2xl">
                                <h4 className="flex items-center gap-2 text-sm font-bold text-primary mb-2">
                                    <Info size={16} /> Summary
                                </h4>
                                <p className="text-gray-700 leading-relaxed text-sm italic">
                                    "{result.summary || 'No summary available.'}"
                                </p>
                            </div>

                            {/* Analysis Section */}
                            <div>
                                <h4 className="text-lg font-bold text-gray-900 mb-4">Root Cause Analysis</h4>
                                <div className="space-y-6">
                                    {result.hypotheses && result.hypotheses.map((hypo: any, index: number) => (
                                        <div key={index} className="p-5 bg-white border border-gray-100 rounded-2xl shadow-sm">
                                            <div className="flex justify-between items-start mb-3">
                                                <h5 className="font-bold text-gray-900 flex items-center gap-2">
                                                    <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px]">{hypo.rank}</span>
                                                    {hypo.cause}
                                                </h5>
                                                <span className="text-[10px] font-bold bg-green-50 text-green-600 px-2 py-1 rounded-md uppercase tracking-wide">
                                                    {Math.round(hypo.confidence * 100)}% Match
                                                </span>
                                            </div>

                                            <div className="space-y-4">
                                                <div>
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Evidence</p>
                                                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                                        {hypo.evidence.map((ev: string, i: number) => (
                                                            <li key={i}>{ev}</li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <div className="pt-3 border-t border-gray-50">
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Mitigation Strategy</p>
                                                    <p className="text-sm text-gray-700 leading-relaxed font-medium">
                                                        {hypo.mitigation_strategy}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : status === 'PENDING' ? (
                        <div className="py-20 flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-6"></div>
                            <h4 className="text-xl font-bold text-gray-900 mb-2">Analyzing Signals...</h4>
                            <p className="text-gray-500 max-w-xs">Our reasoning engine is processing incident data to generate a root cause analysis.</p>
                        </div>
                    ) : (
                        <div className="py-20 flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-500 mb-6 font-bold text-2xl">!</div>
                            <h4 className="text-xl font-bold text-gray-900 mb-2">Diagnosis Failed</h4>
                            <p className="text-gray-500 max-w-xs">An error occurred while attempting to diagnose this incident. Please try again later.</p>
                        </div>
                    )}
                </div>

                <div className="p-6 bg-gray-50/50 border-t border-gray-100 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-gray-800 transition-all shadow-lg shadow-gray-900/10"
                    >
                        Acknowledge & Close
                    </button>
                </div>
            </div>
        </div>
    );
}
