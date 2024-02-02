"use client";
import React, { useState } from "react";
const faqs = [
  {
    question: "What is CareerBooster.AI?",
    answer:
      "CareerBooster.AI is an AI-powered platform designed to enhance your professional presentation and improve your chances in the job market. It offers a suite of tools and services to optimize your resume, LinkedIn profile, cover letters, and more.",
  },
  {
    question: "How does CareerBooster.AI work?",
    answer:
      "CareerBooster.AI uses advanced AI algorithms to analyze your existing career documents, such as resumes and LinkedIn profiles. It provides actionable insights, keyword optimization, and personalized recommendations to make your professional materials stand out to recruiters and employers.",
  },
  {
    question: "What makes CareerBooster.AI different from other tools?",
    answer:
      "CareerBooster.AI stands out because it's specifically designed for senior-level professionals. It's been developed by top executive resume writers and AI engineers to cater to the unique needs and expectations of experienced job seekers.",
  },
  {
    question: "Is CareerBooster.AI suitable for all industries and job levels?",
    answer:
      "Yes, CareerBooster.AI is designed to be versatile and adaptable to various industries and career levels. Whether you're a seasoned executive or a recent graduate, our tools can help you improve your professional presentation.",
  },
  {
    question: "Can I try CareerBooster.AI for free?",
    answer:
      "Yes, we offer a free package that includes services like ATS resume scanning, resume optimization, and a resume review. You can get a taste of our services before deciding to upgrade to our premium packages.",
  },
  {
    question: "How secure is my data on CareerBooster.AI?",
    answer:
      "We take data security seriously. Your personal and professional information is protected with the highest level of encryption and security protocols. We do not share your data with third parties.",
  },
  {
    question: "What do the premium packages include?",
    answer:
      "Our premium packages offer additional benefits, such as unlimited resume tailoring, cover letter customization, personalized emails to recruiters, and more. Please refer to our pricing section for a detailed breakdown of each package's features.",
  },
  {
    question: "How often can I use CareerBooster.AI's services?",
    answer:
      "The frequency of service usage depends on your chosen package. Free users have access to limited credits, while premium users can enjoy unlimited access to our tools and services.",
  },
  {
    question: "Is CareerBooster.AI suitable for international job seekers?",
    answer:
      "Yes, CareerBooster.AI is designed to assist job seekers globally. Our tools are adaptable to various job markets and industries, making them useful for international job searches.",
  },
  {
    question:
      "Do I need any special software or technical skills to use CareerBooster.AI?",
    answer:
      "No, CareerBooster.AI is designed to be user-friendly and accessible to individuals with basic computer skills. You don't need any specialized software or technical expertise to use our platform.",
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
              className="dark:text-gray-100 text-gray-950 hover:text-[#6a4dff] dark:hover:text-[#e6f85e] flex flex-row text-left justify-start  items-start lg:text-[30px] text-[18px] focus:text-[#6a4dff] dark:focus:text-[#e6f85e] font-semibold"
              onClick={toggleFAQ}
              type="button"
              //   data-bs-toggle="collapse"
              //   data-bs-target="#faq-collapseOne"
              //   aria-expanded="false"
              //   aria-controls="faq-collapseOne"
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
            <div
              className=""
              // data-bs-parent="#faqAccordion"
            >
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
    <section className="py-10 lg:py-16 dark:bg-gray-950 bg-gray-100">
      <div className="md:container">
        <div className="flex justify-center mb-18">
          <div className="flex flex-col md:w-10/12 xs:w-full">
            <div className="text-center">
              <h1 className=" dark:text-gray-100 text-gray-950 md:text-[48px] xs:text-[30px] font-semibold md:mb-14 xs:mb-8">
                Questions About CareerBooster.AI?
                <br className="d-none d-md-block" />
                We have Answers!
              </h1>
            </div>
          </div>
        </div>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div
              className="flex flex-col md:w-8/12 mx-auto xs:w-10/12"
              key={index}
            >
              <FAQItem
                isOpen={index === 0}
                question={faq.question}
                answer={faq.answer}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQList;
