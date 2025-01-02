import CareerStart from "@/components/home-new/CareerStart";
import FAQS from "@/components/home-new/FAQS";
import Footer from "@/components/home-new/Footer";
import HeroArea from "@/components/home-new/HeroArea";
import HiddenJobs from "@/components/home-new/HiddenJobs";
import LinkedInAndProfile from "@/components/home-new/LinkedInAndProfile";
import NewsLetter from "@/components/home-new/NewsLetter";
import Stats from "@/components/home-new/Stats";
import TopExecutivetalent from "@/components/home-new/TopExecutivetalent";
import TrendingJobs from "@/components/home-new/TrendingJobs";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home - New - CareerBooster.ai",
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
      <main className="mt-10 flex-grow-1 overflow-y-hidden overflow-x-hidden">
        {/* Hero */}
        <HeroArea />
        {/* hidden jobs */}
        <HiddenJobs />
        {/* trending jobs  */}
        <TrendingJobs />
        {/* stats section  */}
        <Stats />

        {/* career start  */}
        <CareerStart />

        {/* linkedin and profile review section  */}
        <LinkedInAndProfile />

        {/* top executive talent  */}
        <TopExecutivetalent />

        {/* faqs  */}
        <FAQS />

        {/* News Letter  */}
        <NewsLetter />

        <Footer />
      </main>
    </>
  );
}
