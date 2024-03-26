import Image from "next/image";
import Svg1 from "@/../public/icon/headline-icon.svg";
import buttonIconSrc from "@/../public/icon/u_bolt-alt.svg";

import Link from "next/link";
import { chevronRight } from "@/helpers/iconsProvider";

const AboutGenerator = ({ creditLimits }: { creditLimits: any }) => {
  return (
    <>
      <Link href="/linkedin-optimizer/about" className="no-underline">
        <div className="headline-generator dark:bg-[#222027] dark:text-gray-50 bg-[#ffffff94] text-gray-950 py-2 md:py-8 px-1 lg:px-6 flex flex-col md:flex-row md:align-center xs:gap-2 md:gap-5 justify-center items-center rounded-[10px] xs:mb-[8px] md:mb-[20px]">
          <div
            className={`icon hidden rounded-full bg-gradient-to-b from-[#26A5C1] to-[#84E1E7] md:flex justify-center items-center w-16 h-16`}
          >
            <Image
              alt="Svg1"
              src={Svg1}
              width={32}
              height={32}
              className="z-[10000px]"
            />
          </div>
          <div className="linkedintooltext flex flex-col lg:w-[24.0625rem] gap-2 p-4">
            <div className=" flex items-center xs:justify-between sm:justify-between gap-4 md:justify-start flex-row">
              <h1 className="text-[16px] dark:text-gray-100 text-gray-950 font-bold">
                About Generator
              </h1>
              <div
                className={`text-gray-900 group relative rounded-full xs:h-5 md:h-8 md:ml-3 flex justify-center items-center xs:px-[6px] md:px-[16px] py-[6px]  bg-[#FEB602] bg-opacity-50 xs:text-[10px] md:text-[12px]  font-bold `}
              >
                {creditLimits?.linkedin_about_generation} Credits
                <div className="w-44 bg-gradient-to-r  from-[#B324D7] to-[#615DFF] font-medium xs:text-[10px] md:text-[12px] px-2 absolute xs:-left-32 md:left-10 xs:-top-12  md:-top-14  hidden group-hover:block md:rounded-bl-none xs:rounded-br-none md:rounded-br-xl text-gray-100  mb-6 shadow-xl rounded-xl py-2  transition-all">
                  {creditLimits?.linkedin_about_generation} credits will be used
                  for About Generation
                </div>
              </div>
            </div>

            <p className="text-[14px] text-[#959595] pr-5">
              Transform your career journey into a compelling story that
              captures recruiters{"'"} attention and enhances your LinkedIn
              profile{"'"}s visibility.
            </p>
          </div>

          <div
            // onClick={() => handleGenerate()}
            className={`flex flex-row justify-center items-center gap-2 rounded-full px-[32px] md:py-[12px] md:ml-auto`}
          >
            <span className={`text-white text-[15px] font-semibold`}>
              <span
                className={`no-underline text-sm md:mt-[11px] flex items-center uppercase text-[#959595] dark:hover:text-gray-300 hover:text-gray-950 font-semibold`}
              >
                Launch <i className="ml-2">{chevronRight}</i>
              </span>
            </span>
          </div>
        </div>
      </Link>
    </>
  );
};

export default AboutGenerator;
