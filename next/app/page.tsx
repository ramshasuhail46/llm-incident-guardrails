import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import FeatureGrid from '@/components/landing/FeatureGrid';
import NoiseVsSignal from '@/components/landing/NoiseVsSignal';
import LivePipeline from '@/components/landing/LivePipeline';
import SocialProof from '@/components/landing/SocialProof';
import CTA from '@/components/landing/CTA';
import Footer from '@/components/landing/Footer';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary">
      <Navbar />
      <Hero />
      
      <FeatureGrid />
      <NoiseVsSignal />
      <LivePipeline />
      {/* <SocialProof /> */}
      <CTA />
      <Footer />
    </main>
  );
}
