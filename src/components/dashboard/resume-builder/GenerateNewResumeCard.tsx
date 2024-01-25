"use client";
import Image from "next/image";
import { memo, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";

import { setState } from "@/store/resumeSlice";

import Link from "next/link";
import { infoSmallIcon } from "@/helpers/iconsProvider";

interface Props {
  getConsent: (value: any) => void;
  availablePercentage: number;
}
const GenerateResume = ({
  getConsent,
}: // availablePercentage,
Props) => {
  const [showInstruction, setShowInstruction] = useState<boolean>(false);
  const [availablePercentage, setAvailablePercentage] = useState<number>(0);
  const [percentageCalculated, setPercentageCalculated] =
    useState<boolean>(false);
  const [quantifyingExperience, setQuantifyingExperience] =
    useState<boolean>(true);
  // Redux
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state.resume.state);
  const userData = useSelector((state: any) => state.userData);
  const memoizedState = useMemo(() => state, [state]);

  return (
    <div className=" dark:bg-[#17151b] dark:text-white bg-[#00000015] text-gray-950 rounded-[20px] py-9 px-4 md:px-[30px] flex flex-col gap-7 ">
      {/* header */}
      <div className="flex gap-2 flex-col md:flex-row  justify-between items-center">
        <h3 className=" text-[16px] md:text-sm uppercase dark:text-gray-100 text-gray-950 font-bold">
          generate new resume
        </h3>
        <div className="dark:text-gray-100 text-gray-950 uppercase font-bold">
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
            <span className="block dark:text-gray-100 text-gray-950 font-bold text-base">
              1.
            </span>
            <p className="dark:text-gray-100 text-gray-950 text-base">
              <span className=" font-bold">Crucial!</span> Review your profile,
              and update missing details for improved results
              <Link href="#" className="text-[#615DFF] font-bold">
                Click here
              </Link>
            </p>
          </div>
          <div className="flex flex-row gap-2">
            <span className="block dark:text-gray-100 text-gray-950 font-bold text-base">
              2.
            </span>
            <p className="dark:text-gray-100 text-gray-950 text-base">
              To edit your new Resume! and make changes or corrections,
              double-click the text or paragraph you wish to edit. Any changes
              you make will be automatically saved.
            </p>
          </div>
          <div className="flex flex-row gap-2">
            <span className="block dark:text-gray-100 text-gray-950 font-bold text-base">
              3.
            </span>
            <p className="dark:text-gray-100 text-gray-950 text-base">
              If you{"'"}re unsatisfied with the results, please note that we
              create your new resume using your original resume data. If any of
              your experiences are missing,
              <Link href="#" className="text-[#615DFF] font-bold">
                &nbsp; Edit your profile
              </Link>
              , add any missing work experience with a brief description, and
              then generate your resume again.
            </p>
          </div>
        </div>
      )}

      {/* form */}
      <div className="flex flex-col gap-5 justify-between items-start">
        <div className="w-full flex flex-col gap-[30px]">
          <label
            htmlFor="targetedJobPosition"
            className=" font-bold dark:text-gray-100 text-gray-950 text-md md:text-[24px] flex flex-row gap-[10px]"
          >
            <Image
              src="/icon/rocket.svg"
              alt="bold icon"
              height={16}
              width={16}
            />
            Targeted Job Position
          </label>
          <input
            type="targetedJobPosition"
            name="targetedJobPosition"
            id="targetedJobPosition"
            value={memoizedState?.jobPosition}
            onChange={(e) =>
              dispatch(setState({ name: "jobPosition", value: e.target.value }))
            }
            placeholder="e.g. Sales Associates"
            className="w-full py-4 px-[26px] rounded-full text-sm text-[#959595] bg-transparent border-[#312E37] border"
          />
        </div>

        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={quantifyingExperience}
            onChange={(e) => setQuantifyingExperience(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full  after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-none peer-checked:bg-blue-600"></div>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Quantifying Experiences
          </span>
          <span className=" ml-2 cursor-pointer text-gray-600 relative group">
            {infoSmallIcon}
            <div
              role="tooltip"
              className="hidden absolute bg-gray-600 text-gray-100 p-2 rounded-md text-xs md:-top-6 xs:top-0 xs:left-0 md:left-28 transform -translate-x-1/2 w-48 group-hover:block"
            >
              Quantifying experiences refers to assigning numerical or
              measurable values to experiences or achievements to make them more
              tangible or comparable.
              {/* {creditPackage.featuresToolTips[i]} */}
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
          </span>
        </label>
        <button
          disabled={
            memoizedState.jobPosition === "" ||
            memoizedState.resumeLoading ||
            !session?.user?.email
          }
          onClick={() => getConsent(quantifyingExperience)}
          className={` dark:bg-gradient-to-r from-[#b324d7] to-[#615dff] dark:border-none dark:border-0 border-[1px] border-gray-950 bg-transparent flex flex-row justify-center items-center gap-2 py-4 px-[26px]  rounded-full ${
            memoizedState.jobPosition === "" ||
            memoizedState.resumeLoading ||
            !session?.user?.email
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          <span className="dark:text-gray-100 text-gray-950 text-sm">
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
              <div className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 dark:text-gray-100 text-gray-950 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                  />
                </svg>

                <span
                  className={`dark:text-gray-100 text-gray-950 ml-3 text-[15px] font-semibold cursor-pointer`}
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
