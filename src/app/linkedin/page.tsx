import LinkedInToolMain from "@/components/new-layout/linkedin/LinkedInToolMain";
import { Metadata } from "next";
import "@/app/plugins.css";
import "@/app/style.css";
import Avatar from "@/components/utilities/Avatar";
//latest code
export const metadata: Metadata = {
  title: "CareerBooster.AI-linkedin",
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
    <div className="flex-grow-1 mb-20 w-full">
      {/* LinkedIn Tool Card */}
      <section className="mt-28 lg:mt-36">
        <div className="flex flex-col text-white">
          <LinkedInToolMain />
        </div>
        <Avatar />
      </section>
    </div>
  );
}
