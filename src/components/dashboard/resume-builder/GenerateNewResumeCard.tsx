import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import ReactToPrint from "react-to-print";
// import DownloadDocx from "../resume-templates/template-1/DownloadDocx";
import { setState } from "@/store/resumeSlice";
import Button from "@/components/utilities/form-elements/Button";
// import NewButton from "@/components/utilities/form-elements/Button";
import Link from "next/link";
import { informationCirlceIcon } from "@/helpers/iconsProvider";
import { faMagicWandSparkles } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  handleGenerate: () => Promise<void>;
  componentRef: any;
  availablePercentage: number;
}
const GenerateNewResumeCard = ({
  handleGenerate,
  componentRef,
  availablePercentage,
}: Props) => {
  const { data: session } = useSession();

  // Redux
  const dispatch = useDispatch();
  const resumeData = useSelector((state: any) => state.resume);

  return (
    <div className="ml-10 w-[95%]  p-4  border border-gray-200 rounded-lg shadow sm:p-6 ">
      <div className="w-full ">
        <div className="space-y-4 md:space-y-6">
          <div>
            <div className="flex flex-row gap-4">
              <div className="w-1/2">
                <h2 className="text-2xl font-semibold mb-2 ">
                  Generate a New Resume
                </h2>
                <label
                  htmlFor="targetedJobPosition"
                  className="block mb-2 text-lg font-medium  "
                >
                  Targeted Job position{" "}
                </label>
                <input
                  type="targetedJobPosition"
                  name="targetedJobPosition"
                  id="targetedJobPosition"
                  className="bg-gray-50 border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  text-white bg-transparent"
                  value={resumeData?.state?.jobPosition}
                  onChange={(e) =>
                    dispatch(
                      setState({ name: "jobPosition", value: e.target.value })
                    )
                  }
                />
              </div>
              <div className="w-1/2 p-2 pl-4">
                <h3 className="text-lg font-bold flex  items-center gap-1 ">
                  {informationCirlceIcon} Instructions
                </h3>
                <p className="text-sm ml-2">
                  <span className="font-semibold">Crucial!</span> Review your
                  profile, and update missing details for improved results.{" "}
                  <Link
                    href="/profile-review"
                    className="text-black dark:text-white"
                  >
                    Click here
                  </Link>{" "}
                </p>
                <p className="text-sm ml-2">
                  <span className="font-semibold">
                    To edit your new Resume!
                  </span>
                  &nbsp; and make changes or corrections, double-click the text
                  or paragraph you wish to edit. Any changes you make will be
                  automaticaly saved.
                </p>
                <p className="text-sm ml-2">
                  If you{"'"}re{" "}
                  <span className="font-semibold">
                    unsatisfied with the results
                  </span>
                  , please note that we create your new resume using your
                  original resume data. If any of your experiences are missing,{" "}
                  <Link
                    href="/profile-review"
                    className="text-black dark:text-white"
                  >
                    Edit your profile
                  </Link>
                  , add any missing work experience with a brief description,
                  and then generate your resume again.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-4">
            {!isNaN(availablePercentage) && availablePercentage !== 0 && (
              <div>
                <Button
                  type="button"
                  disabled={
                    resumeData.state.jobPosition === "" ||
                    resumeData.state.resumeLoading ||
                    !session?.user?.email
                  }
                  onClick={handleGenerate}
                  className="btn btn-outline-primary-dark"
                >
                  <div className="flex flex-row gap-2">
                    <FontAwesomeIcon icon={faMagicWandSparkles} />
                    <span>
                      {resumeData.state.resumeLoading
                        ? "Please wait..."
                        : "Generate New Resume"}
                    </span>
                  </div>
                </Button>
              </div>
            )}

            {/* {!isNaN(availablePercentage) && availablePercentage !== 0 && (
              <div>
                <button
                  disabled={
                    resumeData.state.jobPosition === "" ||
                    resumeData.state.resumeLoading ||
                    !session?.user?.email
                  }
                  onClick={handleGenerate}
                  className="bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  disabled:bg-emerald-300"
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
            )} */}

            {/* {resumeData && (
              <DownloadDocx
                basicInfo={resumeData}
                disabled={
                  resumeData.state.jobPosition === "" ||
                  resumeData.state.resumeLoading ||
                  !session?.user?.email
                }
              />
            )} */}
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
