import SubHeadlineGenerator from "@/components/new-dashboard/dashboard/linkedin-generator-old/SubHeadlineGenerator";
import { leftArrowIcon } from "@/helpers/iconsProvider";
import Link from "next/link";

const HeadlineGenerator = () => {
  return (
    <div className="w-full sm:w-full z-1000 ">
      <div className="ml-0 lg:ml-[234px] px-[15px] mb-[72px]  ">
        <Link
          href="/linkedin-generator"
          className="ml-2 my-4 no-underline back-btn-text flex flex-row gap-2 items-center hover:opacity-80 transition-all"
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
