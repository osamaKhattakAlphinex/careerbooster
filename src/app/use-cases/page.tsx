import CTASection from "@/components/new-layout/Homepage/CTASection";
import FAQSection from "@/components/new-layout/Homepage/FAQSection";
import FAQList from "@/components/new-layout/Homepage/Faqs";
import UseCases from "@/components/new-layout/Homepage/UseCases";
import PageHeader from "@/components/new-layout/PageHeader";
import { Metadata } from "next";
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
    "Career Booster About ",
    "About Career Booster",
    "Contact Career Booster",
    "CareerBooster Use Cases",
    "Career Booster Services",
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
  );
}
