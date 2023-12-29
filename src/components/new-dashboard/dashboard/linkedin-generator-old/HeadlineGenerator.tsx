
import Image from "next/image";
import Svg1 from "@/../public/icon/headline-icon.svg";
import buttonIconSrc from "@/../public/icon/u_bolt-alt.svg";

import Link from "next/link";
interface Props {
  setHeadline: React.Dispatch<React.SetStateAction<string>>;
}
const HeadlineGenerator = ({ setHeadline }: Props) => {
 
  return (
    <>
      <Link
        className="no-underline"
        href="/linkedin-generator/headline"

      >
        <div className="headline-generator dark:bg-[#222027] dark:text-gray-50 bg-[#ffffff94] text-gray-950 py-8 px-3 lg:px-6 flex flex-col md:flex-row md:align-center gap-5 justify-center items-center rounded-[10px] mb-[20px]">
          <div
            className={`icon  hidden rounded-full  bg-gradient-to-b from-[#5D26C1] to-[#A17FE0] md:flex justify-center items-center w-16 h-16`}
          >
            <Image
              alt="Svg1"
              src={Svg1}
              width={32}
              height={32}
              className="z-[10000px] "
            />
          </div>
          <div className="linkedintooltext flex  flex-col lg:w-[24.0625rem] gap-2 ml-2">
            <div className=" flex items-center xs:justify-between sm:justify-between gap-4 md:justify-start flex-row">
              <h1 className="text-[16px] dark:text-gray-100 text-gray-950 font-bold">
                Headline Generator
              </h1>
              <span
                className={`text-black rounded-full flex justify-center items-center px-[16px] py-[6px] md:mx-2  bg-[#02FF19] text-[12px] uppercase font-bold `}
              >
                {/* {iconOfPackageBadge ? (
                <Image
                  src={`${iconOfPackageBadge}`}
                  alt="bold icon"
                  height={18}
                  width={18}
                  className="mr-2"
                />
              ) : null} */}
                free
              </span>
            </div>
            {/* <LimitCard
            title="Available"
            limit={userData?.userPackageData?.limit?.headline_generation}
            used={userData?.userPackageUsed?.headline_generation}
            setPercentageCalculated={setPercentageCalculated}
            availablePercentage={availablePercentage}
            setAvailablePercentage={setAvailablePercentage}
          /> */}
            <p className="text-[14px] text-[#959595] pr-5">
              Generate headline for your linkedin in one click
            </p>
          </div>

          <div
            // onClick={() => handleGenerate()}
            className={` bg-gradient-to-r  from-[#B324D7] to-[#615DFF] flex flex-row justify-center items-center gap-2 rounded-full px-[32px] py-[12px] md:ml-auto`}
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
                    Generate Headline
                  </span>
                </div>
              
            </span>
          </div>
        </div>
      </Link>

    </>
  );
};

export default HeadlineGenerator;
