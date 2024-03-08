import Image from "next/image";
import Svg1 from "@/../public/icon/headline-icon.svg";
import iconOfPackageBadge from "@/../public/icon/crown.svg";

import buttonIconSrc from "@/../public/icon/u_bolt-alt.svg";

import Link from "next/link";
import { chevronRight } from "@/helpers/iconsProvider";

const JDGenerator = ({ creditLimits }: { creditLimits: any }) => {
  // local States

  return (
    <>
      <Link href="/linkedin-generator/job-description" className="no-underline">
        <div className="headline-generator dark:bg-[#222027] dark:text-gray-50 bg-[#ffffff94] text-gray-950 py-8 px-3 md:px-6 flex flex-col md:flex-row md:align-center gap-5 lg:justify-center items-center rounded-[10px] mb-[20px]">
          <div
            className={`icon hidden rounded-full bg-gradient-to-b from-[#255CE7] to-[#7FA0E0] md:flex justify-center items-center w-16 h-16`}
          >
            <Image
              alt="Svg1"
              src={Svg1}
              width={32}
              height={32}
              className="z-[10000px]"
            />
          </div>
          <div className="linkedintooltext flex flex-col lg:w-[24.0625rem] gap-2 ml-2">
            <div className=" flex items-center  xs:justify-between sm:justify-between gap-4 md:justify-start flex-row">
              <h1 className="text-[16px] dark:text-gray-100 text-gray-950 font-bold">
                Job Description Generator
              </h1>
              <div
                className={`text-gray-900 relative group rounded-full h-8 md:ml-3 flex justify-center items-center px-[16px] py-[6px]  bg-[#FEB602]   bg-opacity-50 xs:text-[10px] md:text-[12px]  font-bold `}
              >
                {creditLimits?.linkedin_individualWorkExperience}
                <div className="pl-1"> Credits</div>
                <div className="w-44 bg-gradient-to-r  from-[#B324D7] to-[#615DFF] font-medium xs:text-[10px] md:text-[12px] px-2 absolute xs:-left-32 md:left-10 xs:-top-12  md:-top-14  hidden group-hover:block md:rounded-bl-none xs:rounded-br-none md:rounded-br-xl text-gray-100  mb-6 shadow-xl rounded-xl py-2  transition-all">
                  {creditLimits?.linkedin_individualWorkExperience} credits will
                  be used for Job Description
                </div>
              </div>
            </div>

            <p className="text-[14px] text-[#959595] pr-5">
              Transform your existing work experience into an impactful
              narrative that highlights your key achievements.
            </p>
          </div>
          <div
            // onClick={() => handleGenerate()}
            className={`flex flex-row justify-center items-center gap-2 rounded-full px-[32px] py-[12px] md:ml-auto`}
          >
            <span className={`text-white text-[15px] font-semibold`}>
              {/* <div className="flex"> */}
              {/* <Image
                  src={buttonIconSrc}
                  alt="bold icon"
                  height={18}
                  width={18}
                /> */}
              <span
                className={`no-underline text-sm mt-[11px] flex items-center uppercase text-[#959595] dark:hover:text-gray-300 hover:text-gray-950 font-semibold`}
              >
                Launch <i className="ml-2">{chevronRight}</i>
              </span>
              {/* </div> */}
            </span>
          </div>
        </div>
      </Link>
    </>
  );
};

export default JDGenerator;
