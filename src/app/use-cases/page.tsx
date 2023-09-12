import CTASection from "@/components/new-layout/Homepage/CTASection";
import FAQSection from "@/components/new-layout/Homepage/FAQSection";
import UseCases from "@/components/new-layout/Homepage/UseCases";
import PageHeader from "@/components/new-layout/PageHeader";

export default function UseCasesPage() {
  return (
    <main className="flex-grow-1 mb-20">
      {/* <!-- Page header --> */}
      <PageHeader title="Use Cases" />

      {/* <!-- Use cases --> */}
      <UseCases />

      {/* <!-- FAQ --> */}
      <FAQSection />

      {/* <!-- CTA --> */}
      <CTASection />
    </main>
  );
}
