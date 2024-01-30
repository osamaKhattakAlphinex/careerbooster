import type { Metadata } from "next";
import CTASection from "@/components/public-pages/Homepage/CTASection";
import FeaturesSecond from "@/components/public-pages/Homepage/FeaturesSecond";
import FeaturesSection from "@/components/public-pages/Homepage/FeaturesSection";
import HeroArea from "@/components/public-pages/Homepage/HeroArea";
import PricingSection from "@/components/public-pages/Homepage/PricingSection";
import Reviews from "@/components/public-pages/Homepage/Reviews";
import RewardsSection from "@/components/public-pages/Homepage/RewardsSection";
import UseCases from "@/components/public-pages/Homepage/UseCases";
import FAQList from "@/components/public-pages/Homepage/Faqs";
import "../plugins.css";
import "../style.css";

export const metadata: Metadata = {
  title: "CareerBooster.AI",
  description:
    "Your Free AI Resume Writer & LinkedIn Optimization Tool to Turbocharge Your Career!",
  keywords: [
    "CareerBooster.Ai",
    "Ai resume Generator tool",
    "Ai resume writer tool",
    "Ai LinkedIn Optimization Tool",
    "careerBooster.Ai",
    "CareerBooster.Ai",
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
    <>
      <main className="flex-grow-1 pb-20 overflow-x-hidden">
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
        <FAQList />

        {/* <!-- CTA --> */}
        <CTASection />
      </main>
    </>
  );
}
