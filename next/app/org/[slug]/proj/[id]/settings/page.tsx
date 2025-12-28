'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Settings, Key, Trash2, Save, RefreshCw, Copy, Check, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function ProjectSettings() {
    const { slug, id } = useParams() as { slug: string, id: string };
    const router = useRouter();
    const [project, setProject] = useState<any>(null);
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [rotating, setRotating] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        async function fetchProject() {
            try {
                const res = await fetch(`/api/projects/${id}`);
                const data = await res.json();
                setProject(data);
                setName(data.name);
            } catch (err) {
                console.error("Failed to fetch project:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchProject();
    }, [id]);

    const handleSaveName = async () => {
        setSaving(true);
        try {
            const res = await fetch(`/api/projects/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name }),
            });
            if (res.ok) {
                // Refresh to update sidebar if needed
                window.location.reload();
            }
        } catch (err) {
            console.error("Failed to update project name:", err);
        } finally {
            setSaving(false);
        }
    };

    const handleRotateKey = async () => {
        if (!confirm('Are you sure you want to rotate the API key? The old key will stop working immediately.')) return;
        setRotating(true);
        try {
            const res = await fetch(`/api/projects/${id}/rotate-key`, {
                method: 'POST',
            });
            const data = await res.json();
            setProject({ ...project, apiKey: data.apiKey });
        } catch (err) {
            console.error("Failed to rotate API key:", err);
        } finally {
            setRotating(false);
        }
    };

    const handleDeleteProject = async () => {
        if (!confirm('Are you sure you want to delete this project? This action is irreversible.')) return;
        setDeleting(true);
        try {
            const res = await fetch(`/api/projects/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                router.push(`/org/${slug}/dashboard`);
            }
        } catch (err) {
            console.error("Failed to delete project:", err);
        } finally {
            setDeleting(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(project.apiKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F9FAFB] p-8">
            <div className="max-w-4xl mx-auto">
                <Link
                    href={`/org/${slug}/proj/${id}`}
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-8 group"
                >
                    <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Dashboard
                </Link>

                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Project Settings</h1>
                    <p className="text-gray-500">Manage your project configuration and security.</p>
                </div>

                <div className="space-y-8">
                    {/* General Settings */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                <Settings size={20} />
                            </div>
                            <h2 className="text-lg font-bold text-gray-900">General</h2>
                        </div>
                        <div className="p-6">
                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider text-[10px]">Project Name</label>
                            <div className="flex gap-4">
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                />
                                <button
                                    onClick={handleSaveName}
                                    disabled={saving || name === project.name}
                                    className="flex items-center gap-2 px-6 py-2 bg-primary text-white font-bold rounded-xl hover:bg-opacity-90 transition-all disabled:opacity-50"
                                >
                                    <Save size={18} />
                                    {saving ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* API Security */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
                            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                                <Key size={20} />
                            </div>
                            <h2 className="text-lg font-bold text-gray-900">API Security</h2>
                        </div>
                        <div className="p-6">
                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider text-[10px]">Project API Key</label>
                            <p className="text-sm text-gray-500 mb-4">Use this key to authenticate requests from your application to IncidentFlow.</p>
                            <div className="flex gap-4 items-center">
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        readOnly
                                        value={project.apiKey}
                                        className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl font-mono text-sm text-gray-600"
                                    />
                                    <button
                                        onClick={copyToClipboard}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-primary transition-colors"
                                    >
                                        {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                                    </button>
                                </div>
                                <button
                                    onClick={handleRotateKey}
                                    disabled={rotating}
                                    className="flex items-center gap-2 px-6 py-3 border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all disabled:opacity-50"
                                >
                                    <RefreshCw size={18} className={rotating ? 'animate-spin' : ''} />
                                    Rotate Key
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="bg-red-50/50 rounded-2xl border border-red-100 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-red-100 flex items-center gap-3">
                            <div className="p-2 bg-red-100 text-red-600 rounded-lg">
                                <Trash2 size={20} />
                            </div>
                            <h2 className="text-lg font-bold text-red-900">Danger Zone</h2>
                        </div>
                        <div className="p-6 flex items-center justify-between">
                            <div>
                                <h3 className="font-bold text-gray-900 mb-1">Delete Project</h3>
                                <p className="text-sm text-gray-500">Once you delete a project, there is no going back. Please be certain.</p>
                            </div>
                            <button
                                onClick={handleDeleteProject}
                                disabled={deleting}
                                className="px-6 py-2 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all disabled:opacity-50"
                            >
                                {deleting ? 'Deleting...' : 'Delete Project'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
