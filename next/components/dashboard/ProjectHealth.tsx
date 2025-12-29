'use client';

import { useEffect, useState } from 'react';
import { Shield, ShieldAlert, ShieldCheck, Loader2 } from 'lucide-react';

export default function ProjectHealth() {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch('/api/dashboard/analysis');
                const json = await res.json();
                setData(json.projectHealth || []);
            } catch (err) {
                console.error("Failed to fetch project health:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="h-48 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center justify-center">
                <Loader2 className="animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col h-full">
            <h3 className="text-sm font-bold text-gray-900 mb-4">Project Health Analysis</h3>
            <div className="space-y-4 overflow-y-auto flex-1">
                {data.map((project, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                        <div className="flex items-center gap-3">
                            {project.status === 'Healthy' ? (
                                <ShieldCheck className="text-green-500" size={18} />
                            ) : project.status === 'Warning' ? (
                                <Shield className="text-yellow-500" size={18} />
                            ) : (
                                <ShieldAlert className="text-red-500" size={18} />
                            )}
                            <div>
                                <p className="text-xs font-bold text-gray-900">{project.name}</p>
                                <p className="text-[10px] text-gray-400 font-medium">{project.count} Incidents</p>
                            </div>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${
                            project.status === 'Healthy' ? 'bg-green-100 text-green-700' :
                            project.status === 'Warning' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                        }`}>
                            {project.status.toUpperCase()}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
