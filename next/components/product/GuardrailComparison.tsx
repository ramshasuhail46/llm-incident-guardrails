import { AlertTriangle, ShieldCheck, Terminal, XCircle } from 'lucide-react';

export default function GuardrailComparison() {
    return (
        <section className="bg-black py-24 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        AI with <span className="text-primary">Boundaries</span>
                    </h2>
                    <p className="text-gray-400 text-lg">
                        See how IncidentFlow intercepts risky actions before they touch production.
                    </p>
                </div>

                <div className="max-w-5xl mx-auto">
                    <div className="rounded-xl overflow-hidden border border-gray-800 bg-[#0A0A0A] shadow-2xl">
                        {/* Terminal Header */}
                        <div className="flex items-center justify-between px-4 py-3 bg-[#1E1E1E] border-b border-gray-800">
                            <div className="flex items-center gap-2">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                </div>
                                <div className="ml-4 flex items-center gap-2 text-xs text-gray-400 font-mono">
                                    <Terminal className="w-3 h-3" />
                                    <span>incident_response_log.sh</span>
                                </div>
                            </div>
                            <div className="text-xs text-gray-500 font-mono">LIVE MONITORING</div>
                        </div>

                        {/* Split View */}
                        <div className="grid md:grid-cols-2">

                            {/* Left: AI Suggestion (High Risk) */}
                            <div className="p-8 border-r border-gray-800 bg-red-500/5 relative">
                                <div className="absolute top-4 right-4 px-2 py-1 bg-red-500/10 text-red-400 text-xs font-mono rounded border border-red-500/20 flex items-center gap-1">
                                    <AlertTriangle className="w-3 h-3" />
                                    HIGH RISK
                                </div>
                                <h3 className="text-gray-400 text-sm font-mono mb-4 uppercase tracking-wider">AI Suggestion</h3>

                                <div className="font-mono text-sm space-y-4">
                                    <div>
                                        <span className="text-purple-400">Analysis:</span>
                                        <span className="text-gray-300 ml-2">High memory usage detected in DB cluster.</span>
                                    </div>
                                    <div>
                                        <span className="text-purple-400">Action:</span>
                                        <span className="text-red-400 ml-2">Restart primary database instance immediately.</span>
                                    </div>
                                    <div className="p-3 bg-black/50 rounded text-red-300 border border-red-900/50">
                                        $ sudo systemctl restart postgresql
                                    </div>
                                </div>
                            </div>

                            {/* Right: Guardrail Response (Intervention) */}
                            <div className="p-8 bg-green-500/5 relative overflow-hidden">
                                {/* Glowing Badge Effect */}
                                <div className="absolute top-0 right-0 p-24 bg-green-500/20 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2" />

                                <div className="absolute top-4 right-4 px-2 py-1 bg-green-500/10 text-green-400 text-xs font-mono rounded border border-green-500/20 flex items-center gap-1 shadow-[0_0_10px_rgba(34,197,94,0.2)]">
                                    <ShieldCheck className="w-3 h-3" />
                                    INTERCEPTED
                                </div>

                                <h3 className="text-gray-400 text-sm font-mono mb-4 uppercase tracking-wider">Guardrail Intervention</h3>

                                <div className="font-mono text-sm space-y-4">
                                    <div>
                                        <span className="text-green-400">Policy Check:</span>
                                        <span className="text-gray-300 ml-2">Production DB Restart Protection</span>
                                    </div>
                                    <div>
                                        <span className="text-green-400">Outcome:</span>
                                        <span className="text-white ml-2">Action Blocked.</span>
                                    </div>

                                    <div className="mt-4 p-4 bg-[#0A0A0A] rounded border border-green-500/30 shadow-lg relative">
                                        <div className="flex items-start gap-3">
                                            <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                                            <div>
                                                <p className="text-gray-300 mb-1">Prevented unsafe restart of primary database during peak hours.</p>
                                                <p className="text-gray-500 text-xs">Correction: Escalating to on-call engineer for manual approval.</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
