import SubAboutGenerator from "@/components/new-dashboard/dashboard/linkedin-generator-old/SubAboutGenerator";
import { leftArrowIcon } from "@/helpers/iconsProvider";
import Link from "next/link";

const AboutGenerator = () => {
  return (
    <div className="w-full sm:w-full z-1000 ">
      <div className="ml-0 lg:ml-[234px] px-[15px] mb-[72px]  ">
        <Link
          href="/linkedin-generator"
          className="ml-2 my-4 no-underline  flex flex-row gap-2 items-center dark:text-[#b324d7] dark:hover:text-[#e6f85e] text-gray-950 hover:text-gray-100 hover:opacity-80 transition-all"
        >
          {leftArrowIcon}
          Back
        </Link>
        <SubAboutGenerator />
      </div>
    </div>
  );
};

export default AboutGenerator;
