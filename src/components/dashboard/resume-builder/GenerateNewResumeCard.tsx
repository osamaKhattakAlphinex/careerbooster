"use client";
import Image from "next/image";
import { memo, useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";

import { setState } from "@/store/resumeSlice";

import Link from "next/link";
import { infoSmallIcon } from "@/helpers/iconsProvider";
import { useTourContext } from "@/context/TourContext";

interface Props {
  // getConsent: () => void;
  handleGenerate: () => Promise<void>;
}
const GenerateResume = ({ handleGenerate }: Props) => {
  const radiosResumeType: { labelText: string; value: string }[] = [
    {
      labelText: "Generate Basic Resume",
      value: "resume-basic",
    },
    {
      labelText: "Generate for Job Title",
      value: "resume-job-title",
    },
    {
      labelText: "Generate for a Specific Job",
      value: "resume-job-description",
    },
  ];

  const [showInstruction, setShowInstruction] = useState<boolean>(false);
  const [resumeType, setResumeType] = useState<
    "resume-basic" | "resume-job-title" | "resume-job-description"
  >("resume-basic");
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state.resume.state);
  const userData = useSelector((state: any) => state.userData);
  const memoizedState = useMemo(() => state, [state]);
  const { resumeElementRef } = useTourContext();

  useEffect(() => {
    setResumeType(memoizedState.resumeType);
  }, [memoizedState]);

  return (
    <div
      ref={(ref: any) => (resumeElementRef.current = ref)}
      className=" dark:bg-[#17151b] dark:text-white bg-[#00000015] text-gray-950 rounded-lg py-6 px-4 md:px-[30px] flex flex-col gap-4 "
    >
      {/* header */}
      <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
        <h3 className=" text-[16px] md:text-sm uppercase dark:text-gray-100 text-gray-950 font-bold">
          generate new resume
        </h3>
        <div className="font-bold uppercase dark:text-gray-100 text-gray-950">
          {/* <LimitCard
            title="AvailableCredits : "
            limit={userData?.userPackageData?.limit?.resumes_generation}
            used={userData?.userPackageUsed?.resumes_generation}
            setPercentageCalculated={setPercentageCalculated}
            availablePercentage={availablePercentage}
            setAvailablePercentage={setAvailablePercentage}
          /> */}
        </div>
      </div>

      {/* instruction */}

      <div className="text-sm text-[#706dff] self-start">
        <button
          className="flex flex-row justify-start items-center gap-[10px]"
          type="button"
          onClick={() => setShowInstruction(!showInstruction)}
        >
          <span className="uppercase text-[11px] md:text-sm font-bold block gro">
            instructions
          </span>

          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            // className="rotate-180"
            className={`${
              showInstruction
                ? "w-5 h-5 transform rotate-180 transition-transform duration-300 ease-in-out"
                : "w-5 h-5 transform transition-transform duration-300 ease-in-out "
            }`}
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="fi:chevron-down">
              <path
                id="Vector"
                d="M4 6L8 10L12 6"
                stroke="#615DFF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </button>
      </div>

      {showInstruction && (
        <div className=" flex flex-col justify-start gap-[10px]">
          <div className="flex flex-row gap-2">
            <span className="block text-base font-bold dark:text-gray-100 text-gray-950">
              1.
            </span>
            <p className="text-base dark:text-gray-100 text-gray-950">
              <span className="font-bold ">Crucial!</span> Review your profile,
              and update missing details for improved results. &nbsp;
              <Link href="/profile-review" className="text-[#615DFF] font-bold">
                Click here
              </Link>
            </p>
          </div>
          <div className="flex flex-row gap-2">
            <span className="block text-base font-bold dark:text-gray-100 text-gray-950">
              2.
            </span>
            <p className="text-base dark:text-gray-100 text-gray-950">
              To edit your new Resume! and make changes or corrections,
              double-click the text or paragraph you wish to edit. Any changes
              you make will be automatically saved.
            </p>
          </div>
          <div className="flex flex-row gap-2">
            <span className="block text-base font-bold dark:text-gray-100 text-gray-950">
              3.
            </span>
            <p className="text-base dark:text-gray-100 text-gray-950">
              If you{"'"}re unsatisfied with the results, please note that we
              create your new resume using your original resume data. If any of
              your experiences are missing, &nbsp;
              <Link href="/profile-review" className="text-[#615DFF] font-bold">
                Edit your profile
              </Link>
              , add any missing work experience with a brief description, and
              then generate your resume again.
            </p>
          </div>
        </div>
      )}

      {/* form */}
      <div className="flex flex-col items-start justify-between gap-5">
        <div className="flex flex-col w-full gap-4">
          <div className="flex flex-col items-start justify-center gap-2">
            <h2 className="text-sm font-semibold text-gray-300 uppercase">
              Resume Type
            </h2>
            {radiosResumeType.map(
              ({ labelText, value }: { labelText: string; value: string }) => (
                <label className="text-sm cursor-pointer" key={value}>
                  <input
                    type="radio"
                    name="resume-type"
                    value={value}
                    className="mr-1"
                    checked={resumeType === value}
                    onChange={(e) => {
                      if (e.target.value === "resume-job-description") {
                        dispatch(setState({ name: "jobPosition", value: "" }));
                      } else if (e.target.value === "resume-job-title") {
                        dispatch(
                          setState({ name: "jobDescription", value: "" })
                        );
                      } else {
                        dispatch(setState({ name: "jobPosition", value: "" })),
                          dispatch(
                            setState({ name: "jobDescription", value: "" })
                          );
                      }

                      dispatch(
                        setState({ name: "resumeType", value: e.target.value })
                      ),
                        setResumeType(
                          e.target.value as
                            | "resume-basic"
                            | "resume-job-title"
                            | "resume-job-description"
                        );
                    }}
                  />
                  {labelText}
                </label>
              )
            )}
          </div>
          {resumeType === "resume-job-title" ? (
            <>
              <label
                htmlFor="targetedJobPosition"
                className=" font-semibold items-center dark:text-gray-100 text-gray-950 text-sm md:text-base flex flex-row gap-[10px]"
              >
                <Image
                  src="/icon/rocket.svg"
                  alt="bold icon"
                  height={16}
                  width={16}
                />
                Enter Your Targeted Job Position{" "}
                <div className="relative inset-0 cursor-pointer group">
                  {infoSmallIcon}
                  <div className="w-48 bg-gradient-to-r z-50 from-[#B324D7] to-[#615DFF] font-medium xs:text-[10px] md:text-[14px] px-2 absolute xs:-left-48 md:left-4 xs:-top-28  md:-top-[11.5rem]  hidden group-hover:block md:rounded-bl-none xs:rounded-br-none md:rounded-br-xl text-gray-100  mb-6 shadow-xl rounded-xl py-2  transition-all">
                    Customize your resume for the specific roles you{"'"}re
                    applying for. A tailored resume significantly boosts your
                    chances of securing more interviews by highlighting your
                    suitability for the position.
                  </div>
                </div>
              </label>

              <input
                type="targetedJobPosition"
                name="targetedJobPosition"
                id="targetedJobPosition"
                value={memoizedState?.jobPosition}
                onChange={(e) =>
                  dispatch(
                    setState({ name: "jobPosition", value: e.target.value })
                  )
                }
                placeholder="e.g. Vice President of Sales"
                className="w-full py-2 px-4 rounded-full text-xs md:text-sm text-[#959595] bg-transparent border-[#312E37] border-[1px]"
              />
            </>
          ) : resumeType === "resume-job-description" ? (
            <>
              <label
                htmlFor="targetedJobPosition"
                className=" font-semibold items-center dark:text-gray-100 text-gray-950 text-sm md:text-base flex flex-row gap-[10px]"
              >
                <Image
                  src="/icon/rocket.svg"
                  alt="bold icon"
                  height={16}
                  width={16}
                />
                Enter Your Targeted Job Description
                <div className="relative inset-0 cursor-pointer group">
                  {infoSmallIcon}
                  <div className="w-48 bg-gradient-to-r z-50 from-[#B324D7] to-[#615DFF] font-medium xs:text-[10px] md:text-[14px] px-2 absolute xs:-left-48 md:left-4 xs:-top-28  md:-top-[11.5rem]  hidden group-hover:block md:rounded-bl-none xs:rounded-br-none md:rounded-br-xl text-gray-100  mb-6 shadow-xl rounded-xl py-2  transition-all">
                    Customize your resume for the specific roles you{"'"}re
                    applying for. A tailored resume significantly boosts your
                    chances of securing more interviews by highlighting your
                    suitability for the position.
                  </div>
                </div>
              </label>

              <textarea
                name="targetedJobPosition"
                id="targetedJobPosition"
                value={memoizedState?.jobDescription}
                onChange={(e) =>
                  dispatch(
                    setState({ name: "jobDescription", value: e.target.value })
                  )
                }
                placeholder="Enter job description"
                rows={10}
                className="w-full py-2 px-4 rounded-md text-xs md:text-sm text-[#959595] bg-transparent border-[#312E37] border-[1px]"
              />
              <a
                className="ml-auto hover:underline cursor-pointer"
                onClick={() => {
                  dispatch(setState({ name: "jobDescription", value: "" }));
                }}
              >
                <span className="text-xs capitalize dark:text-gray-300  text-gray-950 md:text-sm">
                  Clear Input
                </span>
              </a>
            </>
          ) : (
            ""
          )}

          <h2 className="text-sm font-semibold text-gray-300 uppercase">
            Content Type
          </h2>
          <div className="flex flex-row items-center justify-start gap-2 ">
            <label htmlFor="resume-short" className="text-sm cursor-pointer">
              <input
                className="mr-1"
                type="radio"
                name="resume-size"
                id="resume-short"
                checked={!memoizedState?.detailedResume}
                onChange={() =>
                  dispatch(
                    setState({
                      name: "detailedResume",
                      value: false,
                    })
                  )
                }
              />
              Short and Crisp
            </label>
            <label htmlFor="resume-detailed" className="text-sm cursor-pointer">
              <input
                className="mr-1"
                type="radio"
                name="resume-size"
                id="resume-detailed"
                checked={memoizedState?.detailedResume}
                onChange={() =>
                  dispatch(
                    setState({
                      name: "detailedResume",
                      value: true,
                    })
                  )
                }
              />
              Detailed
            </label>
          </div>
        </div>
        {/* <label className="relative inline-flex items-center cursor-pointer">
        <input
            type="checkbox"
            checked={quantifyingExperience}
            onChange={(e) => setQuantifyingExperience(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full  after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-none peer-checked:bg-blue-600"></div>
          <span className="text-sm font-medium text-gray-900 ms-3 dark:text-gray-300">
            Quantifying Experiences
          </span>
          <span className="relative ml-2 text-gray-600 cursor-pointer group">
            {infoSmallIcon}
            <div
              role="tooltip"
              className="absolute hidden w-48 p-2 text-xs text-gray-100 transform -translate-x-1/2 bg-gray-600 rounded-md md:-top-6 xs:top-0 xs:left-0 md:left-28 group-hover:block"
            >
              Quantifying experiences refers to assigning numerical or
              measurable values to experiences or achievements to make them more
              tangible or comparable.
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
          </span>
        </label> */}
        <button
          disabled={
            //memoizedState.jobPosition === "" ||
            memoizedState.resumeLoading || !session?.user?.email
          }
          onClick={() => handleGenerate()}
          className={` dark:bg-gradient-to-r hover:from-purple-800 hover:to-pink-600 from-[#b324d7]  to-[#615dff] dark:border-none dark:border-0 border-[1px] border-gray-950 bg-transparent flex flex-row justify-center items-center gap-2  px-4 py-2  rounded-full ${
            // memoizedState.jobPosition === "" ||
            memoizedState.resumeLoading || !session?.user?.email
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          <span className="text-xs md:text-sm dark:text-gray-100 text-gray-950">
            {memoizedState.resumeLoading ? (
              <div className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className={`w-4 h-4 mr-3 ${
                    memoizedState.resumeLoading ? "animate-spin" : ""
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
                Please wait...
              </div>
            ) : (
              <div className="flex items-center">
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

                <span className="ml-1 mb-0.5 text-xs font-semibold cursor-pointer md:text-sm dark:text-gray-100 text-gray-950">
                  Generate Resume
                </span>
              </div>
            )}
          </span>
        </button>
      </div>
    </div>
  );
};

export default memo(GenerateResume);
