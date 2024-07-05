"use client";
import React, { useState } from "react";
import { Fade } from "react-awesome-reveal";
const jobSeekerfaqs = [
  {
    question: "What services does CareerBooster.ai offer for job seekers?",
    answer:
      "CareerBooster.ai provides a range of services including Find Job4Me, an AI-powered job board, resume and LinkedIn optimization tools, interview coaching, networking opportunities, personal branding, salary negotiation assistance, career transition support, and executive mentorship.",
  },
  {
    question: "What is CareerBooster’s Find Job4Me?",
    answer:
      "Find Job4Me is a unique service designed for busy executives. We manage your entire job search process and find you the perfect job. Visit the Find Job4Me page to learn more.",
  },
  {
    question: "How does the AI-powered job board work?",
    answer:
      "Our AI-powered job board matches your profile with senior-level job opportunities based on your skills, experience, and preferences, ensuring you find the best fit for your career goals.",
  },
  {
    question: "Can you help with resume and LinkedIn profile optimization?",
    answer:
      "Yes, our CareerBoost AI Suite offers advanced tools to optimize your resume, LinkedIn profile, and cover letters, making sure they stand out to recruiters and pass through Applicant Tracking Systems (ATS).",
  },
];
const employerFaqs = [
  {
    question: "What executive recruitment services do you offer?",
    answer:
      "We specialize in connecting companies with top executive talent, including C-level positions (CMO, CFO, CTO, CIO, etc.), senior managers, directors, VPs, and SVPs, through our extensive network and rigorous vetting process.",
  },
  {
    question: "How does CareerBooster.ai's job board benefit employers?",
    answer:
      "Our job board features vetted, high-caliber executive candidates, making it easier for employers to find and hire the right talent quickly and efficiently.",
  },
  {
    question: "What additional services do you provide for employers?",
    answer:
      "In addition to executive recruitment, we offer board and CEO services, acquisition solutions, leadership development, diversity and inclusion recruitment, and market intelligence and insights to support your talent acquisition and organizational growth.",
  },
  {
    question: "Can you assist with building a diverse and inclusive workforce?",
    answer:
      "Yes, we are committed to promoting diversity and inclusion in the workplace. Our specialized recruitment services help you build a workforce that reflects diverse perspectives and fosters an inclusive culture.",
  },
  {
    question:
      "What makes CareerBooster.ai different from other recruitment services?",
    answer:
      "CareerBooster.ai combines advanced AI technology with personalized support and a comprehensive suite of services to provide efficient and effective solutions for both job seekers and employers, focusing on senior-level and executive roles.",
  },
];

function FAQItem(props: any) {
  const [isOpen, setIsOpen] = useState(() => {
    if (props.isOpen) {
      return true;
    }
    return false;
  });

  const toggleFAQ = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section className="dark:bg-gray-950 bg-gray-100">
      <div className=" flex flex-col gap-6 ">
        <div className=" lg:mb-[48px] mb-[24px]">
          <h2 className=" ">
            <button
              className="dark:text-gray-100 text-gray-950 hover:text-[#6a4dff] dark:hover:text-[#e6f85e] flex flex-row text-left justify-start  items-start md:text-xl text-base focus:text-[#6a4dff] dark:focus:text-[#e6f85e] font-normal"
              onClick={toggleFAQ}
              type="button"
            >
              {!isOpen ? (
                <div className="flex justify-start items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 mr-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v12m6-6H6"
                    />
                  </svg>
                </div>
              ) : (
                <div className="flex justify-start items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 mr-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 12h-15"
                    />
                  </svg>
                </div>
              )}
              <div className="flex"> {props.question}</div>
            </button>
          </h2>
          {isOpen && (
            <div className="">
              <div className=" dark:text-gray-100 text-gray-950 pt-2 xs:pt-4 md:text-base xs:text-sm">
                {props.answer}
              </div>
            </div>
          )}
          <hr className=" dark:text-gray-100 text-gray-950 mt-4" />
        </div>
      </div>
    </section>
  );
}
function EmployerFAQItem(props: any) {
  const [isOpen, setIsOpen] = useState(() => {
    if (props.isOpen) {
      return true;
    }
    return false;
  });

  const toggleFAQ = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section className="dark:bg-gray-950 bg-gray-100">
      <div className=" flex flex-col gap-6 ">
        <div className=" lg:mb-[48px] mb-[24px]">
          <h2 className=" ">
            <button
              className="dark:text-gray-100 text-gray-950 hover:text-[#6a4dff] dark:hover:text-[#e6f85e] flex flex-row text-left justify-start  items-start md:text-xl text-base focus:text-[#6a4dff] dark:focus:text-[#e6f85e] font-normal"
              onClick={toggleFAQ}
              type="button"
            >
              {!isOpen ? (
                <div className="flex justify-start items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 mr-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v12m6-6H6"
                    />
                  </svg>
                </div>
              ) : (
                <div className="flex justify-start items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 mr-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 12h-15"
                    />
                  </svg>
                </div>
              )}
              <div className="flex"> {props.question}</div>
            </button>
          </h2>
          {isOpen && (
            <div className="">
              <div className=" dark:text-gray-100 text-gray-950 pt-2 xs:pt-4 md:text-base xs:text-sm">
                {props.answer}
              </div>
            </div>
          )}
          <hr className=" dark:text-gray-100 text-gray-950 mt-4" />
        </div>
      </div>
    </section>
  );
}

function FAQList() {
  return (
    <section className="py-4 lg:py-16 dark:bg-gray-950 bg-gray-100">
      <Fade duration={2000}>
        <div className="mx-auto w-full sm:container xs:max-w-full xs:px-2 ">
          <div className="flex xs:justify-start md:justify-center mb-18">
            <div className="flex flex-col md:w-10/12 xs:w-full px-2">
              <div className="text-center">
                <h1 className=" dark:text-gray-100 text-gray-950 md:text-3xl xs:text-xl font-semibold md:mb-14 xs:mb-8">
                  Questions About CareerBooster.AI?
                  <br className="d-none d-md-block" />
                  We have Answers!
                </h1>
              </div>
            </div>
          </div>
          <div className="faq-list">
            <h1 className=" dark:text-[#e6f85e] text-gray-950 text-center md:text-2xl xs:text-xl font-semibold md:mb-14 xs:mb-8">
              For Job Seekers
            </h1>
            {jobSeekerfaqs.map((faq, index) => (
              <div className="flex flex-col  mx-auto px-2 " key={index}>
                <FAQItem
                  isOpen={index === 0}
                  question={faq.question}
                  answer={faq.answer}
                />
              </div>
            ))}
          </div>
          <div className="faq-list">
            <h1 className=" dark:text-[#e6f85e] text-gray-950 text-center md:text-2xl xs:text-xl font-semibold md:my-14 xs:mb-8">
              For Employers
            </h1>
            {employerFaqs.map((faq, index) => (
              <div className="flex flex-col  mx-auto px-2 " key={index}>
                <EmployerFAQItem
                  isOpen={index === 0}
                  question={faq.question}
                  answer={faq.answer}
                />
              </div>
            ))}
          </div>
        </div>
      </Fade>
    </section>
  );
}

export default FAQList;
