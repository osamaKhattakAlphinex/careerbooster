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

export const metadata: Metadata = {
  title: "Home Page",
  description: "Home page description",
};

export default function Home() {
  return (
    <main className="flex-grow-1 mb-20">
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
