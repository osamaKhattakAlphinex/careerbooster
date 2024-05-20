import AboutCard from "@/components/public-pages/About/AboutCard";
import BrandsCard from "@/components/public-pages/About/BrandsCard";
// import FeaturesCard from "@/components/new-layout/About/FeaturesCard";
import TeamCard from "@/components/public-pages/About/TeamCard";
import CTASection from "@/components/public-pages/Homepage/CTASection";
import FeaturesSection from "@/components/public-pages/Homepage/FeaturesSection";
import Reviews from "@/components/public-pages/Homepage/Reviews";
import PageHeader from "@/components/PageHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CareerBooster.aI-About",
  description:
    "Elevate your career with CareerBooster.AI – Your go-to destination for AI-powered tools that transform your professional image. In today's competitive job market, trust our expertise in crafting ATS-friendly resumes and captivating executive resumes. Join over 20,000 professionals who've revolutionized their job hunt with CareerBooster.",
  keywords: [
    "CareerBooster.AI",
    "AI Resume Builder",
    "AI-powered tools",
    "ATS-friendly resumes",
    "Executive resumes",
    "Professional image",
    "Competitive job market",
    "Job hunt transformation",
    "Career advancement",
    "20,000+ professionals",
    "Revolutionize job search",
    "CareerBooster About ",
    "About CareerBooster",
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function AboutPage() {
  return (
    <>
      <main className="flex-grow-1 pb-20 dark:bg-gray-950 bg-gray-100">
        {/* <!-- Page header --> */}
        <PageHeader title="About CareerBooster.AI" secondTitle="About us" />

        {/* About Card */}
        <AboutCard />

        {/* Features Section */}
        <FeaturesSection />

        {/* Team */}
        <TeamCard />

        {/* Reviews */}
        <Reviews />

        {/* Brands */}
        <BrandsCard />

        {/*<!-- CTA --> */}
        <CTASection />
      </main>
    </>
  );
}
