import { Server, Activity, ShieldCheck, CheckCircle2 } from 'lucide-react';

const personas = [
    {
        title: 'DevOps Engineers',
        icon: <Activity className="w-8 h-8 text-blue-500" />,
        role: 'Orchestrators of Stability',
        painPoints: [
            { pain: 'Alert Fatigue', solution: 'Stops the 3 AM alert storm through intelligent grouping' },
            { pain: 'Manual Firefighting', solution: 'Automates routine fixes like restart & cache clearing' },
            { pain: 'Fragmented Context', solution: 'Unifies logs, metrics, and traces in one timeline' }
        ]
    },
    {
        title: 'Site Reliability Engineers',
        icon: <Server className="w-8 h-8 text-purple-500" />,
        role: 'Guardians of Reliability',
        painPoints: [
            { pain: 'Undefined SLOs', solution: 'Automatically tracks error budgets & burn rates' },
            { pain: 'Toil Overload', solution: 'Reduces repetitive tasks by 70% with executable runbooks' },
            { pain: 'Unsafe Automation', solution: 'Enforces guardrails to prevent cascading failures' }
        ]
    },
    {
        title: 'Engineering Leadership',
        icon: <ShieldCheck className="w-8 h-8 text-green-500" />,
        role: 'Strategic Visionaries',
        painPoints: [
            { pain: 'Lack of Visibility', solution: 'Provides high-level dashboards on system health & costs' },
            { pain: 'Slow MTTR', solution: 'Accelerates resolution time with AI-driven root cause analysis' },
            { pain: 'Compliance Risks', solution: 'Ensures full audit trails for every automated action' }
        ]
    }
];

export default function PersonaGrid() {
    return (
        <section className="py-24 bg-[#0A0A0A] relative overflow-hidden">
            <div className="container mx-auto px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Built for every <span className="text-gradient">engineering role</span>
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Tailored solutions to solve the unique challenges of modern infrastructure teams.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {personas.map((persona, index) => (
                        <div
                            key={index}
                            className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-300 hover:bg-white/10"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 rounded-lg bg-white/5 group-hover:bg-primary/20 transition-colors">
                                    {persona.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">{persona.title}</h3>
                                    <p className="text-sm text-gray-400">{persona.role}</p>
                                </div>
                            </div>

                            <ul className="space-y-4">
                                {persona.painPoints.map((item, i) => (
                                    <li key={i} className="flex flex-col gap-1">
                                        <div className="flex items-start gap-2">
                                            <div className="min-w-[4px] h-[4px] mt-2 rounded-full bg-red-500/50" />
                                            <span className="text-sm text-gray-500 line-through decoration-red-500/30">
                                                {item.pain}
                                            </span>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                                            <span className="text-sm text-gray-300 font-medium">
                                                {item.solution}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
        </section>
    );
}
