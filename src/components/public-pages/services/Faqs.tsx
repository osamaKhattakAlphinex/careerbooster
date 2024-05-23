"use client";
import { Fjalla_One, Montserrat } from "next/font/google";
import React from "react";
const fjalla_One = Fjalla_One({
  weight: "400",
  subsets: ["latin"],
});
const montserrat_n = Montserrat({
  weight: "400",
  subsets: ["latin"],
});
const faqs = [
  {
    question: "Will you need access to my LinkedIn account?",
    answer:
      "No, we do not need access to your LinkedIn account. All we need from you is a brief of your requirements, your existing resume, and any additional information you would like us to consider while optimizing your profile.",
  },
  {
    question: "Can I request revisions after the optimization is completed?",
    answer:
      "Yes, we offer up to 3 rounds of revisions for our Full Profile Rewriting & Optimization service, and 2 rounds of revision for the Keyword Optimization Only service. Please note that the revisions must be requested within 7 days of receiving the optimized profile.",
  },
  {
    question:
      "How long does it take to complete the LinkedIn Optimization service?",
    answer:
      "The time it takes to complete the LinkedIn Optimization service varies depending on the service you choose. Generally, it takes around 5-7 business days to complete the Full Profile Rewriting & Optimization service, and 3-5 business days for the Keyword Optimization Only service. However, please note that the turnaround time can also depend on the workload and complexity of your profile.",
  },
  {
    question:
      "How much time do I need to invest in optimizing my LinkedIn profile?",
    answer:
      "We understand that your time is valuable, so we aim to make the process as easy and efficient as possible. We provide you with everything you need to implement the changes quickly and easily, including a step-by-step guide. In most cases, it should take you less than 30 minutes to implement the recommended changes and optimize your profile.",
  },
  {
    question: "What if I am not satisfied with the results?",
    answer:
      "We offer a 100% satisfaction guarantee for our LinkedIn Optimization service. If you are not satisfied with the results, we will work with you to make the necessary revisions or provide a refund of your payment.",
  },
];
function Faqs() {
  return (
    <div
      className={`mb-6 md:mx-10 xs:mx-4 rounded-md shadow-md border border0gray-1000 mt-6 flex flex-col py-10`}
    >
      <h1
        className={`lg:text-[54px] md:text-[44px] xs:text-[26px] mb-6 ${fjalla_One.className} text-center`}
      >
        <strong>Still Have Questions?</strong>
      </h1>
      <div className="flex flex-col lg:px-20 md:px-10 xs:px-2 xs:text-center md:text-left lg:gap-10 md:gap-6 xs:gap-4 md:my-10 xs:mb-4">
        {faqs.map((items) => {
          return (
            <>
              <p
                className={`${fjalla_One.className} lg:text-[32px] md:text-[26px] xs:text-[20px]`}
              >
                {items.question}
              </p>
              <p
                className={`${montserrat_n.className} lg:text-[20px] md:text-[18px] xs:text-[14px]`}
              >
                {items.answer}
              </p>
            </>
          );
        })}
      </div>

      <div className="linkedinPdfButton flex justify-center mt-11 md:mt-11">
        <label
          className=" py-[12px] lg:py-[20px] text-white lg:px-[40px]  px-[28px] cursor-pointer  rounded-xl bg-gradient-to-r to-violet-500 from-fuchsia-500 hover:scale-75 hover:transition-all hover:duration-300 hover:ease-in-out"
          onClick={() => {
            const targetElement = document.querySelector(".serviceForm");
            const topOffset = 300; // Adjust this value as needed
            if (targetElement) {
              const targetTop =
                targetElement.getBoundingClientRect().top +
                window.scrollY -
                topOffset;
              window.scrollTo({
                top: targetTop,
                behavior: "smooth",
              });
            }
          }}
        >
          <div className="flex gap-2 ">
            <div className="text-center ">
              <p className="m-0 font-semibold whitespace-nowrap lg:text-[20px] cursor-pointer text-[14px] lg:leading-6 leading-4[text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">
                GET FREE BONUSES! ORDER NOW
              </p>
              <p className="lg:text-[14px] text-[10px] lg:leading-[17px] leading-[14px] pt-2">
                Click Here To Optimize Your Linkedin
              </p>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
}

export default Faqs;
