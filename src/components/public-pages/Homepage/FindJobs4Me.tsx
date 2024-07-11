import React from "react";
import { Fjalla_One, Montserrat } from "next/font/google";
import Link from "next/link";
import HeroArea from "../FindJob4Me/HeroArea";
import VideoSection from "../FindJob4Me/VideoSection";
import HowWeDoIt from "../FindJob4Me/HowWeDoIt";
import Card from "../FindJob4Me/Card";
import HardAndEasyWay from "../FindJob4Me/HardAndEasyWay";
import FinallySection from "../FindJob4Me/FinallySection";
import Faqs from "../FindJob4Me/Faqs";

const montserrat_r = Montserrat({
  weight: "400",
  subsets: ["latin"],
});
const heading_n = Fjalla_One({
  weight: "400",
  subsets: ["latin"],
});

const FindJobs4Me = () => {
  return (
    <section className="md:pt-20 xs:pt-[0px] xs:pb-[50px] pb-10  md:pb-18  dark:bg-gray-950 bg-gray-100 dark:text-white text-gray-950  justify-center items-center min-h-screen flex flex-col">
      <HeroArea />
      <VideoSection />
      <HowWeDoIt />
      <Card />
      <HardAndEasyWay />
      <FinallySection />
      <Faqs />
    </section>
  );
};

export default FindJobs4Me;
