import CTASection from "@/components/new-layout/Homepage/CTASection";
import FAQSection from "@/components/new-layout/Homepage/FAQSection";
import PricingSection from "@/components/new-layout/Homepage/PricingSection";
import UseCases from "@/components/new-layout/Homepage/UseCases";
import PageHeader from "@/components/new-layout/PageHeader";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "CareerBooster.Ai-Pricing",
  description:
    "Discover CareerBooster's pricing plans and choose the perfect package for your career needs. Unlock AI-powered tools for resume optimization, LinkedIn enhancement, and more. Start your journey to professional excellence with transparent and affordable pricing.",
  keywords: [
    "CareerBooster.AI",
    "AI-powered tools",
    "ATS-friendly resumes",
    "Executive resumes",
    "Professional image",
    "Competitive job market",
    "Job hunt transformation",
    "Career advancement",
    "20,000+ professionals",
    "Revolutionize job search",
    "Career Booster About ",
    "About Career Booster",
    "Contact Career Booster",
    "CareerBooster Contact",
    "CareerBooster.Ai Contact",
    "CareerBooster.Ai Pricing",
    "CareerBooster.Ai Pricing Plans",
    "Pricing CareerBooster.Ai",
    "Packages Of CareerBooster",
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function SubscribePage() {
  return (
    <main className="flex-grow-1 mb-20">
      {/* <!-- Pricing --> */}
      <PricingSection />
    </main>
  );
}
