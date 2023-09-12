import CTASection from "@/components/new-layout/Homepage/CTASection";
import FAQSection from "@/components/new-layout/Homepage/FAQSection";
import PricingSection from "@/components/new-layout/Homepage/PricingSection";
import UseCases from "@/components/new-layout/Homepage/UseCases";
import PageHeader from "@/components/new-layout/PageHeader";

export default function PricingPage() {
  return (
    <main className="flex-grow-1 mb-20">
      {/* <!-- Page header --> */}
      <PageHeader title="Pricing & Plan" secondTitle="Pricing" />

      {/* <!-- Pricing --> */}
      <PricingSection />

      {/* <!-- FAQ --> */}
      <FAQSection />

      {/* <!-- CTA --> */}
      <CTASection />
    </main>
  );
}
