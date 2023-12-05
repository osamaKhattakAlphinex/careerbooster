import { searchIcon } from "@/helpers/iconsProvider";
import SingleRecentResumeCard from "./SingleRecentResumeCard";
import { useSelector } from "react-redux";
const RecentResumeCard = ({
  source = "",
  componentRef,
}: {
  source?: string;
  componentRef?: any;
}) => {
  // redux
  const userData = useSelector((state: any) => state.userData);
  const { resumes } = userData;
  return (
    <>
      <div className="text-white bg-[#17151B] rounded-[20px]  mb-7 px-4 md:px-[24px] py-[35px] my-5 ">
        <div className="flex justify-between items-center  ">
          <h1 className="uppercase font-semibold lg:text-[14px] text-[11px]">
            Your Resumes
          </h1>
          <div className="relative lg:w-[213px] w-[120px]">
            <input
              className="w-full pl-4 lg:h-[38px] lg:py-[8px] py-[6px] placeholder:text-[#5B5B5B] rounded-full border border-[#312E37] placeholder-gray-400 text-white lg:text-[14px] text-[10px] focus:outline-none focus:border-zinc-600 bg-transparent"
              type="text"
              placeholder="Search here"
            />
            <div className="absolute inset-y-0 right-3   items-center lg:flex hidden">
              {searchIcon}
            </div>
          </div>
        </div>
        {!resumes && <p>Loading Resumes...</p>}
        {/* <div className="flex flex-wrap lg:flex-row flex-col  gap-4"> */}
        <div className="flex flex-wrap  gap-2 ">
          {resumes &&
            resumes.map((resume: any) => (
              <div
                key={resume.id}
                className="xs:w-[100%] sm:w-[100%] md:w-[48%] lg:w-[32%]   "
              >
                <SingleRecentResumeCard
                  key={resume.id}
                  resume={resume}
                  source={source}
                  componentRef={componentRef}
                />
              </div>
            ))}
        </div>
      </div>
      {/* <GenerateResume /> */}
    </>
  );
};

export default RecentResumeCard;
