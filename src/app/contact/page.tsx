import AddressCard from "@/components/new-layout/Contact/AddressCard";
import ContactForm from "@/components/new-layout/Contact/ContactForm";
import MapCard from "@/components/new-layout/Contact/MapCard";
import PageHeader from "@/components/new-layout/PageHeader";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "CareerBooster.Ai-Contact",
  description:
    "Contact CareerBooster today for personalized assistance in turbocharging your career. Reach out to our expert team for inquiries, support, or partnership opportunities. Your path to career success starts with a simple message.",
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
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};
export default function ContactPage() {
  return (
    <main className="flex-grow-1 mb-20">
      {/* <!-- Page header --> */}
      <PageHeader title="Contact With Us" secondTitle="Contact" />

      <section className="py-15 pt-lg-30">
        <div className="container">
          <AddressCard />
          <MapCard />
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
