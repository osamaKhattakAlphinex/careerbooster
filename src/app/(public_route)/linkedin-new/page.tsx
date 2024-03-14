import HeroArea from "@/components/public-pages/linkedin/HeroArea";
import LinkedInToolMain from "@/components/public-pages/linkedin/LinkedInToolMain";
import { Metadata } from "next";

//latest code
export const metadata: Metadata = {
  title: "CareerBooster.ai-linkedin",
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

export default function LinkedInNewPage() {
  return (
    <div className="flex-grow-1  w-full">
      {/* LinkedIn Tool Card */}
      <section className="">
        <div className="flex flex-col text-white">
          <HeroArea />
          <LinkedInToolMain />
        </div>
        {/* <Avatar1 firstName="one" lastName="any" /> */}
      </section>
    </div>
  );
}