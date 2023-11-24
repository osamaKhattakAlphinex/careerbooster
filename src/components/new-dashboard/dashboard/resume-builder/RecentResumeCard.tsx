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
      <div className="text-white bg-[#17151B] rounded-2xl my-5 py-5">
        <div className="flex justify-between items-center px-5 py-[10px] ">
          <h1 className="uppercase font-semibold text-[13px]">Your Resumes</h1>
          <div className="relative w-[213px]">
            <input
              className="w-full pl-4 h-[38px] py-2 placeholder:text-[#5B5B5B] rounded-full border border-[#312E37] placeholder-gray-400 text-white focus:outline-none focus:border-zinc-600 bg-transparent"
              type="text"
              placeholder="Search here"
            />
            <div className="absolute inset-y-0 right-3  flex items-center">
              {searchIcon}
            </div>
          </div>
        </div>
        {!resumes && <p>Loading Resumes...</p>}
        <div className="flex mx-4 gap-6">
          {resumes &&
            resumes.map((resume: any) => (
              <SingleRecentResumeCard
                key={resume.id}
                resume={resume}
                source={source}
                componentRef={componentRef}
              />
            ))}
        </div>
      </div>
      {/* <GenerateResume /> */}
    </>
  );
};

export default RecentResumeCard;
