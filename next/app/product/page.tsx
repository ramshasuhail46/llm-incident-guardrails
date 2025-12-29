import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import ProductHero from '@/components/product/ProductHero';
import TechnicalFeatures from '@/components/product/TechnicalFeatures';
import IntegrationEcosystem from '@/components/product/IntegrationEcosystem';
import ReliabilitySection from '@/components/product/ReliabilitySection';
import LogicFlow from '@/components/product/LogicFlow';
import GuardrailComparison from '@/components/product/GuardrailComparison';
import InfrastructureLatency from '@/components/product/InfrastructureLatency';
import TechStackBadge from '@/components/product/TechStackBadge';
import NoiseReduction from '@/components/product/NoiseReduction';

export default function ProductPage() {
    return (
        <main className="bg-[#0A0A0A] min-h-screen">
            <Navbar />
            <ProductHero />
            <LogicFlow />
            <TechnicalFeatures />
            <GuardrailComparison />
            <InfrastructureLatency />
            <NoiseReduction />
            <IntegrationEcosystem />
            <ReliabilitySection />
            <TechStackBadge />
            <Footer />
        </main>
    );
}
