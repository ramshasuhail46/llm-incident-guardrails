import { Brain, Shield, Activity, History, Users, Workflow } from 'lucide-react';

const features = [
    {
        title: 'AI-Powered Diagnostics',
        description: 'Leverage advanced AI models to automatically diagnose incidents. Get instant root cause analysis and actionable remediation steps.',
        icon: <Brain className="w-6 h-6 text-purple-500" />,
    },
    {
        title: 'SRE Guardrails',
        description: 'Configure intelligent safety boundaries for automated remediation. Set confidence thresholds, dry-run modes, and approval workflows.',
        icon: <Shield className="w-6 h-6 text-green-500" />,
    },
    {
        title: 'Real-Time Monitoring',
        description: 'Track active incidents with live dashboards. Monitor system health, MTTR trends, and AI confidence scores in one unified view.',
        icon: <Activity className="w-6 h-6 text-blue-500" />,
    },
    {
        title: 'Comprehensive History',
        description: 'Access complete incident archives with detailed timelines. Learn from past incidents and improve your response strategies.',
        icon: <History className="w-6 h-6 text-orange-500" />,
    },
    {
        title: 'Team Collaboration',
        description: 'Manage organization members, assign roles, and track team activity. Complete audit logs ensure accountability and transparency.',
        icon: <Users className="w-6 h-6 text-indigo-500" />,
    },
    {
        title: 'Automated Workflows',
        description: 'Enable AI-driven auto-remediation with configurable guardrails. Scale infrastructure, restart services, and flush caches automatically.',
        icon: <Workflow className="w-6 h-6 text-pink-500" />,
    },
];

export default function FeatureGrid() {
    return (
        <section className="py-24 bg-gray-50/50">
            <div className="container mx-auto px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Everything you need for <span className="text-gradient">AI-powered incident management</span>
                    </h2>
                    <p className="text-lg text-gray-600">
                        Intelligent guardrails and automated diagnostics to help your team resolve incidents faster while maintaining safety and control.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-6">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
