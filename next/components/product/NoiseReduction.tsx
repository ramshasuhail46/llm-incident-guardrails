"use client";

import { useState, useRef, useEffect } from 'react';
import { Sparkles, AlertOctagon, Terminal, Activity } from 'lucide-react';

export default function NoiseReduction() {
    const [sliderPosition, setSliderPosition] = useState(50);
    const containerRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);

    const handleMouseDown = () => {
        isDragging.current = true;
    };

    const handleMouseUp = () => {
        isDragging.current = false;
    };

    const handleMouseMove = (e: React.MouseEvent | MouseEvent) => {
        if (!isDragging.current || !containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
        const percentage = (x / rect.width) * 100;

        setSliderPosition(percentage);
    };

    // Add global event listeners for smoother dragging outside container
    useEffect(() => {
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mousemove', handleMouseMove as any);
        return () => {
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mousemove', handleMouseMove as any);
        };
    }, []);

    return (
        <section className="bg-black py-24 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        From <span className="text-gray-500 line-through decoration-red-500">Log Fatigue</span> to <span className="text-primary">Clear Intelligence</span>
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Drag the slider to see how IncidentFlow transforms chaotic noise into actionable insights.
                    </p>
                </div>

                <div className="max-w-5xl mx-auto select-none">
                    <div
                        ref={containerRef}
                        className="relative h-[500px] rounded-xl overflow-hidden border border-gray-800 bg-[#050505] shadow-2xl cursor-col-resize group"
                        onMouseDown={handleMouseDown}
                    >

                        {/* RIGHT SIDE (AFTER - Clean Intelligence) - LAYER 1 (Base) */}
                        <div className="absolute inset-0 flex items-center justify-center bg-[#0A0A0A]">
                            <div className="max-w-md w-full">
                                <div className="bg-[#111] border border-primary/20 rounded-xl p-8 shadow-[0_0_50px_rgba(124,58,237,0.1)] relative overflow-hidden">
                                    <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20 text-primary text-sm font-medium">
                                            <Sparkles className="w-4 h-4" />
                                            <span>AI Insight</span>
                                        </div>
                                        <div className="text-green-400 font-mono text-sm">99.8% Confidence</div>
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-2">Redis Connection Timeout</h3>
                                    <p className="text-gray-400 mb-6">
                                        Application servers in <span className="text-gray-300 font-mono text-xs bg-gray-800 px-1 rounded">us-east-1</span> cannot reach the primary Redis cluster.
                                    </p>

                                    <div className="bg-black/50 rounded-lg p-4 border border-white/5 space-y-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Root Cause</span>
                                            <span className="text-white">Security Group Misconfiguration</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Impact</span>
                                            <span className="text-red-400">High (Checkout Failed)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Background "Clean" grid */}
                            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
                        </div>

                        {/* LEFT SIDE (BEFORE - Raw Logs) - LAYER 2 (Clipped) */}
                        <div
                            className="absolute inset-0 bg-[#050505] overflow-hidden"
                            style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
                        >
                            <div className="p-8 h-full font-mono text-xs text-gray-500 opacity-60 overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/5 to-transparent animate-pulse pointer-events-none" />

                                {/* Simulated infinite scroll of logs */}
                                <div className="space-y-1">
                                    {[...Array(30)].map((_, i) => (
                                        <div key={i} className="whitespace-nowrap flex gap-4">
                                            <span className="text-gray-700">2024-12-29 10:42:{String(i + 10).padStart(2, '0')}</span>
                                            <span className={i % 3 === 0 ? "text-red-500/70" : "text-gray-600"}>
                                                {i % 3 === 0 ? "ERROR" : i % 5 === 0 ? "WARN" : "INFO"}
                                            </span>
                                            <span>
                                                {i % 3 === 0
                                                    ? "[ConnectionError] Connection refused by peer 10.0.4.23:6379"
                                                    : i % 5 === 0
                                                        ? "Retrying connection to Redis pool (Attempt 3/5)..."
                                                        : "Health check passed for service-worker-" + ((i * 137) % 9000 + 1000)}
                                            </span>
                                        </div>
                                    ))}
                                    {[...Array(20)].map((_, i) => (
                                        <div key={`dup-${i}`} className="whitespace-nowrap flex gap-4">
                                            <span className="text-gray-700">2024-12-29 10:42:{String(i + 40).padStart(2, '0')}</span>
                                            <span className="text-red-500/70">ERROR</span>
                                            <span>Unhandled exception in thread pool-1-thread-{i}: Connection timed out</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="absolute top-4 left-4">
                                    <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 rounded-full border border-red-500/20 text-red-500 text-sm font-medium">
                                        <AlertOctagon className="w-4 h-4" />
                                        <span>Log Noise</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Slider Handle */}
                        <div
                            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                            style={{ left: `${sliderPosition}%` }}
                        >
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                                <div className="flex gap-0.5">
                                    <div className="w-0.5 h-3 bg-black/50" />
                                    <div className="w-0.5 h-3 bg-black/50" />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
