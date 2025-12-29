import { Lock, Server, FileText, Zap, Workflow } from 'lucide-react';

export default function ReliabilitySection() {
    return (
        <section className="bg-black py-24 border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">

                    {/* Left: System Health Widget */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full opacity-20" />
                        <div className="relative bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 shadow-2xl">
                            <div className="flex items-center justify-between mb-8 pb-8 border-b border-white/5">
                                <div>
                                    <h3 className="text-white font-semibold text-lg">System Status</h3>
                                    <p className="text-sm text-gray-500">Last updated: Just now</p>
                                </div>
                                <div className="px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full text-sm font-medium flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    Operational
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-gray-400">API Uptime</span>
                                        <span className="text-white font-mono">99.99%</span>
                                    </div>
                                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-green-500 w-[99.9%]" />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-gray-400">Database Latency</span>
                                        <span className="text-white font-mono">42ms</span>
                                    </div>
                                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary w-[30%]" />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-gray-400">AI Inference Engine</span>
                                        <span className="text-white font-mono">Ready</span>
                                    </div>
                                    <div className="flex gap-[2px]">
                                        {[...Array(20)].map((_, i) => (
                                            <div key={i} className="h-2 flex-1 bg-green-500 rounded-sm opacity-90" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Trust & Security */}
                    <div className="pl-0 md:pl-8">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                            Trust & <span className="text-primary">Security</span>
                        </h2>
                        <p className="text-gray-400 mb-8 leading-relaxed">
                            Enterprise-grade security built-in from day one. Your data is encrypted, compliant, and always under your control.
                        </p>

                        <ul className="space-y-6">
                            <li className="flex items-start gap-4">
                                <div className="mt-1 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                                    <Lock className="w-4 h-4" />
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold mb-1">Authenticated by Clerk</h4>
                                    <p className="text-sm text-gray-400">Secure, best-in-class authentication and user management.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="mt-1 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                                    <Server className="w-4 h-4" />
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold mb-1">Prisma Postgres</h4>
                                    <p className="text-sm text-gray-400">Data residency in Seoul region with strict access controls.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="mt-1 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                                    <FileText className="w-4 h-4" />
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold mb-1">Audit Logging</h4>
                                    <p className="text-sm text-gray-400">Complete traceability of every AI action and human approval.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="mt-1 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                                    <Zap className="w-4 h-4" />
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold mb-1">Intelligent Noise Reduction</h4>
                                    <p className="text-sm text-gray-400">AI groups related alerts to reduce pager fatigue by 90% and focus on what matters.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="mt-1 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                                    <Workflow className="w-4 h-4" />
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold mb-1">Executable Runbooks</h4>
                                    <p className="text-sm text-gray-400">Turn static documentation into one-click remediation actions directly from the dashboard.</p>
                                </div>
                            </li>

                        </ul>
                    </div>

                </div>


            </div>
        </section>
    );
}
