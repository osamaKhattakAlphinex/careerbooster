import {
  usecasesvg1,
  usecasesvg2,
  usecasesvg3,
  usecasesvg4,
  usecasesvg5,
  usecasesvg6,
  usecasesvg7,
  usecasesvg8,
} from "@/helpers/iconsProvider";
import ToolUsage from "./ToolUsage";
const useCaseDetails = [
  {
    title: "Write a Winning Executive Resume ",
    description:
      "With CareerBooster.AI, you can effortlessly craft a compelling executive resume that grabs the attention of recruiters and showcases your unique skills and achievements.",
    linkText: "Elevate Your Resume!",
    icon: usecasesvg1,
    link: "/use-cases",
  },
  {
    title: "Keyword Optimize Your LinkedIn ",
    description:
      "Ensure your LinkedIn profile ranks high in recruiter searches. Our AI system will optimize your profile with relevant keywords, making it more likely to be seen by potential employers.",
    linkText: "Boost Your LinkedIn Now!",
    icon: usecasesvg2,
    link: "/use-cases",
  },
  {
    title: "Tailor Cover Letter for Each Job",
    description:
      "Create customized cover letters for every job application in just a few minutes. Tailoring your cover letter to each specific position greatly increases your chances of landing interviews.",
    linkText: "Craft Your Winning Letter!",
    icon: usecasesvg3,
    link: "/use-cases",
  },
  {
    title: "Get Your Resume Reviewed",
    description:
      "Receive valuable feedback on your resume to identify areas for improvement. Our AI tool analyzes your document and provides actionable suggestions to enhance its impact.",
    linkText: "Unlock Your Full Potential!",
    icon: usecasesvg4,
    link: "/use-cases",
  },
  {
    title: "ATS Scan Your Resume",
    description:
      "Avoid the pitfalls of Applicant Tracking Systems (ATS) with our ATS scanning feature. Ensure your resume is ATS-friendly, increasing your chances of making it to the recruiter's desk.",
    linkText: "Beat the ATS",
    icon: usecasesvg5,
    link: "/use-cases",
  },
  {
    title: "Personalized Email for Each Job",
    description:
      "Craft personalized emails to recruiters quickly and easily. Our AI-generated emails help you make a memorable first impression and increase your chances of getting noticed.",
    linkText: "Stand Out Now!",
    icon: usecasesvg6,
    link: "/use-cases",
  },
  {
    title: "Tailor Resume for Each Job",
    description:
      "Ditch the one-size-fits-all approach. CareerBooster.AI lets you create customized resumes for each job opening, highlighting the skills and experiences most relevant to the position.",
    linkText: "Personalize Your Pitch!",
    icon: usecasesvg7,
    link: "/use-cases",
  },
  {
    title: "Make Your Resume ATS Optimized",
    description:
      "Our AI ensures that your resume is not only tailored for human readers but also optimized for ATS, so it passes through the initial screening and reaches recruiters.",
    linkText: "ATS-Proof Your Resume!",
    icon: usecasesvg8,
    link: "/use-cases",
  },
];
const UseCases = () => {
  return (
    <section className="bg-gray-100 dark:bg-gray-950 py-20 py-lg-30 ">
      <div className="xs:px-5 md:px-20 ">
        <div className="row justify-center mb-18">
          <div className="col-lg-9">
            <div className="text-center">
              <p className="dark:text-[#e6f85e] text-[#0000ff] text-opacity-[0.6] text-md ">
                CareerBooster.AI Use Cases
              </p>
              <h1 className="text-[#000] dark:text-[#fff] mb-0  md:text-[40px] text-[24px]">
                Leverage our AI-Powered Tools for your Professional Excellence
              </h1>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap">
          {useCaseDetails.map((item, index) => (
            <ToolUsage
              key={index}
              title={item.title}
              description={item.description}
              linkText={item.linkText}
              icon={item.icon}
              link={item.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
export default UseCases;
