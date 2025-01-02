"use client";
import Image from "next/image";
import React, { useState } from "react";

function FAQS() {
  const faqs = [
    {
      question: "What makes you different than your competitors?",
      answer:
        "Career Booster combines advanced AI technology with personalized support and a comprehensive suite of services to provide efficient and effective solutions for both job seekers and employers, focusing on senior-level and executive roles.",
    },
    {
      question: "What additional services do you provide for employers?",
      answer:
        "We offer tailored recruitment services, leadership training, and more.",
    },
    {
      question:
        "Can you assist with building a diverse and inclusive workforce?",
      answer:
        "Yes, we specialize in fostering diverse and inclusive hiring processes.",
    },
    {
      question: "What executive recruitment services do you offer?",
      answer:
        "We focus on senior management placement and confidential executive searches.",
    },
    {
      question: "What is CareerBooster's Find JobMe?",
      answer:
        "Find JobMe is an advanced AI-powered job board matching talent with opportunities.",
    },
    {
      question: "How does the AI-powered job board work?",
      answer:
        "It uses advanced algorithms to connect candidates with the most suitable roles.",
    },
  ];
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div className="bg-gradient-to-b from-dark-blue to-dark-black py-16">
      <div className=" mx-auto px-6 w-[1093px]">
        <div className="text-center text-white text-[28px] font-semibold font-['Outfit'] uppercase leading-7 tracking-[2.80px] pt-[60px] pb-[60px]">
          frequently asked questions
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`py-[18px] ${
                index !== faqs.length - 1 ? "border-b border-[#2c3845]" : ""
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left pr-6 py-4 text-white flex justify-between items-center"
              >
                <span className="text-white text-lg font-thin font-['Outfit'] leading-[18px] tracking-normal">
                  {faq.question}
                </span>
                <span>
                  {openIndex === index ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 15l7-7 7 7"
                        className="text-[#2797F3]"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </span>
              </button>
              {openIndex === index && (
                <div className="w-[911px] min-h-[39px] opacity-70 text-white text-[15px] font-thin font-['Outfit'] leading-7 tracking-wide pt-2">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="w-[1200px] mx-auto bg-[url('/bg/final-cta.png')] min-h-[400px] flex flex-col gap-8 items-center justify-center my-auto mt-[100px] relative  rounded-[30px]">
        <div
          className="absolute inset-0 flex justify-center items-center -z-10"
          aria-hidden="true"
        >
          <div className="w-[1250px] h-[400px]  opacity-10 bg-[#2797f2] rounded-[30px] rotate-[3.80deg] "></div>
        </div>
        <Image
          width={86}
          height={86}
          src="/bg/cb-rounded-icon.svg"
          alt="rounded"
        />
        <div className="w-[806px] text-center">
          <span className="text-white text-3xl font-bold font-['Outfit'] leading-[50px]">
            CareerBooster.ai
          </span>
          <span className="text-white text-3xl font-semibold font-['Outfit'] leading-[50px]">
            {" "}
          </span>
          <span className="text-white text-3xl font-medium font-['Outfit'] leading-[50px]">
            leverages AI-powered tools and resources to help you land a job up
            to 10 times faster.
          </span>
        </div>
        <div className="w-60 h-14 px-[35px] py-[18px] bg-white rounded-[32px] justify-center items-center gap-2.5 inline-flex">
          <div className="w-[169px] h-5 text-center text-[#2797f2] text-lg  font-['Outfit'] leading-[18px] ">
            Explore Hidden Jobs
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQS;
