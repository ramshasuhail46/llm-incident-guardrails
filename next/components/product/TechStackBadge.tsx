import { Cpu, Database, Lock, Zap, Layers } from 'lucide-react';

export default function TechStackBadge() {
    const stack = [
        { name: "Next.js 15", icon: <Layers className="w-3 h-3" /> },
        { name: "Prisma 7", icon: <Database className="w-3 h-3" /> },
        { name: "Clerk Auth", icon: <Lock className="w-3 h-3" /> },
        { name: "OpenAI o1-preview", icon: <Cpu className="w-3 h-3" /> },
        { name: "Vercel Edge", icon: <Zap className="w-3 h-3" /> },
    ];

    return (
        <div className="bg-black py-12 border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-gray-500">
                    <span className="uppercase tracking-widest text-xs font-semibold text-gray-600">Powering Tech</span>
                    <div className="h-4 w-px bg-gray-800 hidden md:block" />

                    <div className="flex flex-wrap justify-center gap-4">
                        {stack.map((tech, index) => (
                            <div key={index} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-primary/30 hover:bg-white/10 transition-colors cursor-default">
                                {tech.icon}
                                <span className="text-gray-300 font-mono text-xs">{tech.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
