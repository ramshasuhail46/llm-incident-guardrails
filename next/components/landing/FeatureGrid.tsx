import { Slack, Zap, BarChart3, Bell, Shield, Smartphone } from 'lucide-react';

const features = [
    {
        title: 'Slack Integration',
        description: 'Sync incidents directly with your Slack channels. Collaborate in real-time where your team already works.',
        icon: <Slack className="w-6 h-6 text-purple-500" />,
    },
    {
        title: 'Instant Alerts',
        description: 'Never miss a critical issue. Real-time notifications delivered via SMS, PagerDuty, or email.',
        icon: <Zap className="w-6 h-6 text-yellow-500" />,
    },
    {
        title: 'Deep Analytics',
        description: 'Powerful insights into your incident history. Track MTTR, team performance, and reliability trends.',
        icon: <BarChart3 className="w-6 h-6 text-blue-500" />,
    },
    {
        title: 'Automated Workflows',
        description: 'Run automated playbooks to remediate common issues faster. Reduce manual toil and human error.',
        icon: <Bell className="w-6 h-6 text-orange-500" />,
    },
    {
        title: 'Enterprise Security',
        description: 'Rest easy with SOC2 compliance, role-based access control, and comprehensive audit logs.',
        icon: <Shield className="w-6 h-6 text-green-500" />,
    },
    {
        title: 'Mobile Response',
        description: 'Manage incidents from anywhere. Our robust mobile app keeps you connected on the move.',
        icon: <Smartphone className="w-6 h-6 text-indigo-500" />,
    },
];

export default function FeatureGrid() {
    return (
        <section className="py-24 bg-gray-50/50">
            <div className="container mx-auto px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Everything you need for <span className="text-gradient">modern incident response</span>
                    </h2>
                    <p className="text-lg text-gray-600">
                        A comprehensive suite of tools designed to help engineering teams resolve incidents faster and learn from every outage.
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
