import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import { Resume, setResume } from "@/store/resumeSlice";
import { getFormattedDate } from "@/helpers/getFormattedDateTime";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUserData } from "@/store/userDataSlice";
import { useRouter } from "next/navigation";

const SingleRecentResumeCard = ({
  resume,
  source,
}: {
  resume: Resume;
  source?: string;
}) => {
  const router = useRouter();

  // redux
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.userData);
  const { email, resumes } = userData;

  const handleOnView = () => {
    if (source != "") {
      router.replace("/resume-creator");
    }
    dispatch(setResume(resume));
  };

  const handleOnDelete = () => {
    // ask for confirmation
    const c = confirm("Are you sure you want to delete this resume?");
    if (c) {
      // delete resume
      const updatedResumes = resumes.filter((r: Resume) => r.id !== resume.id);
      updateUser(updatedResumes);
    }
  };

  const updateUser = (updatedResumes: any) => {
    if (email) {
      return axios
        .post("/api/users/updateUserResumes", {
          email,
          resumes: updatedResumes,
        })
        .then(async (res) => {
          if (res.status === 200) {
            // update user in redux
            const res = await fetch(`/api/users/getOneByEmail?email=${email}`);

            const { user } = await res.json();
            dispatch(setUserData(user));
          }
        });
    }
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
          className="bg-white border hover:bg-gray-100 text-gray-700 text-xs  px-3 rounded-md shadow-md transition duration-300 ease-in-out flex flex-row gap-2 justify-center items-center py-1">
          <FontAwesomeIcon icon={faEye} />
          View
        </button>
        <button
          type="button"
          onClick={handleOnDelete}
          className="bg-red-600 border hover:bg-red-400 text-white text-xs px-3 rounded-md shadow-md transition duration-300 ease-in-out flex flex-row gap-2 justify-center items-center py-1">
          <FontAwesomeIcon icon={faTrash} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default SingleRecentResumeCard;
