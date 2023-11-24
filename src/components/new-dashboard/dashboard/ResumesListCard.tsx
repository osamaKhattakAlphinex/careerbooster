import ResumeCard from "@/components/new-dashboard/dashboard/resume-builder/SingleRecentResumeCard";
import { searchIcon } from "@/helpers/iconsProvider";

const ResumesListCard = () => {
  return (
    <div className="text-white bg-gray-900 rounded-lg my-7">
      <div className="flex justify-between items-center px-5 py-5">
        <h1 className="uppercase text-md">Your Resumes</h1>
        <div className="relative w-48">
          <input
            className="w-full pl-10 py-2 rounded-full border border-zinc-600 placeholder-gray-400 text-white focus:outline-none focus:border-zinc-600 bg-transparent"
            type="text"
            placeholder="search..."
          />
          <div className="absolute inset-y-0 left-2  flex items-center">
            {searchIcon}
          </div>
        </div>
      </div>
      {[1, 2].map((n: number) => (
        <ResumeCard key={n} />
      ))}
    </div>
  );
};
export default ResumesListCard;
