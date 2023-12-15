// "use client";

// import { hotjar } from "react-hotjar";
import type { Metadata } from "next";
import CTASection from "@/components/new-layout/Homepage/CTASection";
import FeaturesSecond from "@/components/new-layout/Homepage/FeaturesSecond";
import FeaturesSection from "@/components/new-layout/Homepage/FeaturesSection";
import HeroArea from "@/components/new-layout/Homepage/HeroArea";
import PricingSection from "@/components/new-layout/Homepage/PricingSection";
import Reviews from "@/components/new-layout/Homepage/Reviews";
import RewardsSection from "@/components/new-layout/Homepage/RewardsSection";
import UseCases from "@/components/new-layout/Homepage/UseCases";
import FAQList from "@/components/new-layout/Homepage/Faqs";
import "./plugins.css";
import "./style.css";
import { useEffect } from "react";

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
  // useEffect(() => {
  //   hotjar.initialize(3796095, 6);
  // }, []);
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
