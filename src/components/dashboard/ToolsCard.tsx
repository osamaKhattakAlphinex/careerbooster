"use client";
import {
  bagIcon,
  briefCaseIcon,
  brushIcon,
  chatIcon,
  checkBubbleIcon,
  documentTextIcon,
  emailIconBig,
  pencilIcon,
  resumeIcon,
  scanIcon,
  shockIcon,
  starsIcon,
  trendingArrowIcon,
} from "@/helpers/iconsProvider";
import Link from "next/link";

const ToolsCard = () => {
  return (
    <>
      {/* <div className="w-full  p-4  border border-gray-200 rounded-lg shadow sm:p-6   ">
    </div> */}
      <h5 className="mb-3 text-4xl font-bold md:text-4xl">
        {starsIcon}
        AI Tools
      </h5>
      <ul className="flex flex-row gap-4 mr-10  pl-0">
        <li className="w-1/3 ">
          <div className="h-[250px] min-h-full p-4 border border-gray-200 rounded-lg shadow">
            {shockIcon}
            <Link href="/resume-builder" className="no-underline">
              <h5 className="mb-2 mt-4 text-lg font-semibold tracking-tight  ">
                Generate New Resumes
              </h5>
            </Link>
            <p className="mb-4 text-xs  ">
              Create multiple AI-Powered resumes tailored for your targeted job
              positions.
            </p>
            <Link
              className=" bg-gray-800 text-xs text-white rounded-lg px-6 py-2 no-underline hover:bg-gray-950"
              href="/resume-builder"
            >
              Launch
            </Link>
          </div>
        </li>
        <li className="w-1/3 ">
          <div className="h-[250px] min-h-full p-4  border border-gray-200 rounded-lg shadow  ">
            {documentTextIcon}
            <Link href="/cover-letter-bot" className="no-underline">
              <h5 className="mb-2 mt-4 text-lg font-semibold tracking-tight  ">
                Generate Cover Letters
              </h5>
            </Link>
            <p className="mb-4 text-xs  ">
              Quickly create customized cover letters for each job application,
              significantly boosting your chances of landing interviews.
            </p>
            <Link
              className=" bg-gray-800 text-sm text-white rounded-lg px-6 py-2 no-underline hover:bg-gray-950"
              href="/cover-letter-bot"
            >
              Launch
            </Link>
          </div>
        </li>
        <li className="w-1/3 ">
          <div className="h-[250px] min-h-full p-4  border border-gray-200 rounded-lg shadow  ">
            {emailIconBig}
            <Link href="/email-bot" className="no-underline">
              <h5 className="mb-2 mt-4 text-lg font-semibold tracking-tight  ">
                Email Follow-up Sequence
              </h5>
            </Link>
            <p className="mb-4 text-xs  ">
              Easily craft personalized follow-up emails with our AI-generated
              sequence to impress hiring managers and boost your chances of
              being noticed.
            </p>
            <Link
              className=" bg-gray-800 text-sm text-white rounded-lg px-6 py-2 no-underline hover:bg-gray-950"
              href="/email-bot"
            >
              Launch
            </Link>
          </div>
        </li>

        {/* <li className="w-1/3">
          <div className="h-[250px] min-h-full p-4  border border-gray-200 rounded-lg shadow  ">
            {briefCaseIcon}
            <Link href="/linkedin-pdf-generator" className="no-underline">
              <h5 className="mb-2 mt-4 text-lg font-semibold tracking-tight  ">
                LinkedIn PDF Generator
              </h5>
            </Link>
            <p className="mb-4 text-xs  ">
              Generate PDF Report for your LinkedIn Profile based on your
              profile data
            </p>
            <Link
              className=" bg-gray-800 text-sm text-white rounded-lg px-6 py-2 no-underline hover:bg-gray-950"
              href="/linkedin-pdf-generator"
            >
              Launch
            </Link>
          </div>
        </li> */}
      </ul>

      <ul className="flex flex-row gap-4 mr-10 mt-8 pl-0">
        <li className="w-1/3 ">
          <div className="h-[250px] min-h-full p-4  border border-gray-200 rounded-lg shadow  ">
            {brushIcon}
            <Link
              href="/linkedin-optimization"
              className="no-underline"
              style={{ pointerEvents: "none" }}
            >
              <h5 className="mb-2 mt-4 text-lg font-semibold tracking-tight  ">
                Keyword Optimize Your LinkedIn
              </h5>
            </Link>
            <p className="mb-4 text-xs  ">
              : Optimize the About, Headline, job descriptions, and skills
              section of your LinkedIn profile with keywords to ensure it ranks
              high in recruiter searches.
            </p>
            <Link
              className=" bg-gray-800 text-sm text-white rounded-lg px-6 py-2 no-underline hover:bg-gray-950"
              href="/linkedin-optimization"
            >
              Launch
            </Link>
          </div>
        </li>
        <li className="w-1/3 ">
          <div className="h-[250px] min-h-full p-4  border border-gray-200 rounded-lg shadow  ">
            {trendingArrowIcon}
            <Link href="/consulting-bids-bot" className="no-underline">
              <h5 className="mb-2 mt-4 text-lg font-semibold tracking-tight  ">
                Consulting Bids
              </h5>
            </Link>
            <p className="mb-4 text-xs  ">
              Generate bids in seconds to secure your next consulting gig.
            </p>
            <Link
              className=" bg-gray-800 text-sm text-white rounded-lg px-6 py-2 no-underline hover:bg-gray-950"
              href="/consulting-bids-bot"
            >
              Launch
            </Link>
          </div>
        </li>
        <li className="w-1/3 ">
          <div className="h-[250px] min-h-full p-4 border border-gray-200 rounded-lg shadow">
            {bagIcon}
            <Link
              href="/chatAI"
              className="no-underline"
              style={{ pointerEvents: "none" }}
            >
              <h5 className="mb-2 mt-4 text-lg font-semibold tracking-tight">
                AI Job Finder
              </h5>
            </Link>
            <p className="w-full mb-4 text-xs">
              Our AI tool scans the entire web to discover the most relevant and
              recent opportunities matching your background, saving you from
              searching multiple job boards.
            </p>
            <Link
              className=" bg-gray-800 text-sm text-white rounded-lg px-6 py-2 no-underline hover:bg-gray-950"
              href="/chatAI"
              style={{ pointerEvents: "none" }}
            >
              Coming Soon
            </Link>
          </div>
        </li>
      </ul>
      <ul className="flex flex-row gap-4 mr-10 mt-8 pl-0">
        <li className="w-1/3 ">
          <div className="h-[250px] min-h-full p-4 border border-gray-200 rounded-lg shadow">
            {chatIcon}
            <Link
              href="/chatAI"
              className="no-underline"
              style={{ pointerEvents: "none" }}
            >
              <h5 className="mb-2 mt-4 text-lg font-semibold tracking-tight">
                Career Coach
              </h5>
            </Link>
            <p className="w-full mb-4 text-xs">
              This AI-powered Career Coach Chatbot is trained on your data and
              provides advice tailored to your professional experience. Make
              your next career move strategic and level up your skills with
              data-driven insights.
            </p>
            <Link
              className=" bg-gray-800 text-sm text-white rounded-lg px-6 py-2 no-underline hover:bg-gray-950"
              href="/chatAI"
              style={{ pointerEvents: "none" }}
            >
              Coming Soon
            </Link>
          </div>
        </li>

        <li className="w-1/3 ">
          <div className="h-[250px] min-h-full p-4  border border-gray-200 rounded-lg shadow  ">
            {resumeIcon}
            <Link
              href="/review-resume-bot"
              className="no-underline"
              style={{ pointerEvents: "none" }}
            >
              <h5 className="mb-2 mt-4 text-lg font-semibold tracking-tight  ">
                Get Your Resume Reviewed
              </h5>
            </Link>
            <p className="mb-4 text-xs  ">
              Receive valuable feedback on your resume to identify areas for
              improvement. Our AI tool analyzes your document and provides
              actionable suggestions to enhance its impact.
            </p>
            <Link
              className=" bg-gray-800 text-sm text-white rounded-lg px-6 py-2 no-underline hover:bg-gray-950"
              href="/review-resume-bot"
              style={{ pointerEvents: "none" }}
            >
              Coming Soon
            </Link>
          </div>
        </li>
        <li className="w-1/3 ">
          <div className="h-[250px] min-h-full p-4  border border-gray-200 rounded-lg shadow  ">
            {scanIcon}
            <Link
              href="/review-resume-bot"
              className="no-underline"
              style={{ pointerEvents: "none" }}
            >
              <h5 className="mb-2 mt-4 text-lg font-semibold tracking-tight  ">
                ATS Scan Your Resume
              </h5>
            </Link>
            <p className="mb-4 text-xs  ">
              Avoid the pitfalls of Applicant Tracking Systems (ATS) with our
              ATS scanning feature. Ensure your resume is ATS-friendly,
              increasing your chances of making it to the recruiter's desk.
            </p>
            <Link
              className=" bg-gray-800 text-sm text-white rounded-lg px-6 py-2 no-underline hover:bg-gray-950"
              href="/review-resume-bot"
              style={{ pointerEvents: "none" }}
            >
              Coming Soon
            </Link>
          </div>
        </li>
      </ul>
      <ul className="flex flex-row gap-4 mr-10 mt-8 pl-0">
        <li className="w-1/3 ">
          <div className="h-[250px] min-h-full p-4  border border-gray-200 rounded-lg shadow  ">
            {checkBubbleIcon}
            <Link
              href="/review-resume-bot"
              className="no-underline"
              style={{ pointerEvents: "none" }}
            >
              <h5 className="mb-2 mt-4 text-lg font-semibold tracking-tight  ">
                LinkedIn Posts Generator
              </h5>
            </Link>
            <p className="mb-4 text-xs  ">
              Our AI generates industry-specific posts for you to share on your
              profile, increasing engagement, expanding your network, and
              establishing you as a thought leader and industry expert.
            </p>
            <Link
              className=" bg-gray-800 text-sm  text-white rounded-lg px-6 py-2 no-underline hover:bg-gray-950"
              href=""
              aria-disabled="true"
              style={{ pointerEvents: "none" }}
            >
              Coming Soon
            </Link>
          </div>
        </li>
      </ul>
    </>
  );
};

export default ToolsCard;
