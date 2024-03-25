import SubHeadlineGenerator from "@/components/dashboard/linkedin-generator-old/SubHeadlineGenerator";
import { leftArrowIcon } from "@/helpers/iconsProvider";
import Link from "next/link";

const HeadlineGenerator = () => {
  return (
    <div className="w-full sm:w-full z-1000 ">
      <div className="ml-0 lg:ml-[234px] px-[15px] mb-[72px]  ">
        <Link
          href="/linkedin-generator"
          className="ml-2 my-4 no-underline dark:text-[#b324d7] dark:hover:text-[#e6f85e] text-gray-950 hover:text-[#b324d7] flex flex-row gap-2 items-center hover:opacity-80 transition-all"
        >
          {leftArrowIcon}
          Back
        </Link>
        <SubHeadlineGenerator />
      </div>
    </div>
  );
};

export default HeadlineGenerator;
