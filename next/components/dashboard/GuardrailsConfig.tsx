'use client';

import { useState, useEffect } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { useWorkspace } from '@/hooks/useWorkspace';
import {
    Shield,
    AlertTriangle,
    Zap,
    Clock,
    Users,
    Bell,
    Save,
    Loader2
} from 'lucide-react';
import { motion } from 'framer-motion';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

interface GuardrailsSettings {
    autoRestartEnabled: boolean;
    scaleUpEnabled: boolean;
    flushCacheEnabled: boolean;
    dryRunMode: boolean;
    minConfidenceScore: number;
    maxActionsPerDay: number;
    maintenanceWindowStart: string | null;
    maintenanceWindowEnd: string | null;
    requireHumanApproval: boolean;
    notificationChannels: any;
}

export default function GuardrailsConfig() {
    const { activeProject } = useWorkspace();
    const { data: settings, error, mutate } = useSWR<GuardrailsSettings>(
        activeProject ? `/api/projects/${activeProject.id}/guardrails` : null,
        fetcher
    );

    const [formData, setFormData] = useState<GuardrailsSettings | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    // Sync formData with settings when loaded
    useEffect(() => {
        if (settings) {
            setFormData(settings);
        }
    }, [settings]);

    const handleSave = async () => {
        if (!activeProject || !formData) return;
        setIsSaving(true);
        setMessage(null);
        try {
            await axios.put(`/api/projects/${activeProject.id}/guardrails`, formData);
            await mutate(); // Revalidate SWR
            setMessage({ type: 'success', text: 'Settings saved successfully' });
        } catch (err) {
            setMessage({ type: 'error', text: 'Failed to save settings' });
        } finally {
            setIsSaving(false);
            setTimeout(() => setMessage(null), 3000);
        }
    };

    if (!activeProject) return <div className="p-8 text-center text-gray-500">Please select a project to configure guardrails.</div>;
    if (error) return <div className="p-8 text-center text-red-500">Failed to load guardrails settings.</div>;
    if (!settings || !formData) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin text-primary" /></div>;

    const Toggle = ({ label, description, checked, onChange, icon: Icon }: any) => (
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 mb-3">
            <div className="flex items-start gap-4">
                <div className="p-2 bg-white rounded-lg border border-gray-100 text-gray-500">
                    <Icon size={20} />
                </div>
                <div>
                    <h4 className="text-sm font-semibold text-gray-900">{label}</h4>
                    <p className="text-xs text-gray-500 mt-1">{description}</p>
                </div>
            </div>
            <button
                onClick={() => onChange(!checked)}
                className={`w-12 h-6 rounded-full transition-colors relative ${checked ? 'bg-primary' : 'bg-gray-300'}`}
            >
                <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${checked ? 'left-7' : 'left-1'}`} />
            </button>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8 pb-20">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">SRE Guardrails</h1>
                <p className="text-gray-500">Define the operational boundaries and safety rules for AI-driven automated remediation.</p>
            </div>

            {/* Dry Run Mode - Global Override */}
            <div className={`p-6 rounded-2xl border-2 ${formData.dryRunMode ? 'border-amber-400 bg-amber-50' : 'border-green-100 bg-green-50'}`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${formData.dryRunMode ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'}`}>
                            {formData.dryRunMode ? <Shield size={24} /> : <Zap size={24} />}
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">
                                {formData.dryRunMode ? 'Dry-Run Mode Enabled' : 'Active Remediation Enabled'}
                            </h3>
                            <p className={`text-sm mt-1 ${formData.dryRunMode ? 'text-amber-700' : 'text-green-700'}`}>
                                {formData.dryRunMode
                                    ? 'AI will analyze and log intended actions but will NOT execute them.'
                                    : 'CAUTION: AI is authorized to execute actions within defined limits.'}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setFormData({ ...formData, dryRunMode: !formData.dryRunMode })}
                        className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${formData.dryRunMode
                                ? 'bg-amber-500 text-white hover:bg-amber-600'
                                : 'bg-white text-green-700 border border-green-200 hover:bg-green-50'
                            }`}
                    >
                        {formData.dryRunMode ? 'Enable Execution' : 'Switch to Dry-Run'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Task 1; Core Policy Toggles */}
                <section>
                    <h3 className="text-md font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Zap size={18} className="text-primary" /> Allowed Actions
                    </h3>
                    <div className="space-y-2">
                        <Toggle
                            label="Auto-Restart Services"
                            description="Allow AI to restart failing services or pods."
                            icon={Zap}
                            checked={formData.autoRestartEnabled}
                            onChange={(v: boolean) => setFormData({ ...formData, autoRestartEnabled: v })}
                        />
                        <Toggle
                            label="Scale Up Infrastructure"
                            description="Allow AI to provision additional compute resources."
                            icon={Zap} // Could use specialized icon
                            checked={formData.scaleUpEnabled}
                            onChange={(v: boolean) => setFormData({ ...formData, scaleUpEnabled: v })}
                        />
                        <Toggle
                            label="Flush Caches"
                            description="Allow AI to clear Redis/Memcached to resolve inconsistency."
                            icon={Zap}
                            checked={formData.flushCacheEnabled}
                            onChange={(v: boolean) => setFormData({ ...formData, flushCacheEnabled: v })}
                        />
                    </div>
                </section>

                {/* Task 2: Quantitative Constraints */}
                <section className="space-y-6">
                    <h3 className="text-md font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Shield size={18} className="text-primary" /> Safety Constraints
                    </h3>

                    {/* Confidence Floor */}
                    <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Minimum Confidence Score
                        </label>
                        <div className="flex items-center gap-4">
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.05"
                                value={formData.minConfidenceScore}
                                onChange={(e) => setFormData({ ...formData, minConfidenceScore: parseFloat(e.target.value) })}
                                className="w-full accent-primary h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                            <span className="text-lg font-bold text-primary w-12">{formData.minConfidenceScore.toFixed(2)}</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-2">
                            Actions below this confidence score will escalate to humans.
                        </p>
                    </div>

                    {/* Velocity Limiting */}
                    <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Max Actions Per Day
                        </label>
                        <div className="flex items-center gap-4">
                            <input
                                type="number"
                                min="0"
                                value={formData.maxActionsPerDay}
                                onChange={(e) => setFormData({ ...formData, maxActionsPerDay: parseInt(e.target.value) })}
                                className="w-24 p-2 border border-gray-200 rounded-lg text-center font-bold text-gray-900 focus:ring-2 focus:ring-primary/20 outline-none"
                            />
                            <span className="text-sm text-gray-500">actions / 24h</span>
                        </div>
                    </div>

                    {/* Maintenance Windows */}
                    <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <Clock size={16} className="text-gray-400" />
                            <label className="text-sm font-semibold text-gray-700">Maintenance Window (No-Auto-Action)</label>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs text-gray-500 block mb-1">Start Time</label>
                                <input
                                    type="time"
                                    value={formData.maintenanceWindowStart || ''}
                                    onChange={(e) => setFormData({ ...formData, maintenanceWindowStart: e.target.value })}
                                    className="w-full p-2 border border-gray-200 rounded-lg text-sm"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 block mb-1">End Time</label>
                                <input
                                    type="time"
                                    value={formData.maintenanceWindowEnd || ''}
                                    onChange={(e) => setFormData({ ...formData, maintenanceWindowEnd: e.target.value })}
                                    className="w-full p-2 border border-gray-200 rounded-lg text-sm"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Task 3: Advanced Governance */}
            <section className="mt-8 pt-8 border-t border-gray-100">
                <h3 className="text-md font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Users size={18} className="text-primary" /> Governance & Routing
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                        <div className="mt-1">
                            <input
                                type="checkbox"
                                id="approval"
                                checked={formData.requireHumanApproval}
                                onChange={(e) => setFormData({ ...formData, requireHumanApproval: e.target.checked })}
                                className="w-5 h-5 accent-primary rounded focus:ring-primary/20"
                            />
                        </div>
                        <div>
                            <label htmlFor="approval" className="block text-sm font-semibold text-gray-900">
                                Require Human Approval for High-Risk Actions
                            </label>
                            <p className="text-xs text-gray-500 mt-1">
                                DB migrations, deletions, and config changes will always prompt for approval.
                            </p>
                        </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-xl">
                        <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                            <Bell size={16} /> Notification Routing
                        </label>
                        <input
                            type="text"
                            placeholder="#incident-alerts, email@cortex.ai"
                            value={
                                // Simplified: storing as string in JSON for now, or assume it's an object we can parse? 
                                // Schema says Json? let's Treat as string for UI simplicity and JSON.stringify on save if needed.
                                // But the endpoint should handle it. Let's assume the UI field maps to a "channels" property in that JSON.
                                // For now, let's just make it a text field that we store in the object.
                                (formData.notificationChannels as any)?.channels || ''
                            }
                            onChange={(e) => setFormData({
                                ...formData,
                                notificationChannels: { channels: e.target.value }
                            })}
                            className="w-full p-2 border border-gray-200 rounded-lg text-sm"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Comma separated channels or emails for blocked action alerts.
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer Actions */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-10 flex justify-end items-center gap-4 px-8 shadow-lg">
                {message && (
                    <span className={`text-sm font-medium ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                        {message.text}
                    </span>
                )}
                <button
                    onClick={() => mutate()} // Reset
                    className="px-6 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg font-bold shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all disabled:opacity-50"
                >
                    {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                    Save Changes
                </button>
            </div>
        </div>
    );
}
