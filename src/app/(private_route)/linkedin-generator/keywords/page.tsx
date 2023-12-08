import SubHeadlineGenerator from "@/components/new-dashboard/dashboard/linkedin-generator-old/SubHeadlineGenerator";
import SubKeywordsGenerator from "@/components/new-dashboard/dashboard/linkedin-generator-old/SubKeywordsGenerator";
import { leftArrowIcon } from "@/helpers/iconsProvider";
import Link from "next/link";

const KeywordsGenerator = () => {
  return (
    <div className="w-full sm:w-full z-1000 ">
      <div className="ml-0 lg:ml-[244px] px-[15px] mb-[72px]  ">
        <Link
          href="/dashboard"
          className="ml-2 my-4 no-underline text-[#B324D7] flex flex-row gap-2 items-center hover:text-[#E6F85E] hover:opacity-80 transition-all"
        >
          {leftArrowIcon}
          Back
        </Link>
        <SubKeywordsGenerator/>
      </div>
    </div>
  );
};

export default KeywordsGenerator;
