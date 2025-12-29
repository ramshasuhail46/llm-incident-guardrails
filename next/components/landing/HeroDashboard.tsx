"use client";

import { motion } from 'framer-motion';
import { Activity, AlertCircle, BarChart3, LayoutDashboard, Settings } from 'lucide-react';

export default function HeroDashboard() {
    return (
        <div className="relative w-full max-w-3xl mx-auto perspective-1000">
            {/* Main Dashboard Container */}
            <motion.div
                initial={{ rotateY: 15, rotateX: 5, opacity: 0, y: 40 }}
                animate={{ rotateY: 2, rotateX: 2, opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative bg-white rounded-2xl shadow-[0_50px_100px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden scale-90 lg:scale-95"
            >
                {/* Dashboard Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50 bg-white/50 backdrop-blur-sm">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                                <span className="text-white font-bold text-xs">I</span>
                            </div>
                            <span className="font-bold text-gray-900 text-sm">IncidentFlow</span>
                        </div>
                        <nav className="hidden md:flex items-center gap-4 text-xs font-medium text-gray-500">
                            <span className="flex items-center gap-1.5 text-primary border-b-2 border-primary pb-4 mt-4">
                                <LayoutDashboard className="w-3.5 h-3.5" /> Dashboard
                            </span>
                            <span className="flex items-center gap-1.5 hover:text-gray-900 transition-colors">
                                <AlertCircle className="w-3.5 h-3.5" /> Incidents
                            </span>
                            <span className="flex items-center gap-1.5 hover:text-gray-900 transition-colors">
                                <BarChart3 className="w-3.5 h-3.5" /> Analytics
                            </span>
                            <span className="flex items-center gap-1.5 hover:text-gray-900 transition-colors">
                                <Settings className="w-3.5 h-3.5" /> Settings
                            </span>
                        </nav>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200" />
                </div>

                {/* Dashboard Content */}
                <div className="p-8 bg-gray-50/30">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {/* Summary Cards */}
                        <div className="md:col-span-2 space-y-6">
                            <h3 className="text-sm font-semibold text-gray-900">Active Incidents Overview</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm">
                                    <div className="text-3xl font-bold text-gray-900 mb-1">64</div>
                                    <div className="text-xs text-gray-500 font-medium">Active</div>
                                    <div className="mt-4 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: '65%' }}
                                            transition={{ duration: 1.5, delay: 0.5 }}
                                            className="h-full bg-primary"
                                        />
                                    </div>
                                </div>
                                <div className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm">
                                    <div className="text-3xl font-bold text-gray-900 mb-1">21</div>
                                    <div className="text-xs text-gray-500 font-medium">Critical</div>
                                    <div className="mt-4 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: '40%' }}
                                            transition={{ duration: 1.5, delay: 0.7 }}
                                            className="h-full bg-red-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Dummy Content Lines */}
                            <div className="space-y-3 pt-4">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="h-2 bg-gray-100 rounded-full w-full" style={{ opacity: 1 - i * 0.2 }} />
                                ))}
                            </div>
                        </div>

                        {/* Recent Incidents Sidebar */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold text-gray-900">Recent Incidents</h3>
                            <div className="space-y-3">
                                {[
                                    { title: "Service timeout in prod", status: "bg-red-500", time: "2m ago" },
                                    { title: "Memory leak in auth", status: "bg-yellow-500", time: "15m ago" },
                                    { title: "DB connection spike", status: "bg-green-500", time: "1h ago" },
                                    { title: "API latency increase", status: "bg-green-500", time: "3h ago" }
                                ].map((inc, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-50 shadow-sm">
                                        <div className={`w-2 h-2 rounded-full ${inc.status}`} />
                                        <div className="flex-1 min-w-0">
                                            <div className="text-[11px] font-semibold text-gray-900 truncate">{inc.title}</div>
                                            <div className="text-[9px] text-gray-400">{inc.time}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Floating Trends Card */}
            <motion.div
                initial={{ x: -40, y: 60, opacity: 0 }}
                animate={{ x: -20, y: 100, opacity: 1 }}
                whileHover={{ y: 90, scale: 1.02 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute -left-12 top-24 z-20 w-64 p-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/50 hidden lg:block"
            >
                <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-bold text-gray-900">Incident Trends</h4>
                    <div className="flex gap-1">
                        <div className="w-1 h-1 rounded-full bg-gray-300" />
                        <div className="w-1 h-1 rounded-full bg-gray-300" />
                        <div className="w-1 h-1 rounded-full bg-gray-300" />
                    </div>
                </div>
                <div className="flex items-end gap-1.5 h-24 mb-4">
                    {[35, 65, 45, 85, 55, 75, 95, 45, 65, 85].map((h, i) => (
                        <motion.div
                            key={i}
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            transition={{ duration: 1, delay: 0.8 + i * 0.05 }}
                            className="flex-1 bg-primary/40 rounded-t-sm"
                        />
                    ))}
                </div>
                <div className="text-[10px] text-gray-400 font-medium text-center">
                    Daily Incidents: Last 30 Days
                </div>
            </motion.div>

            {/* Floating Detail Card */}
            <motion.div
                initial={{ x: 40, y: -20, opacity: 0 }}
                animate={{ x: 60, y: 320, opacity: 1 }}
                whileHover={{ y: 310, scale: 1.02 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute -right-12 top-0 z-20 w-56 p-4 bg-white rounded-xl shadow-2xl border border-gray-100 hidden lg:block"
            >
                <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-2">
                        <span className="px-2 py-0.5 rounded bg-gray-100 text-[10px] text-gray-600 font-bold">All Status</span>
                        <span className="px-2 py-0.5 rounded bg-white border border-gray-100 text-[10px] text-gray-400 font-medium">Recent</span>
                    </div>
                </div>
                <div className="space-y-4">
                    {[
                        { title: "Pod failure in node-02", color: "bg-red-500", time: "10m ago" },
                        { title: "Kafka lag alert", color: "bg-yellow-500", time: "1h ago" },
                        { title: "Cert renewal success", color: "bg-green-500", time: "2h ago" }
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${item.color} shrink-0`} />
                            <div className="min-w-0">
                                <div className="text-[11px] font-medium text-gray-900 truncate">{item.title}</div>
                                <div className="text-[9px] text-gray-400">{item.time}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[120px] -z-10 rounded-full" />
        </div>
    );
}

// Custom CSS for perspective (would normally go in globals.css or similar)
// .perspective-1000 { perspective: 1000px; }
