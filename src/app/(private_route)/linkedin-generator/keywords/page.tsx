import SubHeadlineGenerator from "@/components/new-dashboard/dashboard/linkedin-generator-old/SubHeadlineGenerator";
import SubKeywordsGenerator from "@/components/new-dashboard/dashboard/linkedin-generator-old/SubKeywordsGenerator";
import { leftArrowIcon } from "@/helpers/iconsProvider";
import Link from "next/link";

const KeywordsGenerator = () => {
  return (
    <div className="w-full sm:w-full z-1000 ">
      <div className="ml-0 lg:ml-[234px] px-[15px] mb-[72px]  ">
        <Link
          href="/dashboard"
          className="ml-2 my-4 no-underline dark:text-[#b324d7] dark:hover:text-[#e6f85e] text-gray-950 hover:text-[#b324d7] flex flex-row gap-2 items-center h hover:opacity-80 transition-all"
        >
          {leftArrowIcon}
          Back
        </Link>
        <SubKeywordsGenerator />
      </div>
    </div>
  );
};

export default KeywordsGenerator;
