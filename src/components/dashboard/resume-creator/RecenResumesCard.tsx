import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

const RecentResumeCard = () => {
  const userData = useSelector((state: any) => state.userData);
  const { resumes } = userData;

  const onDelete = (id: any) => {};

  const onView = (id: any) => {};

  // console.clear();
  // console.log(resumes);

  return (
    <div className="m-10 w-[95%]  p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
      <div className="w-full card">
        <div className="space-y-4 md:space-y-6">
          <h2 className="text-2xl font-semibold  ">Recent Resumes</h2>
          <div className="flex">
            <RecentResumeCard />
            <RecentResumeCard />
            <RecentResumeCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentResumeCard;
