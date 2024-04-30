import CTASection from "@/components/public-pages/Homepage/CTASection";
import FAQList from "@/components/public-pages/Homepage/Faqs";
import UseCases from "@/components/public-pages/Homepage/UseCases";
import PageHeader from "@/components/PageHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CareerBooster.ai-UseCases",
  description:
    "Explore real-world applications of CareerBooster's AI-powered tools in our Use Cases section. Discover how professionals across industries achieve career success through tailored resumes, LinkedIn optimization, and more. See how CareerBooster can elevate your unique career path.",
  keywords: [
    "CareerBooster.AI",
    "AI-powered tools",
    "AI Resume Builder",
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
      <main className="bg-[#fff] dark:bg-[#171825]">
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
