import AddressCard from "@/components/public-pages/Contact/AddressCard";
import ContactForm from "@/components/public-pages/Contact/ContactForm";
import MapCard from "@/components/public-pages/Contact/MapCard";
import PageHeader from "@/components/PageHeader";
import { Metadata } from "next";
import "@/app/plugins.css";
export const metadata: Metadata = {
  title: "CareerBooster.AI-Contact",
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
      <main className=" mb-20">
        {/* <!-- Page header --> */}
        <PageHeader title="Contact With Us" secondTitle="Contact" />

        <section className="">
          <div className="xs:p-[2rem] md:p-[4rem] xl:p-[5rem] ">
            <ContactForm />
            <br />
            <AddressCard />
            <MapCard />
          </div>
        </section>
      </main>
    </>
  );
}
