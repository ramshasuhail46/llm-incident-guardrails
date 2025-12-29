"use client";

import { Server, Database, Activity, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function InfrastructureLatency() {
    const [ping, setPing] = useState(42);

    // Simulate live ping fluctuation
    useEffect(() => {
        const interval = setInterval(() => {
            setPing(prev => {
                const change = Math.floor(Math.random() * 5) - 2;
                return Math.max(38, Math.min(48, prev + change));
            });
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="bg-black py-24 relative overflow-hidden text-center">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Global <span className="text-primary">Speed</span>
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Strategically deployed infrastructure for minimum RTT and maximum reliability.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto md:flex gap-12 items-center justify-center">

                    {/* Visual Map Representation */}
                    <div className="relative w-full md:w-1/2 aspect-video bg-[#0A0A0A] rounded-xl border border-gray-800 flex items-center justify-center overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800/20 via-[#0A0A0A] to-[#0A0A0A]" />

                        {/* World Map Outline (Simplified SVG or CSS abstract) */}
                        <Globe className="w-64 h-64 text-gray-800/20 absolute" strokeWidth={0.5} />

                        {/* Connection Line */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none">
                            <line x1="30%" y1="50%" x2="70%" y2="50%" stroke="#333" strokeDasharray="4 4" />
                            {/* Animated Ping Packet */}
                            <motion.circle
                                r="3"
                                fill="#7c3aed"
                                initial={{ cx: "30%", cy: "50%" }}
                                animate={{ cx: ["30%", "70%", "30%"] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            />
                        </svg>

                        {/* AI Worker Location (Simulation) */}
                        <div className="absolute left-[25%] top-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
                            <div className="w-12 h-12 bg-gray-900 border border-gray-700 rounded-lg flex items-center justify-center relative z-10">
                                <Server className="w-6 h-6 text-gray-400" />
                            </div>
                            <span className="text-xs font-mono text-gray-500">AI Worker</span>
                        </div>

                        {/* Seoul Region Location */}
                        <div className="absolute right-[25%] top-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
                            <div className="relative">
                                <div className="absolute -inset-4 bg-primary/20 blur-xl rounded-full animate-pulse" />
                                <div className="w-12 h-12 bg-primary/10 border border-primary/50 rounded-lg flex items-center justify-center relative z-10 shadow-[0_0_15px_rgba(124,58,237,0.3)]">
                                    <Database className="w-6 h-6 text-primary" />
                                </div>
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-black" />
                            </div>
                            <span className="text-xs font-mono text-primary font-bold">Seoul (ap-northeast-2)</span>
                        </div>
                    </div>

                    {/* Metrics Card */}
                    <div className="w-full md:w-1/3 mt-8 md:mt-0 text-left">
                        <div className="bg-[#111] border border-gray-800 rounded-xl p-6 relative group hover:border-primary/30 transition-colors">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <Activity className="w-4 h-4" />
                                    <span className="text-sm font-medium">Database RTT</span>
                                </div>
                                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-green-500/10 border border-green-500/20">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-[10px] font-bold text-green-400 uppercase">Live</span>
                                </div>
                            </div>

                            <div className="flex items-baseline gap-2">
                                <span className="text-5xl font-mono font-bold text-white tracking-tighter">{ping}</span>
                                <span className="text-gray-500 font-mono">ms</span>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-800">
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-500">Region</span>
                                    <span className="text-gray-300">Asia Pacific (Seoul)</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Provider</span>
                                    <span className="text-gray-300">Prisma Postgres</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
