import CTASection from "@/components/public-pages/Homepage/CTASection";
import FAQList from "@/components/public-pages/Homepage/Faqs";
import PricingSection from "@/components/public-pages/Homepage/PricingSection";
import PageHeader from "@/components/PageHeader";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CareerBooster.ai-Pricing",
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
    "CareerBooster.AI About ",
    "About CareerBooster.AI",
    "Contact CareerBooster.AI",
    "CareerBooster.AI Contact",
    "CareerBooster.AI Contact",
    "CareerBooster.AI Pricing",
    "CareerBooster.AI Pricing Plans",
    "Pricing CareerBooster.AI",
    "Packages Of CareerBooster",
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function PricingPage() {
  return (
    <>
      <main className="flex-grow-1 pb-20 dark:bg-gray-950 bg-gray-100">
        {/* <!-- Page header --> */}
        <PageHeader secondTitle="Pricing" />

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
