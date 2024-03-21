import CoverLetterToolMain from "@/components/public-pages/cover-letter-generator/CoverLetterToolMain";
import HeroArea from "@/components/public-pages/linkedin/HeroArea";
import { Metadata } from "next";

//latest code
export const metadata: Metadata = {
  title: "CareerBooster.ai - Cover Letters",
  description:
    "Free AI LinkedIn Summary Generator To Achieve Top Rankings In Recruiter Searches And Secure More Interviews!",
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
    "CareerBooster About ",
    "About CareerBooster",
    "free ai linkedin summary generator",
    "free ai linkedin tool",
    "achieve top ranking in linkedin searches",
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function CoverLetterPage() {
  return (
    <div className="flex-grow-1  w-full">
      {/* LinkedIn Tool Card */}
      <section className="">
        <div className="flex flex-col text-white">
          <HeroArea />
          <CoverLetterToolMain />
        </div>
        {/* <Avatar1 firstName="one" lastName="any" /> */}
      </section>
    </div>
  );
}
