import { Terminal, Sparkles, Shield, CheckCircle, ArrowRight } from 'lucide-react';

export default function LogicFlow() {
    const steps = [
        {
            icon: <Terminal className="w-6 h-6 text-white" />,
            title: "Ingestion",
            description: "Raw log data is received via the Python SDK.",
            color: "bg-blue-500"
        },
        {
            icon: <Sparkles className="w-6 h-6 text-white" />,
            title: "AI Processing",
            description: "GPT-4o analyzes the signal against your unique project context.",
            color: "bg-purple-500"
        },
        {
            icon: <Shield className="w-6 h-6 text-white" />,
            title: "Guardrail Check",
            description: "Policies verify the suggested action against human-defined safety limits.",
            color: "bg-amber-500"
        },
        {
            icon: <CheckCircle className="w-6 h-6 text-white" />,
            title: "Resolution",
            description: "Mitigation is executed or escalated to the dashboard.",
            color: "bg-green-500"
        }
    ];

    return (
        <section className="bg-black py-24 relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        How <span className="text-primary">IncidentFlow</span> Works
                    </h2>
                    <p className="text-gray-400 text-lg">
                        A transparent pipeline from chaos to calm.
                    </p>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <div key={index} className="relative group">
                                {/* Step Number/Icon */}
                                <div className="flex flex-col items-center text-center">
                                    <div className={`w-24 h-24 rounded-2xl ${step.color}/10 border border-white/5 flex items-center justify-center mb-6 relative group-hover:scale-110 transition-transform duration-300`}>
                                        <div className={`w-12 h-12 rounded-lg ${step.color} flex items-center justify-center shadow-lg`}>
                                            {step.icon}
                                        </div>

                                        {/* Arrow for desktop flow */}
                                        {index < steps.length - 1 && (
                                            <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 text-white/10">
                                                <ArrowRight className="w-6 h-6" />
                                            </div>
                                        )}
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                                    <p className="text-sm text-gray-400 leading-relaxed px-2">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
