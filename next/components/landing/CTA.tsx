import Link from 'next/link';

export default function CTA() {
    return (
        <section className="py-20 lg:py-28">
            <div className="container mx-auto px-6 lg:px-8">
                <div className="relative rounded-3xl overflow-hidden bg-[#0F172A] p-12 lg:p-20 text-center">
                    {/* Background Gradient Effect */}
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/20 via-transparent to-accent/20"></div>

                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                            Ready to streamline your incident response?
                        </h2>
                        <p className="text-xl text-gray-400 mb-10">
                            Join hundreds of engineering teams who trust IncidentFlow to manage their critical infrastructure.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/sign-up"
                                className="px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-opacity-90 transition-all shadow-lg shadow-primary/20 text-center w-full sm:w-auto"
                            >
                                Start Free Trial
                            </Link>
                            <Link
                                href="/dashboard?demo=true"
                                className="px-8 py-4 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all border border-white/10 text-center w-full sm:w-auto"
                            >
                                Explore Live Demo
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
