import Faqs from "@/components/public-pages/services/Faqs";
import Gurantee from "@/components/public-pages/services/Gurantee";
import HeroArea from "@/components/public-pages/services/HeroArea";
import Interests from "@/components/public-pages/services/Interests";
import { LinkedinProfile } from "@/components/public-pages/services/LinkedinProfile";
import OptimizedLinkedinProfile from "@/components/public-pages/services/OptimizedLinkedinProfile";
import RecommendArea from "@/components/public-pages/services/RecommendArea";
import ServicesForm from "@/components/public-pages/services/ServicesForm";
import React from "react";

const Services = () => {
  return (
    <section className="hero min-h-screen bg-gradient-to-r  from-gray-200 via-gray-200 to-gray-200 dark:from-[#01010D80] dark:via-[#000A6380] dark:to-purple-900  overflow-x-hidden md:px-0 pt-24  lg:pt-[100px] lg:npt-10">
      <HeroArea />
      <RecommendArea />
      <LinkedinProfile />
      <Interests />
      <OptimizedLinkedinProfile />
      <ServicesForm />
      <Gurantee />
      <Faqs />
    </section>
  );
};

export default Services;
