import { trashIcon } from "@/helpers/iconsProvider";
import { getFormattedDate } from "@/helpers/getFormattedDateTime";
import { Resume, emptyResume, setResume } from "@/store/resumeSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUserData } from "@/store/userDataSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DeleteConfirmationModal from "@/components/common/ConfirmationModal";
import { showSuccessToast } from "@/helpers/toast";
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
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

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

  const handleOnDelete = async () => {
    setDeleting(true);
    setConfirmationModal(false);
    const updatedResumes = resumes.filter((r: Resume) => r.id !== resume.id);
    if (updatedResumes.length === 0) {
      setFinished(false);
    }
    updateUser(updatedResumes);
    dispatch(emptyResume());
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
            showSuccessToast("Resume deleted successfully");
            setDeleting(false);
            const res = await fetch(`/api/users/getOneByEmail?email=${email}`);
            const response = await res.json();
            dispatch(setUserData(response.result));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleOpenConfirmationModal = () => {
    setConfirmationModal(true);
  };

  return (
    <>
      {/* <ConfirmationModal
        id={"deletion-confirmation-modal-user-coupons"}
        title={"Deletion Modal"}
        message={"Are you sure you want to delete this record"}
        ref={confirmationModalRef}
        api="/api/coupons"
        refresh={() => {}}
      /> */}
      <div className="flex flex-col lg:w-[100%]   dark:bg-[#222027] dark:text-gray-50 bg-[#ffffff94] text-gray-950 rounded-xl md:mt-[20px] xs:mt-[10px] py-[20px] px-[10px] ">
        <div className="">
          <div className="mx-3 space-y-2 leading-6 border-gray-600">
            <h2 className="lg:text-[15px] text-[13px]  capitalize dark:text-gray-100 text-gray-950 font-medium   w-full truncate">
              {resume?.state?.resumeType === "resume-basic"
                ? resume?.name
                : resume?.state?.resumeType === "resume-job-title"
                ? resume?.state?.jobPosition
                : resume?.state?.jobDescription}
            </h2>
            <span
              title="Generated For"
              className="text-xs gap-2 text-[#959595] font-semibold flex flex-row justify-start items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M4 2a1.5 1.5 0 0 0-1.5 1.5v9A1.5 1.5 0 0 0 4 14h8a1.5 1.5 0 0 0 1.5-1.5V6.621a1.5 1.5 0 0 0-.44-1.06L9.94 2.439A1.5 1.5 0 0 0 8.878 2H4Zm1 5.75A.75.75 0 0 1 5.75 7h4.5a.75.75 0 0 1 0 1.5h-4.5A.75.75 0 0 1 5 7.75Zm0 3a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                {resume?.state?.resumeType === "resume-basic"
                  ? "Basic"
                  : resume?.state?.resumeType === "resume-job-title"
                  ? "Job Title"
                  : "Job Description"}
              </span>
            </span>
            <h4
              title="Created On"
              className="uppercase flex gap-2 flex-row justify-start items-center text-[#959595] font-medium  lg:text-[12px] text-[10px] pb-[12px]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path d="M5.75 7.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM5 10.25a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0ZM10.25 7.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM7.25 8.25a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0ZM8 9.5A.75.75 0 1 0 8 11a.75.75 0 0 0 0-1.5Z" />
                <path
                  fillRule="evenodd"
                  d="M4.75 1a.75.75 0 0 0-.75.75V3a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2V1.75a.75.75 0 0 0-1.5 0V3h-5V1.75A.75.75 0 0 0 4.75 1ZM3.5 7a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v4.5a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1V7Z"
                  clipRule="evenodd"
                />
              </svg>
              {getFormattedDate(resume?.dateTime)}
            </h4>
          </div>
        </div>
        <div className="flex justify-between gap-3 mx-3">
          <button
            onClick={handleOnView}
            className="flex flex-1 px-2 text-[16px] dark:hover:border-[#5f5f5f] dark:hover:bg-gray-700 dark:hover:text-white justify-center dark:text-gray-100 text-[#27272a] items-center rounded-lg h-[36px] dark:bg-[#18181b] hover:!bg-[#00000015] dark:border-2 border-[1px] dark:border-[#27272a] bg-transparent border-[#27272a] dark:focus:border-[#5f5f5f] hover:border-[#00000015] focus:bg-[#00000015] focus:border-[#00000015]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 dark:text-gray-100 text-gray-950"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
              />
            </svg>
            <span className="text-[13px] mx-2 ">View</span>
          </button>
          <button
            disabled={deleting}
            type="button"
            onClick={handleOpenConfirmationModal}
            className="flex px-2 flex-1 dark:hover:bg-rose-700 dark:hover:border-[#5f5f5f] dark:hover:text-white text-[#27272a]  justify-center items-center rounded-lg h-[36px] dark:bg-rose-500 dark:border-2 border-[1px] dark:border-[#27272a]  dark:text-gray-100 hover:border-[#00000015] bg-transparent border-[#27272a] dark:focus:border-[#5f5f5f]"
          >
            {trashIcon}{" "}
            <span className="text-[13px] mx-2 ">
              {deleting ? "Deleting..." : "Delete"}
            </span>
          </button>
        </div>
      </div>
      {confirmationModal && (
        <DeleteConfirmationModal
          message="Are you sure you want to delete ?"
          onConfirm={handleOnDelete}
          onCancel={() => setConfirmationModal(false)}
        />
      )}
    </>
  );
};
export default SingleRecentResumeCard;
