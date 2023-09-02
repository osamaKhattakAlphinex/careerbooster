import { useSelector } from "react-redux";
import SingleRecentResumeCard from "./SingleRecentResumeCard";
import { Resume } from "@/store/resumeSlice";

const RecentResumeCard = () => {
  const userData = useSelector((state: any) => state.userData);
  const { resumes } = userData;

  return (
    <div className="m-10 w-[95%]  p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
      <div className="w-full card">
        <div className="space-y-4 md:space-y-6">
          <h2 className="text-2xl font-semibold  ">Recent Resumes</h2>
          <div className="flex gap-4">
            {resumes &&
              resumes.map((resume: Resume) => (
                <SingleRecentResumeCard key={resume.id} resume={resume} />
              ))}
            {resumes && resumes.length === 0 && <p>No Recent Resumes found</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentResumeCard;
