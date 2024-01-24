import CTASection from "@/components/Homepage/CTASection";
import FAQSection from "@/components/Homepage/FAQSection";
import FAQList from "@/components/Homepage/Faqs";
import PricingSection from "@/components/Homepage/PricingSection";
import UseCases from "@/components/Homepage/UseCases";
import PageHeader from "@/components/PageHeader";

import { Metadata } from "next";
import "@/app/plugins.css";
import "@/app/style.css";
export const metadata: Metadata = {
  title: "CareerBooster.AI-Pricing",
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
      <main className="flex-grow-1 mb-20">
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
