"use client";

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Shield } from 'lucide-react';

const RAW_LOGS = [
    "[ERROR] 2025-12-29 21:18:21 connection_pool.go:142 - FATAL: remaining connection slots are reserved for non-replication superuser connections",
    "[WARN] 2025-12-29 21:18:22 pooler.go:88 - upstream connection limit reached (max_connections=500)",
    "[ERROR] 2025-12-29 21:18:22 api_gateway.js:301 - Failed to fetch database resources: socket hang up",
    "[DEBUG] 2025-12-29 21:18:23 health_check.py:12 - Service health check failed: Timeout after 5000ms",
    "[ERROR] 2025-12-29 21:18:23 metrics_worker.go:55 - Error flushing metrics to Prometheus: connection refused",
    "[INFO] 2025-12-29 21:18:24 scheduler.go:210 - Retrying failed job 8812 (attempt 5/10)",
    "[FATAL] 2025-12-29 21:18:25 server.js:99 - Uncaught TypeError: Cannot read property 'query' of undefined at /app/server.js:99:12",
];

// Duplicate for continuous scroll
const LOG_STREAM = [...RAW_LOGS, ...RAW_LOGS, ...RAW_LOGS, ...RAW_LOGS];

export default function NoiseVsSignal() {
    const [sliderPos, setSliderPos] = useState(50);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = (clientX: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const position = ((clientX - rect.left) / rect.width) * 100;
        setSliderPos(Math.max(0, Math.min(100, position)));
    };

    const handleMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);
    const handleTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX);

    return (
        <section className="py-24 bg-gray-50 overflow-hidden">
            <div className="container mx-auto px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Distill <span className="text-gradient">Noise</span> into <span className="text-gradient">Signal</span>
                    </h2>
                    <p className="text-gray-600">
                        Drag the slider to see how IncidentFlow's AI collapses thousands of chaotic logs into a single, actionable resolution.
                    </p>
                </div>

                <div
                    ref={containerRef}
                    onMouseMove={handleMouseMove}
                    onTouchMove={handleTouchMove}
                    className="relative max-w-5xl mx-auto h-[500px] rounded-2xl border border-gray-200 overflow-hidden cursor-col-resize select-none bg-black group"
                >
                    {/* Noise Side (Background) */}
                    <div className="absolute inset-0 bg-[#0F0F0F] flex flex-col p-6 font-mono text-sm leading-relaxed overflow-hidden">
                        <motion.div
                            animate={{ y: [0, -400] }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            className="space-y-4"
                        >
                            {LOG_STREAM.map((log, i) => (
                                <div key={i} className="text-red-500/60 whitespace-nowrap opacity-40">
                                    <span className="text-gray-600 mr-4">{i + 1400}:</span>
                                    {log}
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Signal Side (Overlay with Clip Path) */}
                    <div
                        className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-purple-900/40 backdrop-blur-xl flex items-center justify-center p-8 pointer-events-none"
                        style={{ clipPath: `inset(0% 0% 0% ${sliderPos}%)` }}
                    >
                        <motion.div
                            initial={false}
                            animate={{
                                opacity: sliderPos > 20 ? 1 : 0,
                                scale: sliderPos > 20 ? 1 : 0.9,
                                x: sliderPos < 50 ? (50 - sliderPos) * 2 : 0
                            }}
                            className="w-full max-w-lg bg-[#0F0F0F] border border-primary/30 rounded-2xl p-8 shadow-[0_0_80px_rgba(168,85,247,0.25)] relative overflow-hidden"
                        >
                            {/* Decorative Background Pulsar */}
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-[60px] animate-pulse" />

                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-bold uppercase tracking-widest leading-none">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                                        Critical Incident
                                    </div>
                                    <div className="flex items-center gap-1.5 text-primary font-bold text-xs uppercase tracking-wider">
                                        <Shield className="w-4 h-4" /> 98% AI Confidence
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-3 leading-tight tracking-tight">
                                    Connection Pool Exhaustion Detected
                                </h3>
                                <p className="text-gray-400 text-sm mb-10 leading-relaxed font-medium">
                                    AI engine has distilled <span className="text-white font-bold">4,201 logs</span> into this single actionable event. Root cause linked to connection leak in <span className="text-primary font-mono text-xs bg-primary/5 px-1.5 py-0.5 rounded">auth-service:v2.4.1</span>.
                                </p>

                                <div className="space-y-4">
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                        <div className="flex items-center justify-between mb-1.5">
                                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Recommended Remediation</span>
                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                        </div>
                                        <div className="text-sm text-gray-200 font-semibold leading-snug">
                                            Safe-restart affected pods & flush connection cache
                                        </div>
                                    </div>
                                    <button className="w-full py-4 bg-primary text-white font-black rounded-xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-widest text-xs">
                                        Execute AI Runbook
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Slider Handle */}
                    <div
                        className="absolute top-0 bottom-0 w-1 bg-primary z-30 flex items-center justify-center"
                        style={{ left: `${sliderPos}%` }}
                    >
                        <div className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-primary to-transparent" />
                        <div className="w-12 h-12 rounded-full bg-primary border-4 border-[#0F0F0F] text-white flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.6)] group-hover:scale-110 transition-transform">
                            <div className="flex gap-1">
                                <div className="w-1 h-1 rounded-full bg-white/50" />
                                <div className="w-1 h-1 rounded-full bg-white/50" />
                                <div className="w-1 h-1 rounded-full bg-white/50" />
                            </div>
                        </div>

                        {/* Drag Indicators */}
                        <div className="absolute left-10 pointer-events-none whitespace-nowrap hidden lg:block">
                            <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-primary/20">
                                Reveal Signal →
                            </span>
                        </div>
                        <div className="absolute right-10 pointer-events-none whitespace-nowrap hidden lg:block">
                            <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.2em] bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-red-500/20">
                                ← See Noise
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
