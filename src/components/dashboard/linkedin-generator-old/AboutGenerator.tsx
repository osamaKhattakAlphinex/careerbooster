import Image from "next/image";
import Svg1 from "@/../public/icon/headline-icon.svg";
import Link from "next/link";
import { chevronRight } from "@/helpers/iconsProvider";

const AboutGenerator = ({ creditLimits }: { creditLimits: any }) => {
  return (
    <>
      <Link
        href="/linkedin-optimizer/about"
        className="block my-4 no-underline"
      >
        <div className=" dark:bg-[#222027] md:justify-between dark:text-gray-50 bg-[#ffffff94] text-gray-950 p-5 sm:p-8 flex flex-col md:flex-row md:align-center xs:gap-3 justify-center items-center rounded-xl">
          <div className="hidden aspect-square rounded-full bg-gradient-to-b from-[#255CE7] to-[#7FA0E0] md:flex justify-center items-center w-14 h-14">
            <Image alt="Svg1" src={Svg1} width={24} height={24} />
          </div>
          <div className="flex flex-col w-full gap-2 p-2 md:w-10/12">
            <div className="flex flex-row items-center gap-4 xs:justify-between sm:justify-between md:justify-start">
              <h1 className="text-sm font-semibold md:text-base dark:text-gray-100 text-gray-950">
                {" "}
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

            <p className="text-xs md:text-sm text-[#959595]">
              Transform your career journey into a compelling story that
              captures recruiters{"'"} attention and enhances your LinkedIn
              profile{"'"}s visibility.
            </p>
          </div>

          <span className="no-underline text-xs md:text-sm  flex items-center uppercase text-[#959595] dark:hover:text-gray-300 hover:text-gray-950 font-semibold">
            Launch <i className="ml-2">{chevronRight}</i>
          </span>
        </div>
      </Link>
    </>
  );
};

export default AboutGenerator;
