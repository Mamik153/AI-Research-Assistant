import { AppHeader } from "@/shared/components/AppHeader";
import { HeroSection } from "./HeroSection.tsx";
import { FeaturesSection } from "./FeaturesSection.tsx";
import { CaseStudySection } from "./CaseStudySection.tsx";
import { WhyBetterSection } from "./WhyBetterSection.tsx";
import { CTASection } from "./CTASection.tsx";
import { FooterSection } from "./FooterSection.tsx";

// Landing Page Component
export function LandingPage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-gray-200">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[120px] mix-blend-screen"
          style={{ animation: "pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite" }}
        />
        <div
          className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px] mix-blend-screen"
          style={{
            animation: "pulse 10s cubic-bezier(0.4, 0, 0.6, 1) infinite 2s",
          }}
        />
        <div
          className="absolute -bottom-[20%] left-[20%] w-[60%] h-[60%] rounded-full bg-indigo-600/20 blur-[120px] mix-blend-screen"
          style={{
            animation: "pulse 12s cubic-bezier(0.4, 0, 0.6, 1) infinite 4s",
          }}
        />
      </div>
      <div className="relative z-10">
        <AppHeader />
        <main>
          <HeroSection />
          <FeaturesSection />
          <CaseStudySection />
          <WhyBetterSection />
          <CTASection />
          <FooterSection />
        </main>
      </div>
    </div>
  );
}
