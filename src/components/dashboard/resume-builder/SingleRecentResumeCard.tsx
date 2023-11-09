import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEye, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Resume, setResume } from "@/store/resumeSlice";
import { getFormattedDate } from "@/helpers/getFormattedDateTime";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUserData } from "@/store/userDataSlice";
import { useRouter } from "next/navigation";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import { useSession } from "next-auth/react";
import Html2Pdf from "js-html2pdf";

const SingleRecentResumeCard = ({
  resume,
  source,
  componentRef,
}: {
  resume: Resume;
  source?: string;
  componentRef: any;
}) => {
  const { data: session } = useSession();
  const router = useRouter();

  // redux
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.userData);
  const { email, resumes } = userData;

  const handleOnView = async () => {
    if (source != "") {
      router.replace("/resume-builder");
    }
    return dispatch(setResume(resume));
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
    <div className="w-full  border border-gray-200 rounded-lg shadow p-2 sm:p-4">
      <h2 className=" text-lg  ">{resume?.state?.jobPosition}</h2>
      <h2 className="text-sm  ">{resume?.jobTitle}</h2>
      <p className="text-xs mb-3 ">
        Generated on {getFormattedDate(resume?.dateTime)}
      </p>
      <div className="flex flex-row gap-2 justify-between">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleOnView}
            className=" border hover:bg-gray-100  text-xs  px-3 rounded-md shadow-md transition duration-300 ease-in-out flex flex-row gap-2 justify-center items-center py-1"
          >
            <FontAwesomeIcon icon={faEye} />
            View
          </button>

          {resume && (
            <>
              <ReactToPrint
                trigger={() => (
                  <button
                    type="button"
                    disabled={
                      resume.state.jobPosition === "" ||
                      resume.state.resumeLoading ||
                      !session?.user?.email ||
                      !resume?.name
                    }
                    className="  border hover:bg-gray-100  text-xs  px-3 rounded-md shadow-md transition duration-300 ease-in-out flex flex-row gap-2 justify-center items-center py-1"
                  >
                    <div className="flex flex-row gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                        />
                      </svg>
                      <span>Download</span>
                      {/* <span>
                            To download choose destination "save as PDF"
                          </span> */}
                    </div>
                  </button>
                )}
                onBeforeGetContent={async () => await handleOnView()}
                content={() => componentRef.current}
                print={async (printIframe: HTMLIFrameElement) => {
                  const document = printIframe.contentDocument;
                  if (document) {
                    const exporter = new Html2Pdf(componentRef.current, {
                      filename: `${resume.name}-${resume.jobTitle}.pdf`,
                    });
                    exporter.getPdf(true);
                  }
                }}
              />
            </>
          )}
        </div>

        <button
          type="button"
          onClick={handleOnDelete}
          className="border px-3 text-white  hover:text-gray-800  text-xs  rounded-md shadow-md transition duration-300 ease-in-out flex flex-row gap-2 justify-center items-center float-right"
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </div>
    </div>
  );
};

export default SingleRecentResumeCard;
