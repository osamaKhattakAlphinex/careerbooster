import { eyeIcon, trashIcon } from "@/helpers/iconsProvider";
import { getFormattedDate } from "@/helpers/getFormattedDateTime";
import { Resume, emptyResume, setResume } from "@/store/resumeSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUserData } from "@/store/userDataSlice";
import { useRouter } from "next/navigation";

const SingleRecentResumeCard = ({
  resume,
  source,
  setFinished,
}: {
  resume: Resume;
  source?: string;
  componentRef?: any;
  setFinished?: any;
  templateId?: number;
}) => {
  const userData = useSelector((state: any) => state.userData);
  const { email, resumes } = userData;
  const router = useRouter();
  const dispatch = useDispatch();
  const handleOnView = async () => {
    if (source != "") {
      router.replace("/resume-builder");
    }
    if (setFinished) {
      setFinished(true);
    }
    return dispatch(setResume(resume));
  };
  const handleOnDelete = () => {
    const c = confirm("Are you sure you want to delete this resume?");
    if (c) {
      // delete resume
      const updatedResumes = resumes.filter((r: Resume) => r.id !== resume.id);
      updateUser(updatedResumes);
      dispatch(emptyResume());
    }
  };
  const updateUser = (updatedResumes: any) => {
    if (email) {
      return axios
        .post("/api/users/updateUserResumes", {
          email,
          resumes: updatedResumes,
        })
        .then(async (res: any) => {
          if (res.data.success) {
            const res = await fetch(`/api/users/getOneByEmail?email=${email}`);
            const response = await res.json();
            dispatch(setUserData(response.result));
          }
        });
    }
  };

  return (
    <div className="flex flex-col lg:w-[100%]   dark:bg-[#222027] dark:text-gray-50 bg-[#ffffff94] text-gray-950 rounded-xl mt-[20px] py-[20px] px-[14px] ">
      <div className="">
        <div className="mx-3 border-gray-600 leading-6">
          <h2 className="lg:text-[15px] text-[13px]  capitalize dark:text-gray-100 text-gray-950 font-medium   w-full truncate">
            {resume?.state?.jobPosition}
          </h2>
          <h4 className="uppercase text-[#959595] font-medium  lg:text-[12px] text-[10px] pt-[8px] pb-[12px]">
            Created on: {getFormattedDate(resume?.dateTime)}
          </h4>
        </div>
      </div>
      <div className="flex gap-3">
        <button
          onClick={handleOnView}
          className="flex px-2 text-[16px] dark:hover:border-[#5f5f5f] dark:hover:bg-gray-700 dark:hover:text-white justify-center text-neutral-400 items-center rounded-full h-[36px] dark:bg-[#18181b] dark:border-2 border-[1px] dark:border-[#27272a] bg-transparent border-[#22c55e]"
        >
          {eyeIcon}
          <span className="text-[13px] mx-2 ">View</span>
        </button>
        <button
          type="button"
          onClick={handleOnDelete}
          className="flex px-2 dark:hover:bg-gray-700 dark:hover:border-[#5f5f5f] dark:hover:text-white text-neutral-400  justify-center items-center rounded-full h-[36px] dark:bg-[#18181b] dark:border-2 border-[1px] dark:border-[#27272a] bg-transparent border-[#22c55e]"
        >
          {trashIcon} <span className="text-[13px] mx-2 ">Delete</span>
        </button>
      </div>
    </div>
  );
};
export default SingleRecentResumeCard;
