import { Metadata } from "next";
import LinkedInUploadPDFResume from "@/components/public-pages/linkedin/LinkedInUploadPDFResume";

export const metadata: Metadata = {
  title: "CareerBooster.ai - Linkedin Optimizer",
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
    "test",
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};
//leinked in result page
export default function LinkedInPage() {
  return (
    <main className="flex-grow-1 bg-gradient-to-r from-gray-950 via-blue-950 to-purple-900">
      {/* LinkedIn Tool Card */}
      <section className="pt-14">
        <div className=" flex flex-col items-center">
        </div>
      </section>
    </main>
  );
}
