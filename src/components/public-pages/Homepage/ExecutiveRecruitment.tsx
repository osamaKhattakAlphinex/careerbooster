"use client";
import Link from "next/link";
import React from "react";
import { Fjalla_One, Montserrat } from "next/font/google";
import { Fade } from "react-awesome-reveal";
import ToolUsage from "./ToolUsage";

const montserrat_r = Montserrat({
  weight: "400",
  subsets: ["latin"],
});
const heading_n = Fjalla_One({
  weight: "400",
  subsets: ["latin"],
});
const useCaseDetails = [
    {
      title: "Board and CEO Services",
      description:
        "Successful board and CEO recruitment goes beyond filling positions, it involves strategic alignment and a deep understanding of governance. Our Board & CEO Services are designed to enhance your board’s effectiveness with seasoned experts who provide insights on best practices, succession planning, and strategic governance. We help you build a cohesive and high-performing leadership team that aligns with your organization's mission and values.",
    },
    {
      title: "Senior Management Placement",
      description:
        "We excel in placing Senior Managers, Directors, Vice Presidents, Senior Vice Presidents, and various C-level positions such as CMO, CFO, CTO, and CIO. Our rigorous vetting process ensures that we connect you with leaders who possess the strategic vision and operational expertise to drive your organization forward.",
      
    },
    {
      title: "Acquisition Solutions",
      description:
        "Our tailored acquisition solutions focus on sourcing and placing middle management and professional staff across various industries. Utilizing proprietary databases and targeted strategies, our core research team swiftly identifies top candidates, ensuring a seamless fit for your organization. Whether it’s a singular placement or an enterprise-wide project, our approach enhances collaboration and success.",
    },
    
  ];
const useCaseDetails2 = [
    {
      title: "Leadership Development",
      description:
        "Invest in the growth of your leaders with our comprehensive leadership development programs. We offer personalized coaching, training, and development initiatives to nurture future leaders within your organization, ensuring they are equipped to meet evolving challenges.",
    },
    {
      title: "Diversity and Inclusion Recruitment",
      description:
        "Promote a diverse and inclusive workplace with our specialized recruitment services. We are committed to helping you build a workforce that reflects diverse perspectives and fosters an inclusive culture, driving innovation and better decision-making.",
      
    },
    {
      title: "Market Intelligence and Insights",
      description:
        "Stay ahead of industry trends with our market intelligence services. We provide actionable insights and analytics to inform your talent acquisition strategies, helping you make data-driven decisions that align with your organizational goals.",
    },
    
  ];
const ExecutiveRecruitment = () => {
  return (
    <div className="conatiner bg-gray-100 dark:bg-gray-950 ">
        <Fade duration={2000}>
          <div className="flex justify-center">
            <div className="flex flex-col w-9/12 xs:w-full">
              <div className="text-center py-10 xs:py-3 px-4">
                <p className="dark:text-[#e6f85e] text-[#0000ff] text-opacity-[0.6] text-lg">
                  CareerBooster.AI Executive Recruitment Service
                </p>
              </div>
            </div>
          </div>
        </Fade>
      <div className="flex justify-center w-full gap-20">
        <Fade duration={2000}>
        <div
          className={`w-2/3 content mx-auto text-center ${montserrat_r.className} text-sm md:text-lg`}
        >
          <p>
            At CareerBooster.ai, we specialize in identifying and connecting
            top-tier executive talent with organizations seeking transformative
            leaders. Our mission is to be your strategic partner, dedicated to
            elevating your organization through exceptional talent acquisition.
            We recognize the critical impact of effective leadership and are
            committed to delivering candidates who drive innovation and growth.
          </p>
          <br />
          <p>
            Our experienced team of recruiters leverages extensive industry
            knowledge and a vast network of professionals to provide
            comprehensive recruitment services. From middle management to
            C-suite roles, we ensure a precise match for your organizational
            needs.
          </p>
        </div>
        </Fade>
      </div>
   
      <div className="mt-10 flex flex-wrap xs:text-center md:text-start px-2 md:px-10">
      {useCaseDetails.map((item, index) => (
            <ToolUsage
              key={index}
              title={item.title}
              description={item.description}
             
            />
          ))}
          </div>

          <h1
          className={`${montserrat_r.className} mb-10 text-center !font-bold mt-20 dark:text-[#e6f85e] text-[#0000ff] text-opacity-[0.6] text-lg`}
        >
          Additional Services
        </h1>
      <div className="flex flex-wrap xs:text-center md:text-start px-2 md:px-10">
      {useCaseDetails2.map((item, index) => (
            <ToolUsage
              key={index}
              title={item.title}
              description={item.description}
             
            />
          ))}
          </div>
      <div
        className={`w-2/3 mt-10 pb-10 content mx-auto text-center ${montserrat_r.className} text-sm md:text-lg`}
      >
        <Fade duration={2000}>

        <p>
          At CareerBooster.ai, we are more than just a recruitment firm. We are
          your partners in building a successful, dynamic, and forward-thinking
          organization. Let us help you find the leaders who will drive your
          business to new heights.
        </p>

        <Link
          href="/register"
          className="flex font-semibold justify-center mt-8 items-center cursor-pointer gap-2 bg-gradient-to-r from-purple-700 to-pink-500 text-white px-3 py-3 rounded-lg lg:w-[24%] sm:w-[50%] md:w-[17%] xs:w-full mx-auto hover:from-purple-800 hover:to-pink-600 transition-all duration-300 ease-in-out"
        >
          Get Started Today!
        </Link>
        </Fade>
      </div>
    </div>
  );
};

export default ExecutiveRecruitment;
