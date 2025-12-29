import { Shield, Lock, FileText, UserCheck } from 'lucide-react';

export default function ComplianceSection() {
    return (
        <section className="py-24 bg-[#0A0A0A] relative">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

            <div className="container mx-auto px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Safety First: <span className="text-gradient">Human-in-the-Loop</span> Design
                        </h2>
                        <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                            For high-stakes industries like Banking and Healthcare, autonomy shouldn't mean lack of control. IncidentFlow is built with strict SRE Guardrails to ensure every AI action is safe, authorized, and fully auditable.
                        </p>

                        <div className="space-y-6">
                            {[
                                {
                                    title: "Granular Permissions",
                                    desc: "Define exactly what the AI can and cannot do based on environment and severity.",
                                    icon: <Lock className="w-5 h-5 text-blue-400" />
                                },
                                {
                                    title: "Audit Trails",
                                    desc: "Every recommendation and action is logged with timestamp, reasoning, and outcome.",
                                    icon: <FileText className="w-5 h-5 text-purple-400" />
                                },
                                {
                                    title: "Approval Workflows",
                                    desc: "Require human approval for high-impact actions in production environments.",
                                    icon: <UserCheck className="w-5 h-5 text-green-400" />
                                }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                    <div className="mt-1">{item.icon}</div>
                                    <div>
                                        <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                                        <p className="text-gray-400 text-sm">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        {/* Blueprint Visual */}
                        <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/20 backdrop-blur-sm">
                            <div className="absolute -top-4 -right-4 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full border border-blue-400 shadow-lg shadow-blue-500/20">
                                SECURE BLUPRINT
                            </div>

                            <div className="space-y-6 font-mono text-sm">
                                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                                    <span className="text-gray-400">Policy Check:</span>
                                    <span className="text-green-400 flex items-center gap-2">
                                        <Shield className="w-4 h-4" /> Passed
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-3 bg-black/40 rounded border border-white/10">
                                        <div className="text-gray-500 text-xs mb-1">Target</div>
                                        <div className="text-white">Prod-DB-01</div>
                                    </div>
                                    <div className="p-3 bg-black/40 rounded border border-white/10">
                                        <div className="text-gray-500 text-xs mb-1">Risk Level</div>
                                        <div className="text-orange-400">Moderate</div>
                                    </div>
                                </div>
                                <div className="p-4 bg-blue-500/10 rounded border border-blue-500/20 text-blue-200">
                                    <div className="text-xs text-blue-400 mb-2 uppercase tracking-wider">Guardrail Active</div>
                                    "Restarting primary database requires <strong>Level 3</strong> approval."
                                </div>
                                <div className="flex justify-end">
                                    <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded text-xs border border-white/20 transition-colors">
                                        Request Approval
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
