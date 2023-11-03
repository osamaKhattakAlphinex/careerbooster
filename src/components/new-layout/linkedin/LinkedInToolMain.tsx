"use client";
import manyImage from "@/../public/many-image.png";
import { ArrowDownIcon, uploadIcon } from "@/helpers/iconsProvider";
import Image from "next/image";
import FAQList from "../Homepage/Faqs";
import Reviews from "../Homepage/Reviews";

const LinkedInToolMain = () => {
  return (
    <div className="w-full">
      <h5 className="text-center w-full font-normal text-2xl">
        Keyword-Optimized, Captivating & Under 30 Seconds!
      </h5>
      <h3 className="text-center px-10 text-4xl font-bold leading-normal mt-3">
        Free{" "}
        <span className="text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r to-violet-500 from-fuchsia-500">
          AI LinkedIn
        </span>{" "}
        Summary Generator Achieve Top Rankings in Recruiter Searches and Secure
        More Interviews!
      </h3>
      <h5 className="text-center leading-7 font-normal text-md">
        Simply Upload your Resume or LinkedIn Profile in PDF. Receive results
        perfectly tailored for you — or we'll compensate you $1000 if we waste
        your time with irrelevant outcomes.
      </h5>
      <div className="flex justify-center mt-11  ">
        <label className="h-16 py-3  px-6 rounded-xl bg-gradient-to-r to-violet-500 from-fuchsia-500">
          <input
            type="file"
            className="hidden"
            // disabled={fileUploading}
            // onChange={(e) => {
            //   if (e.target.files) {
            //     setFile(e.target.files[0]);
            //   }
            // }}
          />

          <div className="flex gap-2">
            <div>{uploadIcon}</div>
            <div className="text-center">
              <p className="m-0 font-semibold text-md [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">
                Upload Resume or LinkedIn in PDF
              </p>
              <p className="text-xs">No credit card required</p>
            </div>
          </div>
        </label>
      </div>
      <div className="flex justify-center  mt-20 mb-20">
        <span className="text-center mt-4 py-2 text-indigo-500 border-indigo-500  rounded-t-2xl rounded-b-2xl border-1">
          {ArrowDownIcon}
        </span>
      </div>
      <h3 className="text-center px-10 text-4xl font-semibold leading-normal mt-3">
        Why Upload a Resume or LinkedIn Profile?
      </h3>
      <h5 className="text-center leading-7 font-normal text-md">
        Our AI scans your existing resume or LinkedIn profile to comprehend your
        career journey, previous work experiences, background, and targeted job
        position. This allows it to craft a tailormade, keyword-optimized
        summary and LinkedIn headline perfectly suited for you.
      </h5>
      <div className="flex mt-20">
        <div className="w-6/12">
          <p className="text-3xl font-semibold">
            I don't have a resume. How can I upload my LinkedIn profile in PDF
            format?
          </p>
          <div className="flex">
            <div className="w-[10%] pt-10 h-full flex flex-col items-center justify-center gap-1">
              {/* dot */}
              <div className="w-6 h-6 rounded-full bg-gradient-to-t to-fuchsia-500 from-violet-500 border-4 border-gray-800"></div>
              {/* line */}
              <div className="h-6 w-[2px] bg-fuchsia-500"></div>
              {/* dot */}
              <div className="w-6 h-6 rounded-full bg-gradient-to-t to-fuchsia-500 from-violet-500 border-4 border-gray-800"></div>
              {/* line */}
              <div className="h-10 w-[2px] bg-fuchsia-500"></div>
              {/* dot */}
              <div className="w-6 h-6 rounded-full bg-gradient-to-t to-fuchsia-500 from-violet-500 border-4 border-gray-800"></div>
            </div>
            <div className="w-[90%] px-3 h-full pt-9">
              <ul className="text-lg text-gray-200 flex flex-col gap-3">
                <li className="mb-3">
                  Click here to navigate to your LinkedIn profile.
                </li>
                <li className="mb-3">
                  On your profile page, click on the ellipsis (three dots) and
                  select 'Save to PDF.'
                </li>
                <li>
                  This will allow you to download and save your LinkedIn profile
                  as a PDF document.
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="w-6/12">
          <div className="w-full flex justify-center items-center h-full p-2 rounded-xl border-1 bg-gradient-to-r from-fuchsia-500 to-violet-500  border-gray-800 ">
            Video
          </div>
        </div>
      </div>
      <div className="w-full h-[500px] flex rounded-2xl mt-14 bg-gradient-to-r from-fuchsia-500 to-violet-500  border-gray-800">
        <div className="w-6/12 mx-5 my-8">
          <h3 className="text-4xl text-normal font-bold  mr-4 mt-3">
            Challenge us, prove us wrong, and earn a $1000 reward!
          </h3>
          <p className="text-lg font-normal mt-12 tracking-normal ">
            We take immense pride in the accuracy and relevance of our AI tool,
            which consistently delivers results that our users adore. Yet, if
            you pinpoint a discrepancy and show that our tool produced content
            that's either generic or entirely unrelated to your profile, we
            recognize the misstep and will reward you with $1000 for your time.
            Our goal isn't merely to meet expectations but to surpass them,
            guaranteeing your complete satisfaction.
          </p>
        </div>
        <div className="w-6/12 mx-5 my-8">
          <Image src={manyImage} alt="Not Found" />
        </div>
      </div>
      <div className="mt-20">
        <h3 className="text-center px-10 pb-1 text-4xl text-gray-100 font-semibold leading-normal mt-3">
          Game-Changer for LinkedIn Job Seekers!{" "}
        </h3>
        <p className="text-xl  font-normal text-center text-gray-300 px-5">
          Most professionals miss out on valuable opportunities due to
          non-optimized profiles, lacking the vital keywords and engaging
          content that recruiters actively seek.
        </p>
        <h3 className="text-center pt-1 px-10  text-3xl text-gray-100 font-semibold leading-normal mt-10 bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500">
          Why is keyword optimization crucial?{" "}
        </h3>
        <p className="text-xl  font-normal text-center text-gray-300 px-5">
          Recruiters often use LinkedIn's search engine to find potential
          candidates. If your profile isn't optimized with relevant keywords for
          your industry and role, you're likely to be left out of these
          searches, no matter how qualified you might be.
        </p>
        <h3 className="text-center pt-1 px-10  text-3xl text-gray-100 font-semibold leading-normal mt-10 bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500">
          Personalized to Perfection{" "}
        </h3>
        <p className="text-xl  font-normal text-center text-gray-300 px-5">
          CareerBooster.AI doesn't just sprinkle random keywords onto your
          profile. Our advanced AI technology dives deep into your resume or
          LinkedIn PDF to understand your career trajectory, aspirations, and
          strengths. This ensures that the generated content isn't just
          keyword-rich but also aligns perfectly with your professional
          narrative.
        </p>
        <h3 className="text-center pt-1 px-10  text-3xl text-gray-100 font-semibold leading-normal mt-10 bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500">
          Speedy and Effortless Transformation{" "}
        </h3>
        <p className="text-xl  font-normal text-center text-gray-300 px-5">
          We understand the value of time. Hence, our tool is designed to
          overhaul your LinkedIn summary and headline in under 30 seconds,
          offering you an instantaneous upgrade.
        </p>
        <h5 className="text-center w-full font-normal text-2xl">
          Keyword-Optimized, Captivating & Under 30 Seconds!
        </h5>
        <h3 className="text-center px-10 text-4xl font-bold leading-normal mt-10">
          Don't let your LinkedIn profile be just another face in the crowd. Use{" "}
          <span className="text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r to-violet-500 from-fuchsia-500">
            CareerBooster.AI
          </span>{" "}
          and ensure you stand out, get noticed, and advance in your career
          journey.
        </h3>
      </div>
      <FAQList />
      <Reviews />
    </div>
  );
};

export default LinkedInToolMain;
