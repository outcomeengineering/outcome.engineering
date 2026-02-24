import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import Section from "@/components/Section";
import StoryStep from "@/components/StoryStep";
import WhyOutcomesSection from "@/components/WhyOutcomesSection";
import { principleSteps, specTreeSteps } from "@/lib/story-data";

export default function Home() {
  return (
    <>
      {/* Background layers */}
      <div className="grid-background" aria-hidden="true" />
      <div className="noise-overlay" aria-hidden="true" />

      <main className="min-h-screen flex flex-col">
        <HeroSection />
        <ProblemSection />

        <Section id="principles" title="Three principles for staying in control" maxWidthClass="max-w-5xl">
          <div className="story-steps">
            {principleSteps.map((step) => <StoryStep key={step.id} step={step} />)}
          </div>
        </Section>

        <WhyOutcomesSection />

        <Section id="spec-tree" title="The Spec Tree in practice" maxWidthClass="max-w-5xl">
          <p className="text-[var(--text-secondary)] leading-relaxed">
            A git-native directory structure where each node co-locates a spec, its tests, and a lock file.
          </p>
          <div className="story-steps">
            {specTreeSteps.map((step) => <StoryStep key={step.id} step={step} />)}
          </div>
        </Section>

        <CTASection />
        <Footer />
      </main>
    </>
  );
}
