
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import SolutionsHero from '@/components/solutions/SolutionsHero';
import PersonaGrid from '@/components/solutions/PersonaGrid';
import BeforeAfterToggle from '@/components/solutions/BeforeAfterToggle';
import ComplianceSection from '@/components/solutions/ComplianceSection';

export default function SolutionsPage() {
    return (
        <main className="min-h-screen bg-[#0A0A0A]">
            <Navbar />
            <SolutionsHero />
            <BeforeAfterToggle />
            <PersonaGrid />
            <ComplianceSection />
            <Footer />
        </main>
    );
}
