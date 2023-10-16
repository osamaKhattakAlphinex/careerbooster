"use client";
import React, { useState } from "react";
const faqs = [
  {
    question: "What is CareerBooster?",
    answer:
      "CareerBooster is an AI-powered platform designed to enhance your professional presentation and improve your chances in the job market. It offers a suite of tools and services to optimize your resume, LinkedIn profile, cover letters, and more.",
  },
  {
    question: "How does CareerBooster work?",
    answer:
      "CareerBooster uses advanced AI algorithms to analyze your existing career documents, such as resumes and LinkedIn profiles. It provides actionable insights, keyword optimization, and personalized recommendations to make your professional materials stand out to recruiters and employers.",
  },
  {
    question: "What makes CareerBooster different from other tools?",
    answer:
      "CareerBooster stands out because it's specifically designed for senior-level professionals. It's been developed by top executive resume writers and AI engineers to cater to the unique needs and expectations of experienced job seekers.",
  },
  {
    question: "Is CareerBooster suitable for all industries and job levels?",
    answer:
      "Yes, CareerBooster is designed to be versatile and adaptable to various industries and career levels. Whether you're a seasoned executive or a recent graduate, our tools can help you improve your professional presentation.",
  },
  {
    question: "Can I try CareerBooster for free?",
    answer:
      "Yes, we offer a free package that includes services like ATS resume scanning, resume optimization, and a resume review. You can get a taste of our services before deciding to upgrade to our premium packages.",
  },
  {
    question: "How secure is my data on CareerBooster?",
    answer:
      "We take data security seriously. Your personal and professional information is protected with the highest level of encryption and security protocols. We do not share your data with third parties.",
  },
  {
    question: "What do the premium packages include?",
    answer:
      "Our premium packages offer additional benefits, such as unlimited resume tailoring, cover letter customization, personalized emails to recruiters, and more. Please refer to our pricing section for a detailed breakdown of each package's features.",
  },
  {
    question: "How often can I use CareerBooster's services?",
    answer:
      "The frequency of service usage depends on your chosen package. Free users have access to limited credits, while premium users can enjoy unlimited access to our tools and services.",
  },
  {
    question: "Is CareerBooster suitable for international job seekers?",
    answer:
      "Yes, CareerBooster is designed to assist job seekers globally. Our tools are adaptable to various job markets and industries, making them useful for international job searches.",
  },
  {
    question:
      "Do I need any special software or technical skills to use CareerBooster?",
    answer:
      "No, CareerBooster is designed to be user-friendly and accessible to individuals with basic computer skills. You don't need any specialized software or technical expertise to use our platform.",
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
    <>
      <div className="col-md-8 mx-auto">
        <div
          className="accordion accordion-flush d-flex flex-column gap-6  "
          id="faqAccordion"
        >
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button text-gray-50"
                onClick={toggleFAQ}
                type="button"
                //   data-bs-toggle="collapse"
                //   data-bs-target="#faq-collapseOne"
                //   aria-expanded="false"
                //   aria-controls="faq-collapseOne"
              >
                {!isOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 6v12m6-6H6"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19.5 12h-15"
                    />
                  </svg>
                )}

                {props.question}
              </button>
            </h2>
            {isOpen && (
              <div
                id="faq-collapseOne"
                className="accordion-collapse"
                // data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body ">{props.answer}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function FAQList() {
  return (
    <section className="py-10 py-lg-15">
      <div className="container">
        <div className="row justify-center mb-18">
          <div className="col-lg-10">
            <div className="text-center">
              <h1
                className="mb-0 theme-text-2 md:text-[48px] text-[24px]"
                data-aos="fade-up-sm"
                data-aos-delay="50"
              >
                Questions About CareerBooster.AI?
                <br className="d-none d-md-block" />
                We have Answers!
              </h1>
            </div>
          </div>
        </div>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <FAQItem
              isOpen={index === 0}
              key={index}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQList;
