import Image from "next/image";
import Svg1 from "@/../public/icon/headline-icon.svg";

interface LinkedinSingleToolProps {
  headline: string;
  description: string;
  buttonText: string;
  buttonTextColor: string;
  buttonIconSrc?: string;
  buttonBg: string;
  bgOfIcon: string;
  bgOfPackageBadge: string;
  textOfPackageBadge: string;
  iconOfPackageBadge?: string;
}

const LinkedinSingleTool: React.FC<LinkedinSingleToolProps> = ({
  headline,
  description,
  buttonText,
  buttonIconSrc,
  bgOfIcon,
  bgOfPackageBadge,
  textOfPackageBadge,
  iconOfPackageBadge,
  buttonBg,
  buttonTextColor,
}) => {
  return (
    <div className="headline-generator bg-[#222027] py-8 px-6 flex align-center gap-5 justify-center items-center rounded-[10px] mb-[20px]">
      <div
        className={`icon rounded-full  ${bgOfIcon}   flex justify-center items-center w-16 h-16`}
      >
        <Image
          alt="Svg1"
          src={Svg1}
          width={32}
          height={32}
          className="z-[10000px]"
        />
      </div>
      <div className="linkedintooltext flex flex-col w-[24.0625rem] gap-2 ml-2">
        <div className="flex flex-row gap-3">
          <h1 className="text-[16px] text-white font-bold">{headline}</h1>
          <span
            className={`rounded-full flex justify-center items-center px-[16px] py-[6px]  ${bgOfPackageBadge} text-[12px] uppercase font-bold `}
          >
            {iconOfPackageBadge ? (
              <Image
                src={`${iconOfPackageBadge}`}
                alt="bold icon"
                height={18}
                width={18}
                className="mr-2"
              />
            ) : null}

            {textOfPackageBadge}
          </span>
        </div>
        <p className="text-[14px] text-[#959595] pr-5">{description}</p>
      </div>
      <button
        type="submit"
        className={` ${buttonBg} flex flex-row justify-center items-center gap-2 rounded-full px-[32px] py-[12px] ml-auto`}
      >
        {buttonIconSrc ? (
          <Image src={buttonIconSrc} alt="bold icon" height={18} width={18} />
        ) : null}

        <span className={`${buttonTextColor} text-[15px] font-semibold`}>
          {buttonText}
        </span>
      </button>
    </div>
  );
};

export default LinkedinSingleTool;
