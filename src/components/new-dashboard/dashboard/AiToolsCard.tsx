import { searchIcon } from "@/helpers/newIconsProviders";
import ResumeCard from "./ResumeCard";
import GenerateResume from "../generateResume/generateResume";
const AiToolsCard = ({}) => {
  return (
    <>
      <div className="text-white bg-[#17151B] rounded-2xl my-7 py-5">
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
   <div className="flex mx-4 gap-6">
   {[1,2,3].map((n: number) => (
    <ResumeCard key={n} />
    ))}
   </div>
  </div>
    <GenerateResume />
    </>
  );
};

export default AiToolsCard;
