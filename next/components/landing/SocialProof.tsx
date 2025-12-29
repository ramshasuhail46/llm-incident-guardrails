export default function SocialProof() {
    const testimonials = [
        {
            name: 'Sarah Chen',
            role: 'CTO at GlobalTech',
            quote: 'IncidentFlow transformed how we handle outages. Our MTTR dropped by 40% in just two months.',
            initials: 'SC',
        },
        {
            name: 'James Miller',
            role: 'VP of Engineering',
            quote: 'The automation playbooks are a game-changer. We no longer waste time on repetitive manual steps.',
            initials: 'JM',
        },
        {
            name: 'Elena Rodriguez',
            role: 'SRE Lead at Acme Corp',
            quote: 'Cleanest UI in the industry. Our team actually enjoys using it, even during high-pressure incidents.',
            initials: 'ER',
        },
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6 lg:px-8">
                {/* Partner Logos */}
                <div className="text-center mb-20">
                    <p className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-8">
                        Trusted by world-class engineering teams
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale">
                        <span className="text-2xl font-bold text-gray-600">ACME CORP</span>
                        <span className="text-2xl font-bold text-gray-600">GLOBALTECH</span>
                        <span className="text-2xl font-bold text-gray-600">PIXELVOID</span>
                        <span className="text-2xl font-bold text-gray-600">DATACORE</span>
                        <span className="text-2xl font-bold text-gray-600">NEXUSFLOW</span>
                    </div>
                </div>

                {/* Testimonials */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <div key={i} className="p-8 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col items-start shadow-sm shadow-gray-100/50">
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="text-gray-700 italic mb-8 leading-relaxed">"{t.quote}"</p>
                            <div className="flex items-center gap-4 mt-auto">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                                    {t.initials}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-sm">{t.name}</h4>
                                    <p className="text-gray-500 text-xs">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
