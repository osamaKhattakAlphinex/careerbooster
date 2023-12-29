
import Image from "next/image";
import Svg1 from "@/../public/icon/headline-icon.svg";
import iconOfPackageBadge from "@/../public/icon/crown.svg";

import buttonIconSrc from "@/../public/icon/u_bolt-alt.svg";

import Link from "next/link";
interface Props {
  setJobDesc: React.Dispatch<React.SetStateAction<string>>;
}
const JDGenerator = ({ setJobDesc }: Props) => {
  // local States

  return (
    <>
      <Link
        href="/linkedin-generator/job-description"
        className="no-underline"
      >
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
            <div className=" flex items-center xs:justify-between sm:justify-between gap-4 md:justify-start flex-row ">
              <h1 className="text-[16px] dark:text-gray-100 text-gray-950 font-bold">
                Job Description Generator
              </h1>
              <span
                className={`text-black rounded-full h-8 md:ml-3 flex justify-center items-center px-[16px] py-[6px]  bg-[#FEB602] text-[12px] uppercase font-bold `}
              >
                {iconOfPackageBadge ? (
                  <Image
                    src={iconOfPackageBadge}
                    alt="bold icon"
                    height={18}
                    width={18}
                    className="mr-2"
                  />
                ) : null}
                Premium
              </span>
            </div>

            <p className="text-[14px] text-[#959595] pr-5">
              Get job descriptions with respect to each job
            </p>
          </div>
          <div

            className={` bg-gradient-to-r from-[#B324D7] to-[#615DFF] flex flex-row justify-center items-center gap-2 rounded-full px-[32px] py-[12px] md:ml-auto`}

          // className={` bg-[#FEB602] flex flex-row justify-center items-center gap-2 rounded-full px-[32px] py-[12px] mx-2 lg:ml-auto`}
          >
            <span className={`text-white text-[15px] font-semibold`}>

              <div className="flex">
                <Image
                  src={buttonIconSrc}
                  alt="bold icon"
                  height={18}
                  width={18}
                />
                <span

                  className={`text-white ml-3 text-[15px] font-semibold cursor-pointer no-underline`}
                >
                  Generate Description
                </span>
              </div>

            </span>
          </div>
        </div>
      </Link>
    </>
  );
};

export default JDGenerator;
