import AddressCard from "@/components/new-layout/Contact/AddressCard";
import ContactForm from "@/components/new-layout/Contact/ContactForm";
import MapCard from "@/components/new-layout/Contact/MapCard";
import PageHeader from "@/components/new-layout/PageHeader";

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
