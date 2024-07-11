import ContactForm from "@/components/public-pages/Contact/ContactForm";
import PageHeader from "@/components/PageHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact - CareerBooster.ai",
  description:
    "Contact CareerBooster today for personalized assistance in turbocharging your career. Reach out to our expert team for inquiries, support, or partnership opportunities. Your path to career success starts with a simple message.",
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
    "CareerBooster.AI Contact",
    "CareerBooster.AI Contact",
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};
export default function ContactPage() {
  return (
    <>
      <main className="pt-5 flex-grow-1 bg-[#fff] dark:bg-[#171825]">
        {/* <!-- Page header --> */}
        <PageHeader title="Contact With Us" secondTitle="Contact" />

        <section className="">
          <div className="container mx-auto">
            <ContactForm />
            <br />
          </div>
        </section>
      </main>
    </>
  );
}
