import AboutCard from "@/components/new-layout/About/AboutCard";
import BrandsCard from "@/components/new-layout/About/BrandsCard";
import FeaturesCard from "@/components/new-layout/About/FeaturesCard";
import TeamCard from "@/components/new-layout/About/TeamCard";
import CTASection from "@/components/new-layout/Homepage/CTASection";
import FeaturesSection from "@/components/new-layout/Homepage/FeaturesSection";
import Reviews from "@/components/new-layout/Homepage/Reviews";
import PageHeader from "@/components/new-layout/PageHeader";

export default function AboutPage() {
  return (
    <main className="flex-grow-1 mb-20">
      {/* <!-- Page header --> */}
      <PageHeader title="About CareerBooster.AI" secondTitle="About us" />

      {/* About Card */}
      <AboutCard />

      {/* Features Section */}
      <FeaturesSection />

      {/* Team */}
      <TeamCard />

      {/* Reviews */}
      <Reviews />

      {/* Brands */}
      <BrandsCard />

      {/*<!-- CTA --> */}
      <CTASection />
    </main>
  );
}
