import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import GuidelinesSection from "@/components/GuidelinesSection";
import HeroSection from "@/components/HeroSection";
import OperationalLoopSection from "@/components/OperationalLoopSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import SpecTreeVisualization from "@/components/SpecTreeVisualization";

export default function Home() {
  return (
    <>
      {/* Background layers */}
      <div className="grid-background" aria-hidden="true" />
      <div className="noise-overlay" aria-hidden="true" />

      <main className="min-h-screen flex flex-col">
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <GuidelinesSection />
        <OperationalLoopSection />
        <SpecTreeVisualization />
        <CTASection />
        <Footer />
      </main>
    </>
  );
}
