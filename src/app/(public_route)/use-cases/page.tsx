import CTASection from "@/components/Homepage/CTASection";
import FAQSection from "@/components/Homepage/FAQSection";
import FAQList from "@/components/Homepage/Faqs";
import UseCases from "@/components/Homepage/UseCases";
import PageHeader from "@/components/PageHeader";
import { Metadata } from "next";
import "@/app/plugins.css";
import "@/app/style.css";
export const metadata: Metadata = {
  title: "CareerBooster.AI-UseCases",
  description:
    "Explore real-world applications of CareerBooster's AI-powered tools in our Use Cases section. Discover how professionals across industries achieve career success through tailored resumes, LinkedIn optimization, and more. See how CareerBooster can elevate your unique career path.",
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
    "CareerBooster.AI Use Cases",
    "CareerBooster.AI Services",
    "Services CareerBooster.AI",
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function UseCasesPage() {
  return (
    <>
      <main className="flex-grow-1 mb-20">
        {/* <!-- Page header --> */}
        <PageHeader title="Use Cases" />

        {/* <!-- Use cases --> */}
        <UseCases />

        {/* <!-- FAQ --> */}
        <FAQList />

        {/* <!-- CTA --> */}
        <CTASection />
      </main>
    </>
  );
}
