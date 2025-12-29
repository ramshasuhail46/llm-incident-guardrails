import Link from 'next/link';
import Image from 'next/image';

export default function ProductHero() {
    return (
        <section className="relative pt-32 pb-24 overflow-hidden bg-[#0A0A0A]">
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
            <div className="absolute inset-0 flex items-center justify-center bg-[#0A0A0A] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        v2.0 Now Available
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
                        AI-Powered SRE: From Incident to <span className="text-primary">Resolution</span> in Seconds.
                    </h1>

                    <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                        IncidentFlow acts as an autonomous teammates for your on-call rotation.
                        It detects, diagnoses, and remediates production issues without waking you up.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/sign-up"
                            className="px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(124,58,237,0.5)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)]"
                        >
                            Get Started
                        </Link>
                        <Link
                            href="/docs"
                            className="px-8 py-4 bg-white/5 text-white font-semibold rounded-xl hover:bg-white/10 transition-all border border-white/10"
                        >
                            Read Documentation
                        </Link>
                    </div>
                </div>

                <div className="relative mx-auto rounded-xl border border-white/10 bg-white/5 p-2 shadow-2xl backdrop-blur-sm max-w-5xl">
                    <div className="aspect-[16/9] rounded-lg overflow-hidden bg-gray-900 border border-white/5 relative">
                        <Image
                            src="/dashboard-dark.png"
                            alt="IncidentFlow Dashboard"
                            fill
                            className="object-cover"
                            priority
                        />

                        {/* Fallback overlay if image doesn't load immediately or to add depth */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-50" />
                    </div>
                </div>
            </div>

            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-primary/20 rounded-full blur-[100px] opacity-30 pointer-events-none" />
        </section>
    );
}
