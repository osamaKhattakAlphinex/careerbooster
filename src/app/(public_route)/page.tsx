import type { Metadata } from "next";
import CTASection from "@/components/Homepage/CTASection";
import FeaturesSecond from "@/components/Homepage/FeaturesSecond";
import FeaturesSection from "@/components/Homepage/FeaturesSection";
import HeroArea from "@/components/Homepage/HeroArea";
import PricingSection from "@/components/Homepage/PricingSection";
import Reviews from "@/components/Homepage/Reviews";
import RewardsSection from "@/components/Homepage/RewardsSection";
import UseCases from "@/components/Homepage/UseCases";
import FAQList from "@/components/Homepage/Faqs";
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
        <FAQList />

        {/* <!-- CTA --> */}
        <CTASection />
      </main>
    </>
  );
}
