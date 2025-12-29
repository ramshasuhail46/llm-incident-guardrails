import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Side: Copy */}
          <div className="lg:w-1/2 text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6 font-sans">
              Resolve incidents before they <span className="text-gradient">escalate</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-lg leading-relaxed">
              The modern incident response platform built for high-velocity engineering teams. 
              Automate workflows, reduce downtime, and manage chaos with ease.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-opacity-90 transition-all shadow-lg shadow-primary/20">
                Start Free Trial
              </button>
              <button className="px-8 py-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all">
                View Demo
              </button>
            </div>
          </div>

          {/* Right Side: Dashboard Mockup */}
          <div className="lg:w-1/2 relative">
            <div className="relative z-10 rounded-2xl shadow-2xl overflow-hidden border border-gray-100 transform lg:rotate-2 hover:rotate-0 transition-transform duration-500">
              <Image
                src="/dashboard-mockup.png"
                alt="IncidentFlow Dashboard"
                width={800}
                height={600}
                className="w-full h-auto"
                priority
              />
            </div>
            {/* Decorative background elements */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
