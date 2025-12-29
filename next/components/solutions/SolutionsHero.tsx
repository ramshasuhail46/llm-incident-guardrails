
export default function SolutionsHero() {
    return (
        <section className="pt-32 pb-16 bg-[#0A0A0A] text-center px-6">
            <div className="container mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                    Incident Management <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                        Reimagined for Everyone
                    </span>
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
                    From the DevOps engineer in the trenches to the VP of Engineering, IncidentFlow delivers value at every level of the stack.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                        Explore Solutions
                    </button>
                    <button className="px-8 py-3 bg-white/5 text-white font-semibold rounded-lg hover:bg-white/10 transition-all border border-white/10">
                        View Documentation
                    </button>
                </div>
            </div>
        </section>
    );
}
