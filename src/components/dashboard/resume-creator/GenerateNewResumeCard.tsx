import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import ReactToPrint from "react-to-print";
import DownloadDocx from "../resume-templates/template-1/DownloadDocx";
import { setState } from "@/store/resumeSlice";

interface Props {
  handleGenerate: () => Promise<void>;
  componentRef: any;
}
const GenerateNewResumeCard = ({ handleGenerate, componentRef }: Props) => {
  const { data: session } = useSession();

  // Redux
  const dispatch = useDispatch();
  const resumeData = useSelector((state: any) => state.resume);
  // const userData = useSelector((state: any) => state.userData);
  // console.clear();

  return (
    <div className="m-10 w-[95%]  p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
      <div className="w-full card">
        <div className="space-y-4 md:space-y-6">
          <div>
            <div className="flex flex-row gap-4">
              <div className="w-1/2">
                <h2 className="text-2xl font-semibold mb-2 ">
                  Generate a New Resume
                </h2>
                <label
                  htmlFor="targetedJobPosition"
                  className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                >
                  Targeted Job position{" "}
                </label>
                <input
                  type="targetedJobPosition"
                  name="targetedJobPosition"
                  id="targetedJobPosition"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={resumeData?.state?.jobPosition}
                  onChange={(e) =>
                    dispatch(
                      setState({ name: "jobPosition", value: e.target.value })
                    )
                  }
                />
              </div>
              <div className="w-1/2 p-2 pl-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Instructions
                </h3>
                <p className="text-sm mb-2">
                  Write The Job Position for which you are Recreating your
                  Resume so that we can create a Customized stunning Resume for
                  you{" "}
                </p>
                <p className="text-xs my-2 text-gray-600">
                  Note: The Resume will be created according to your profile. If
                  you are not satisfied with the results try Editing your
                  profile and provide as much details as possible
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <div>
              <button
                disabled={
                  resumeData.state.jobPosition === "" ||
                  resumeData.state.resumeLoading ||
                  !session?.user?.email
                }
                onClick={handleGenerate}
                className="bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:bg-emerald-300"
              >
                <div className="flex flex-row gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className={`w-4 h-4 ${
                      resumeData.state.resumeLoading ? "animate-spin" : ""
                    }`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                  <span>
                    {resumeData.state.resumeLoading
                      ? "Please wait..."
                      : "Generate New Resume"}
                  </span>
                </div>
              </button>
            </div>

            {resumeData && (
              <DownloadDocx
                basicInfo={resumeData}
                disabled={
                  resumeData.state.jobPosition === "" ||
                  resumeData.state.resumeLoading ||
                  !session?.user?.email
                }
              />
            )}
            {resumeData && (
              <>
                <ReactToPrint
                  trigger={() => (
                    <button
                      disabled={
                        resumeData.state.jobPosition === "" ||
                        resumeData.state.resumeLoading ||
                        !session?.user?.email ||
                        !resumeData?.name
                      }
                      className="bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:bg-emerald-300"
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
                        <span>Print / Download Resume in PDF</span>
                        {/* <span>
                            To download choose destination "save as PDF"
                          </span> */}
                      </div>
                    </button>
                  )}
                  content={() => componentRef.current}
                />
              </>
            )}
          </div>
          {/* {resumeData?.loadingState !== "" && (
              <h3>
                AI is Writing...
                {resumeData?.loadingState === "basicInfo" && "Basic Info"}
                {resumeData?.loadingState === "summary" && "Summary"}
                {resumeData?.loadingState === "workExperience" &&
                  "Work Experience"}
                {resumeData?.loadingState === "primarySkills" &&
                  "Primary Skills"}
                {resumeData?.loadingState === "professionalSkills" &&
                  "Professional Skills"}
                {resumeData?.loadingState === "secondarySkills" &&
                  "Secondary Skills"}
              </h3>
            )} */}
        </div>
      </div>
    </div>
  );
};

export default GenerateNewResumeCard;