'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTenant } from '@/contexts/TenantContext';
import { useWorkspace } from '@/hooks/useWorkspace';
import { Building2, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function CreateProjectPage() {
    const router = useRouter();
    const { currentTenantId, isLoading: tenantLoading } = useTenant();
    const [name, setName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/projects/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    organizationId: currentTenantId,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || 'Failed to create project');
                setIsSubmitting(false);
                return;
            }

            // Refresh global workspace data so the sidebar updates
            const { fetchWorkspaceData } = useWorkspace.getState();
            await fetchWorkspaceData();

            // Redirect to the new project's dashboard
            const { project } = data;
            const currentOrg = useWorkspace.getState().activeOrg;

            if (currentOrg) {
                router.push(`/org/${currentOrg.slug}/proj/${project.id}`);
            } else {
                router.push('/dashboard');
            }
            router.refresh();
        } catch (err) {
            setError('An unexpected error occurred');
            setIsSubmitting(false);
        }
    };

    if (tenantLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!currentTenantId) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        No workspace found
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Please sign in to create a project.
                    </p>
                    <Link
                        href="/"
                        className="text-primary hover:underline"
                    >
                        Go to home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4"
                    >
                        <ArrowLeft size={16} />
                        Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-black text-gray-900 mb-2">
                        Create New Project
                    </h1>
                    <p className="text-gray-600">
                        Set up a new project to start tracking incidents with AI-powered diagnostics.
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Building2 className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Project Details</h2>
                            <p className="text-sm text-gray-500">Enter your project information</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Project Name */}
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-bold text-gray-900 mb-2"
                            >
                                Project Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g., Production API, Mobile App, Web Platform"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            />
                            <p className="text-xs text-gray-500 mt-2">
                                A descriptive name for your project. You can change this later.
                            </p>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                                <p className="text-sm text-red-600 font-medium">{error}</p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="flex gap-3 pt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting || !name.trim()}
                                className="flex-1 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Creating...
                                    </>
                                ) : (
                                    'Create Project'
                                )}
                            </button>
                            <Link
                                href="/dashboard"
                                className="px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-all"
                            >
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>

                {/* Info Box */}
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <p className="text-sm text-blue-800">
                        <strong>💡 Tip:</strong> After creating your project, you'll receive an API key
                        to integrate IncidentFlow with your applications.
                    </p>
                </div>
            </div>
        </div>
    );
}
