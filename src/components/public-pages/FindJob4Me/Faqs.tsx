import { Montserrat } from "next/font/google";
import React from "react";
const montserrat_r = Montserrat({
  weight: "400",
  subsets: ["latin"],
});
function Faqs() {
  const faqs = [
    {
      question: "What Is CareerBooster's Career JumpStart Service?",
      answer:
        "The service was created to offer busy professionals a solution to job searching on their own. We assign a dedicated Virtual Job Search assistant who will be responsible for managing the time-consuming art of job searching. Our professional Virtual Job Search Assistants will be responsible for searching for jobs on your behalf, applying to the jobs you approve, and networking with key decision-makers to land you interviews.",
    },
    {
      question: " How does the virtual assistant work?",
      answer:
        "We will assign a dedicated virtual assistant (VA) to work closely with you throughout your job search. The VA will manage your LinkedIn profile, adding relevant connections with decision-makers and headhunters in your desired industry, which can lead to uncovering unannounced and confidential opportunities. The VA will also conduct daily searches on LinkedIn and various job boards to identify relevant job openings. When they find a job that matches your requirements, they will share it with you. Upon your approval, the VA will apply on your behalf and submit the application. This process saves you time and ensures consistent efforts in your job search, leading to potential opportunities within 30-60 days.",
    },
    {
      question: "How do I communicate with my virtual assistant?",
      answer:
        "You can communicate with your virtual assistant via email, phone calls, or scheduled virtual meetings. We ensure that communication is clear and efficient to keep your job search on track.",
    },
    {
      question: "How much does the Career JumpStart service cost?",
      answer:
        "The service costs $4,500, with $3,000 as the placement fee and $1,500 invested in career tools and Virtual Assistant. The placement fee is only charged after you secure your desired job and receive your first paycheck.",
    },
    {
      question:
        "How is the $1,500 investment in career tools and resources utilized?",
      answer:
        "The $1,500 investment covers essential tools and resources such as executive resume writing, LinkedIn profile optimization, and a dedicated virtual assistant to manage your job applications and networking efforts.",
    },
    {
      question: " What if I already have a resume and LinkedIn profile?",
      answer:
        " Even if you have an existing resume and LinkedIn profile, we will enhance and optimize them to better align with current industry standards and highlight your strengths more effectively. We do this to increase your chances of success by boosting your ranking in recruiters' systems and the LinkedIn algorithm with keyword optimization techniques.  ",
    },
    {
      question: "Can I Hire A Recruiter To Find Me A Job?",
      answer:
        " A recruiter’s main job is to help hiring companies fill open positions, not find jobs for individuals. Recruiters do not receive compensation from job seekers. They receive compensation from hiring companies. Therefore, you cannot hire a recruiter to find you a job.",
    },
    {
      question: "What industries does CareerBooster specialize in?",
      answer:
        "Our expertise includes, but is not limited to, technology, finance, healthcare, manufacturing, real estate, legal, marketing, education, non-profit, energy, retail, consumer goods, telecommunications, hospitality, automotive, pharmaceuticals, biotechnology, insurance, transportation and logistics, construction, entertainment and media, food and beverage, government, and public administration. We connect you with executive headhunters and decision makers across these sectors to find the best opportunities that align with your specific skill set and experience.",
    },
    {
      question:
        "  Do you offer any guarantees with the Career JumpStart service?",
      answer:
        " While we cannot guarantee a job offer, our success-based fee structure ensures that you only pay our placement fee after securing your desired job. This reflects our commitment to providing effective and results-driven services.",
    },
  ];
  return (
    <div className="faqs flex flex-col md:w-[80%] xs:w-[95%] md:px-10 xs:px-4 mx-auto md:mt-20">
      <h1
        className={`${montserrat_r.className} md:text-[40px] xs:text-[28px] !font-bold text-center my-10`}
      >
        Frequently Asked Questions
      </h1>
      {faqs.map((faq: { question: string; answer: string }) => {
        return (
          <>
            <div className="flex flex-col  xs:text-center md:text-left">
              <h1
                className={`${montserrat_r.className} !font-bold md:text-[34px] xs:text-[24px] mb-8`}
              >
                Q: {faq.question}
              </h1>
              <p
                className={`${montserrat_r.className} !font-bold md:text-[23px] xs:text-[16px] mb-12`}
              >
                A: {faq.answer}
              </p>
            </div>
          </>
        );
      })}
    </div>
  );
}

export default Faqs;
