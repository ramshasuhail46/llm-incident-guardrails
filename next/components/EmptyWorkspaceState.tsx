import { Building2, Users, Rocket } from 'lucide-react';
import Link from 'next/link';

export default function EmptyWorkspaceState() {
    return (
        <div className="min-h-[60vh] flex items-center justify-center p-8">
            <div className="max-w-2xl w-full text-center">
                {/* Icon */}
                <div className="mb-8 flex justify-center">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 flex items-center justify-center">
                        <Rocket className="w-12 h-12 text-primary" />
                    </div>
                </div>

                {/* Heading */}
                <h1 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">
                    Welcome to IncidentFlow! 🎉
                </h1>
                <p className="text-lg text-gray-600 mb-12 max-w-lg mx-auto">
                    Get started by creating your first project or inviting your team to collaborate on incident management.
                </p>

                {/* CTAs */}
                <div className="grid md:grid-cols-2 gap-6 max-w-xl mx-auto">
                    {/* Solo CTA */}
                    <div className="bg-white rounded-2xl border-2 border-gray-100 p-8 hover:border-primary/30 hover:shadow-xl transition-all group">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                            <Building2 className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Start Solo</h3>
                        <p className="text-sm text-gray-600 mb-6">
                            Create your first project and start managing incidents with AI-powered diagnostics.
                        </p>
                        <Link
                            href="/dashboard/create-project"
                            className="inline-flex items-center justify-center w-full px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-opacity-90 transition-all shadow-lg shadow-primary/20"
                        >
                            Create Project
                        </Link>
                    </div>

                    {/* Team CTA */}
                    <div className="bg-white rounded-2xl border-2 border-gray-100 p-8 hover:border-primary/30 hover:shadow-xl transition-all group">
                        <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                            <Users className="w-6 h-6 text-indigo-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Build with Team</h3>
                        <p className="text-sm text-gray-600 mb-6">
                            Invite teammates and collaborate on incident response with shared dashboards.
                        </p>
                        <button
                            onClick={() => {
                                // This will trigger Clerk's organization creation modal
                                const createOrgButton = document.querySelector('[data-cl-create-organization]') as HTMLElement;
                                createOrgButton?.click();
                            }}
                            className="inline-flex items-center justify-center w-full px-6 py-3 bg-white text-indigo-600 font-bold rounded-xl border-2 border-indigo-200 hover:bg-indigo-50 transition-all"
                        >
                            Invite Team
                        </button>
                    </div>
                </div>

                {/* Help text */}
                <p className="text-xs text-gray-400 mt-8">
                    Need help getting started? Check out our{' '}
                    <a href="#" className="text-primary hover:underline">
                        documentation
                    </a>{' '}
                    or{' '}
                    <a href="#" className="text-primary hover:underline">
                        watch a demo
                    </a>
                    .
                </p>
            </div>
        </div>
    );
}
