"use client";

import { useState } from 'react';
import { AlertCircle, CheckCircle, Clock, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BeforeAfterToggle() {
    const [mode, setMode] = useState<'legacy' | 'incidentflow'>('legacy');

    return (
        <section className="py-24 bg-gray-900/50">
            <div className="container mx-auto px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                        The <span className="text-gradient">IncidentFlow</span> Difference
                    </h2>

                    {/* Toggle Switch */}
                    <div className="inline-flex p-1 bg-white/10 rounded-full border border-white/5 backdrop-blur-sm">
                        <button
                            onClick={() => setMode('legacy')}
                            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${mode === 'legacy'
                                    ? 'bg-red-500/20 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.3)] border border-red-500/30'
                                    : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            <Clock className="w-4 h-4" />
                            Legacy Way
                        </button>
                        <button
                            onClick={() => setMode('incidentflow')}
                            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${mode === 'incidentflow'
                                    ? 'bg-primary/20 text-primary shadow-[0_0_20px_rgba(168,85,247,0.3)] border border-primary/30'
                                    : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            <Zap className="w-4 h-4" />
                            IncidentFlow
                        </button>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="relative bg-[#0F0F0F] rounded-2xl border border-white/5 p-8 overflow-hidden min-h-[400px]">
                        <AnimatePresence mode="wait">
                            {mode === 'legacy' ? (
                                <motion.div
                                    key="legacy"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="space-y-8"
                                >
                                    <div className="flex items-center justify-between text-red-500/50 mb-8 font-mono text-sm">
                                        <span>STATUS: CRITICAL</span>
                                        <span>MTTR: 4h 15m</span>
                                    </div>

                                    {/* Timeline Items */}
                                    <div className="relative pl-8 border-l border-red-900/30 space-y-12">
                                        <div className="relative">
                                            <div className="absolute -left-[37px] top-1 w-4 h-4 rounded-full bg-red-500" />
                                            <div className="bg-red-950/20 p-4 rounded-lg border border-red-900/30">
                                                <div className="text-red-400 font-bold mb-1">03:14 AM - Alert Spike</div>
                                                <p className="text-gray-400 text-sm">Pageduty triggers 47 alerts from various services.</p>
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <div className="absolute -left-[37px] top-1 w-4 h-4 rounded-full bg-red-900" />
                                            <div className="bg-red-950/10 p-4 rounded-lg border border-red-900/10 opacity-70">
                                                <div className="text-red-300/80 font-bold mb-1">03:45 AM - Investigation</div>
                                                <p className="text-gray-500 text-sm">On-call engineer wakes up, checks logs manually.</p>
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <div className="absolute -left-[37px] top-1 w-4 h-4 rounded-full bg-red-900" />
                                            <div className="bg-red-950/10 p-4 rounded-lg border border-red-900/10 opacity-70">
                                                <div className="text-red-300/80 font-bold mb-1">05:30 AM - Identifying Root Cause</div>
                                                <p className="text-gray-500 text-sm">Database connection pool exhaustion identified.</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="incidentflow"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-8"
                                >
                                    <div className="flex items-center justify-between text-primary mb-8 font-mono text-sm">
                                        <span>STATUS: RESOLVED</span>
                                        <span>MTTR: 45s</span>
                                    </div>

                                    {/* Timeline Items */}
                                    <div className="relative pl-8 border-l border-primary/30 space-y-6">
                                        <div className="relative">
                                            <div className="absolute -left-[37px] top-1 w-4 h-4 rounded-full bg-primary animate-pulse shadow-[0_0_10px_#a855f7]" />
                                            <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                                                <div className="text-primary font-bold mb-1 flex items-center gap-2">
                                                    03:14:00 AM - Anomaly Detected
                                                    <span className="text-xs bg-primary/20 px-2 py-0.5 rounded text-white">AI</span>
                                                </div>
                                                <p className="text-gray-300 text-sm">IncidentFlow groups alerts & identifies DB pool exhaustion.</p>
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <div className="absolute -left-[37px] top-1 w-4 h-4 rounded-full bg-green-500" />
                                            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                                                <div className="text-green-400 font-bold mb-1 flex items-center gap-2">
                                                    03:14:45 AM - Auto-Remediated
                                                    <CheckCircle className="w-4 h-4" />
                                                </div>
                                                <p className="text-gray-300 text-sm">Safe-restart guardrail triggered. Services recovered.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8 p-4 bg-[#0A0A0A] rounded-lg border border-white/10 text-center">
                                        <p className="text-gray-400 text-sm">
                                            Outcome: <span className="text-white font-semibold">Zero downtime, engineer slept through the night.</span>
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
