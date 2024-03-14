"use client";
import Image from "next/image";
import { memo, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";

import { setState } from "@/store/resumeSlice";

import Link from "next/link";
import { infoSmallIcon } from "@/helpers/iconsProvider";

interface Props {
  getConsent: () => void;
}
const GenerateResume = ({
  getConsent,
}:
Props) => {
  const [showInstruction, setShowInstruction] = useState<boolean>(false);
  
  // const [quantifyingExperience, setQuantifyingExperience] =
  //   useState<boolean>(true);
  // Redux
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state.resume.state);
  const userData = useSelector((state: any) => state.userData);
  const memoizedState = useMemo(() => state, [state]);

  return (
    <div className=" dark:bg-[#17151b] dark:text-white bg-[#00000015] text-gray-950 rounded-[20px] py-6 px-4 md:px-[30px] flex flex-col gap-4 ">
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
          <Image
            src="/icon/fi_chevron-down.svg"
            alt="menu"
            width={14}
            height={14}
          />
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
        <div className="w-full flex flex-col gap-4">
          <label
            htmlFor="targetedJobPosition"
            className=" font-bold items-center dark:text-gray-100 text-gray-950 text-md md:text-[24px] flex flex-row gap-[10px]"
          >
            <Image
              src="/icon/rocket.svg"
              alt="bold icon"
              height={16}
              width={16}
            />
            Enter Your Targeted Job Position{" "}
            <div className="group cursor-pointer relative inset-0">
              {infoSmallIcon}
              <div className="w-48 bg-gradient-to-r z-50 from-[#B324D7] to-[#615DFF] font-medium xs:text-[10px] md:text-[14px] px-2 absolute xs:-left-48 md:left-4 xs:-top-28  md:-top-[11.5rem]  hidden group-hover:block md:rounded-bl-none xs:rounded-br-none md:rounded-br-xl text-gray-100  mb-6 shadow-xl rounded-xl py-2  transition-all">
                Customize your resume for the specific roles you{"'"}re applying
                for. A tailored resume significantly boosts your chances of
                securing more interviews by highlighting your suitability for
                the position.
              </div>
            </div>
          </label>

          <input
            type="targetedJobPosition"
            name="targetedJobPosition"
            id="targetedJobPosition"
            value={memoizedState?.jobPosition}
            onChange={(e) =>
              dispatch(setState({ name: "jobPosition", value: e.target.value }))
            }
            placeholder="e.g. Vice President of Sales"
            className="w-full py-4 px-[26px] rounded-full text-sm text-[#959595] bg-transparent border-[#312E37] border-[1px]"
          />
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
            memoizedState.jobPosition === "" ||
            memoizedState.resumeLoading ||
            !session?.user?.email
          }
          onClick={() => getConsent()}
          className={` dark:bg-gradient-to-r hover:from-purple-800 hover:to-pink-600 from-[#b324d7]  to-[#615dff] dark:border-none dark:border-0 border-[1px] border-gray-950 bg-transparent flex flex-row justify-center items-center gap-2 py-4 px-[26px]  rounded-full ${
            memoizedState.jobPosition === "" ||
            memoizedState.resumeLoading ||
            !session?.user?.email
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          <span className="text-sm dark:text-gray-100 text-gray-950">
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

                <span
                  className={`dark:text-gray-100  text-gray-950 ml-3 text-[15px] font-semibold cursor-pointer`}
                >
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
