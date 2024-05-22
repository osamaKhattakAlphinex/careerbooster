import HeroArea from "@/components/public-pages/services/HeroArea";
import Interests from "@/components/public-pages/services/Interests";
import { LinkedinProfile } from "@/components/public-pages/services/LinkedinProfile";
import RecommendArea from "@/components/public-pages/services/RecommendArea";
import React from "react";

const Services = () => {
  return (
    <section className="hero min-h-screen bg-gradient-to-r  from-[#01010D80] via-[#000A6380] to-purple-900 overflow-x-hidden md:px-0 pt-24  lg:pt-[100px] lg:npt-10">
      <HeroArea />
      <RecommendArea />
      <LinkedinProfile />
      <Interests />
    </section>
  );
};

export default Services;
