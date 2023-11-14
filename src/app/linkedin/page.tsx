import LinkedInToolNew from "@/components/new-layout/linkedin/LinkedInToolNew";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CareerBooster.AI-linkedin",
  description:
    "Elevate your career with CareerBooster.AI – Your go-to destination for AI-powered tools that transform your professional image. In today's competitive job market, trust our expertise in crafting ATS-friendly resumes and captivating executive resumes. Join over 20,000 professionals who've revolutionized their job hunt with CareerBooster.",
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
      <LinkedInToolNew />
    </div>
  );
}
