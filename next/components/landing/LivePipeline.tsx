"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Inbox, BrainCircuit, ShieldCheck, Database, Zap, Cpu, Lock, Globe } from 'lucide-react';

const nodes = [
    {
        id: 'ingest',
        label: 'Ingest',
        icon: <Inbox className="w-6 h-6" />,
        color: 'text-blue-500',
        bgColor: 'bg-blue-500/10',
        borderColor: 'border-blue-500/20',
        pulseColor: 'bg-blue-400',
        tech: 'Hono.js / Webhooks',
        metrics: [
            { label: 'Latency', value: '5ms', icon: <Zap className="w-3 h-3" /> },
            { label: 'Protocols', value: 'HTTP, gRPC', icon: <Globe className="w-3 h-3" /> }
        ]
    },
    {
        id: 'analyze',
        label: 'Analyze',
        icon: <BrainCircuit className="w-6 h-6" />,
        color: 'text-purple-500',
        bgColor: 'bg-purple-500/10',
        borderColor: 'border-purple-500/20',
        pulseColor: 'bg-purple-400',
        tech: 'GPT-4o / LangChain',
        metrics: [
            { label: 'Latency', value: '450ms', icon: <Zap className="w-3 h-3" /> },
            { label: 'Process', value: 'NLP Inference', icon: <Cpu className="w-3 h-3" /> }
        ]
    },
    {
        id: 'validate',
        label: 'Validate',
        icon: <ShieldCheck className="w-6 h-6" />,
        color: 'text-green-500',
        bgColor: 'bg-green-500/10',
        borderColor: 'border-green-500/20',
        pulseColor: 'bg-green-400',
        tech: 'Pydantic / SRE Guardrails',
        metrics: [
            { label: 'Compliance', value: 'Schema Passed', icon: <Lock className="w-3 h-3" /> },
            { label: 'Security', value: 'Auth Checked', icon: <ShieldCheck className="w-3 h-3" /> }
        ]
    },
    {
        id: 'persist',
        label: 'Persist',
        icon: <Database className="w-6 h-6" />,
        color: 'text-orange-500',
        bgColor: 'bg-orange-500/10',
        borderColor: 'border-orange-500/20',
        pulseColor: 'bg-orange-400',
        tech: 'Prisma / Supabase',
        metrics: [
            { label: 'Persistence', value: '42ms', icon: <Zap className="w-3 h-3" /> },
            { label: 'Region', value: 'Seoul (ap-northeast-2)', icon: <Globe className="w-3 h-3" /> }
        ]
    }
];

export default function LivePipeline() {
    const [selectedNode, setSelectedNode] = useState<string | null>(null);

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Real-time <span className="text-gradient">Data Pipeline</span>
                    </h2>
                    <p className="text-lg text-gray-600">
                        Watch how IncidentFlow processes your infrastructure signals with millisecond precision and AI-driven intelligence.
                    </p>
                </div>

                <div className="relative max-w-5xl mx-auto">
                    {/* Horizontal Pipeline Line */}
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 -z-10" />

                    {/* Animated Pulse */}
                    <motion.div
                        animate={{
                            left: ['0%', '100%'],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="absolute top-1/2 -translate-y-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent blur-sm -z-5"
                    />

                    <div className="flex flex-col md:flex-row justify-between items-center gap-12 md:gap-4 relative px-4">
                        {nodes.map((node, index) => (
                            <div key={node.id} className="relative group perspective-1000">
                                {/* Connection Arrow (Mobile only) */}
                                {index < nodes.length - 1 && (
                                    <div className="md:hidden absolute -bottom-8 left-1/2 -translate-x-1/2 text-gray-200">
                                        ↓
                                    </div>
                                )}

                                {/* Node Circle */}
                                <motion.button
                                    whileHover={{ scale: 1.1, rotateY: 10 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
                                    className={`relative z-10 w-20 h-20 rounded-2xl ${node.bgColor} border ${node.borderColor} flex items-center justify-center transition-all duration-300 shadow-sm group-hover:shadow-xl group-hover:border-primary/50 overflow-hidden`}
                                >
                                    <div className={`${node.color} group-hover:scale-110 transition-transform`}>
                                        {node.icon}
                                    </div>

                                    {/* Pulse Animation inside node */}
                                    <motion.div
                                        animate={{ opacity: [0, 0.5, 0], scale: [1, 1.5, 2] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className={`absolute inset-0 ${node.pulseColor} rounded-full -z-10 opacity-0`}
                                    />
                                </motion.button>

                                {/* Node Label */}
                                <div className="mt-4 text-center">
                                    <span className="text-sm font-bold text-gray-900">{node.label}</span>
                                </div>

                                {/* Technical Spec Tooltip */}
                                <AnimatePresence>
                                    {selectedNode === node.id && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                            className="absolute left-1/2 -translate-x-1/2 bottom-[110%] w-64 p-4 bg-[#0A0A0A] rounded-xl border border-white/10 shadow-2xl z-20 pointer-events-none"
                                        >
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                                <span className="text-xs font-bold text-white uppercase tracking-wider">Technical Spec</span>
                                            </div>

                                            <div className="text-sm font-semibold text-gray-300 mb-3 border-b border-white/5 pb-2">
                                                {node.tech}
                                            </div>

                                            <div className="space-y-2">
                                                {node.metrics.map((metric, i) => (
                                                    <div key={i} className="flex items-center justify-between text-[11px]">
                                                        <span className="text-gray-500 flex items-center gap-1.5 font-mono">
                                                            {metric.icon} {metric.label}
                                                        </span>
                                                        <span className="text-primary font-mono font-bold">
                                                            {metric.value}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Tooltip Arrow */}
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[#0A0A0A]" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <p className="text-sm text-gray-400 italic">
                        Click on any node to reveal technical specs and performance metrics.
                    </p>
                </div>
            </div>

            <style jsx>{`
                .perspective-1000 {
                    perspective: 1000px;
                }
            `}</style>
        </section>
    );
}
