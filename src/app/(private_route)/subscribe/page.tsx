"use client";
import Packages from "@/components/dashboard/checkout/Packages";
import { Metadata } from "next";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const metadata: Metadata = {
  title: "CareerBooster.Ai-Pricing",
  description:
    "Discover CareerBooster's pricing plans and choose the perfect package for your career needs. Unlock AI-powered tools for resume optimization, LinkedIn enhancement, and more. Start your journey to professional excellence with transparent and affordable pricing.",
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
    "CareerBooster Contact",
    "CareerBooster.Ai Contact",
    "CareerBooster.Ai Pricing",
    "CareerBooster.Ai Pricing Plans",
    "Pricing CareerBooster.Ai",
    "Packages Of CareerBooster",
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function SubscribePage() {
  const [showExpiredAlert, setShowExpiredAlert] = useState(false);
  // check if there is ?expired=1 in the URL
  const params = useSearchParams();
  console.log(params);

  useEffect(() => {
    const expired = params?.get("expired");
    if (expired) {
      setShowExpiredAlert(true);
    }
  }, [params]);

  return (
    <main className="flex-grow-1 mb-20">
      <section className="py-10 py-lg-15">
        <div className="container">
          {showExpiredAlert && (
            <div className="row justify-center mb-8">
              <div
                className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
                role="alert"
              >
                <p className="m-0 p-0">
                  Your current package has been expired. Please resubscribe to a
                  package to choose Free package
                </p>
              </div>
            </div>
          )}
          <div className="row justify-center mb-8">
            <div className="col-lg-10">
              <div className="text-center">
                <h1
                  className="text-white text-4xl"
                  data-aos="fade-up-sm"
                  data-aos-delay="100"
                >
                  Please choose a pricing plan to continue
                </h1>
              </div>
            </div>
          </div>
          <div className="row g-6 pricing-table">
            <Packages />
          </div>
        </div>
      </section>
    </main>
  );
}
