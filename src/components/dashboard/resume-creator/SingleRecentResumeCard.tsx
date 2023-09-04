import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import { Resume, setResume } from "@/store/resumeSlice";
import { getFormattedDate } from "@/helpers/getFormattedDateTime";
import { useDispatch } from "react-redux";

const SingleRecentResumeCard = ({ resume }: { resume: Resume }) => {
  const dispatch = useDispatch();

  const handleOnView = () => {
    dispatch(setResume(resume));
  };
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow p-2 sm:p-4">
      <h2 className=" text-lg  ">{resume?.state?.jobPosition}</h2>
      <h2 className="text-sm  text-gray-600">{resume?.jobTitle}</h2>
      <p className="text-xs mb-3 text-gray-600">
        Generated on {getFormattedDate(resume?.dateTime)}
      </p>
      <div className="flex flex-row gap-2">
        <button
          type="button"
          onClick={handleOnView}
          className="bg-white border hover:bg-gray-100 text-gray-700 text-xs  px-3 rounded-md shadow-md transition duration-300 ease-in-out flex flex-row gap-2 justify-center items-center py-1"
        >
          <FontAwesomeIcon icon={faEye} />
          View
        </button>
        <button
          type="button"
          disabled={true}
          className="bg-red-600 border hover:bg-red-400 text-white text-xs px-3 rounded-md shadow-md transition duration-300 ease-in-out flex flex-row gap-2 justify-center items-center py-1"
        >
          <FontAwesomeIcon icon={faTrash} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default SingleRecentResumeCard;
