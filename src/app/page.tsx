import type { Metadata } from "next";
import CTASection from "@/components/new-layout/Homepage/CTASection";
import FAQSection from "@/components/new-layout/Homepage/FAQSection";
import FeaturesSecond from "@/components/new-layout/Homepage/FeaturesSecond";
import FeaturesSection from "@/components/new-layout/Homepage/FeaturesSection";
import HeroArea from "@/components/new-layout/Homepage/HeroArea";
import PricingSection from "@/components/new-layout/Homepage/PricingSection";
import Reviews from "@/components/new-layout/Homepage/Reviews";
import RewardsSection from "@/components/new-layout/Homepage/RewardsSection";
import UseCases from "@/components/new-layout/Homepage/UseCases";
import FAQList from "@/components/new-layout/Homepage/Faqs";
import MainLoaderLayer from "@/components/new-layout/MainLoaderLayer";

export const metadata: Metadata = {
  title: "CareerBooster.AI - Home Page",
  description:
    "Unlock your career potential with CareerBooster – AI-powered tools for turbocharging your job search. From ATS-friendly resumes to LinkedIn optimization, discover the winning combination trusted by senior-level professionals. Try it free and revolutionize your job hunt today!",
  keywords: [
    "Career Booster",
    "careerbooster",
    "CareerBooster.AI",
    "AiCareerBooster",
    "Career advancement",
    "ATS-friendly resumes",
    "LinkedIn optimization",
    "Executive resume",
    "Career success",
    "Job market competitiveness",
    "Job applications",
    "Cover letter",
    "Resume ai",
    "ai resume writer",
    "Resume Ai builder",
    "Ai resume generator",
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function Home() {

  
  return (
    <main className="flex-grow-1 mb-20 ">
      {/* <!-- Hero --> */}

      <HeroArea />

      {/* <!-- Features --> */}
      <FeaturesSection />

      {/* <!-- Rewrds --> */}
      <RewardsSection />

      {/* <!-- Features --> */}
      <FeaturesSecond />

      {/* <!-- Use cases --> */}
      <UseCases />

      {/* <!-- Reviews --> */}
      <Reviews />

      {/* <!-- Pricing --> */}
      <PricingSection />

      {/* <!-- FAQ --> */}
      <FAQSection />

      {/* <!-- CTA --> */}
      <CTASection />
    </main>
  );
}
