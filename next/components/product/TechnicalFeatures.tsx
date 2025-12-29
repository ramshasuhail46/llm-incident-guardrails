import { Zap, Shield, Key, Database, Activity, GitBranch } from 'lucide-react';

export default function TechnicalFeatures() {
    const features = [
        {
            icon: <Activity className="w-6 h-6 text-primary" />,
            title: "Autonomous Diagnosis",
            description: "Our AI agents analyze logs and metrics in real-time, using Pydantic-validated JSON to provide structured, accurate root-cause analysis without hallucination.",
        },
        {
            icon: <Database className="w-6 h-6 text-primary" />,
            title: "Zero-Latency Persistence",
            description: "Built on Prisma Postgres in the Seoul region, ensuring your incident states are persisted instantly and available globally with minimal latency.",
        },
        {
            icon: <Shield className="w-6 h-6 text-primary" />,
            title: "SRE Guardrails",
            description: "Safety-first architecture where humans define the boundaries. Configure strict policies for AI actions to ensure no unintended side effects in production.",
        },
    ];

    return (
        <section className="bg-black py-24 relative overflow-hidden">
            {/* Decorative Grid */}
            <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:30px_30px] [mask-image:linear-gradient(to_bottom,transparent,black)]" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Built for <span className="text-primary">Reliability</span> Engineers
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Deep technical capabilities designed to handle the complexity of modern distributed systems.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(124,58,237,0.1)] hover:-translate-y-1"
                        >
                            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/30 transition-colors">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                            <p className="text-gray-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
