import SubHeadlineGenerator from "@/components/new-dashboard/dashboard/linkedin-generator-old/SubHeadlineGenerator";
import { leftArrowIcon } from "@/helpers/iconsProvider";
import Link from "next/link";

const HeadlineGenerator = () => {
  return (
    <div className="w-full sm:w-full z-1000 ">
      <div className="ml-0 lg:ml-[244px] px-[15px] mb-[72px]  ">
        <Link
          href="/linkedin-generator"
          className="ml-2 my-4 no-underline text-[#B324D7] flex flex-row gap-2 items-center hover:text-[#E6F85E] hover:opacity-80 transition-all"
        >
          {leftArrowIcon}
          Back
        </Link>
        <SubHeadlineGenerator/>
      </div>
    </div>
  );
};

export default HeadlineGenerator;
