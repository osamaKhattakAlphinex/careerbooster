"use client";
import Image from "next/image";
import { memo, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
// import ReactToPrint from "react-to-print";
// import DownloadDocx from "../resume-templates/template-1/DownloadDocx";
import { setState } from "@/store/resumeSlice";
// import NewButton from "@/components/utilities/form-elements/Button";
import Link from "next/link";
import LimitCard from "@/components/new-dashboard/dashboard/LimitCard";

interface Props {
  handleGenerate: () => Promise<void>;
  availablePercentage: number;
}
const GenerateResume = ({
  handleGenerate,
}: // availablePercentage,
Props) => {
  const [showInstruction, setShowInstruction] = useState<boolean>(false);
  const [availablePercentage, setAvailablePercentage] = useState<number>(0);
  const [percentageCalculated, setPercentageCalculated] =
    useState<boolean>(false);
  // Redux
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state.resume.state);
  const userData = useSelector((state: any) => state.userData);
  const memoizedState = useMemo(() => state, [state]);

  return (
    <div className=" bg-[#17151B] rounded-[20px] py-9 px-[30px] flex flex-col gap-7 ">
      {/* header */}
      <div className="flex flex-row justify-between items-center">
        <h3 className=" text-sm uppercase text-white font-bold">
          generate new resume
        </h3>
        <div className=" text-sm text-white uppercase font-bold">
          <LimitCard
            title="AvailableCredits : "
            limit={userData?.userPackageData?.limit?.resumes_generation}
            used={userData?.userPackageUsed?.resumes_generation}
            setPercentageCalculated={setPercentageCalculated}
            availablePercentage={availablePercentage}
            setAvailablePercentage={setAvailablePercentage}
          />
        </div>
      </div>

      {/* instruction */}

      <div className="text-sm text-[#615DFF] self-start">
        <button
          className="flex flex-row justify-start items-center gap-[10px]"
          type="button"
          onClick={() => setShowInstruction(!showInstruction)}
        >
          <span className="uppercase font-bold block gro">instructions</span>
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
            <span className="block text-white font-bold text-base">1.</span>
            <p className="text-white text-base">
              <span className=" font-bold">Crucial!</span> Review your profile,
              and update missing details for improved results
              <Link href="#" className="text-[#615DFF] font-bold">
                Click here
              </Link>
            </p>
          </div>
          <div className="flex flex-row gap-2">
            <span className="block text-white font-bold text-base">2.</span>
            <p className="text-white text-base">
              To edit your new Resume! and make changes or corrections,
              double-click the text or paragraph you wish to edit. Any changes
              you make will be automatically saved.
            </p>
          </div>
          <div className="flex flex-row gap-2">
            <span className="block text-white font-bold text-base">3.</span>
            <p className="text-white text-base">
              If you're unsatisfied with the results, please note that we create
              your new resume using your original resume data. If any of your
              experiences are missing,
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
            className=" font-bold text-white flex flex-row gap-[10px]"
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
        <button
          disabled={
            memoizedState.jobPosition === "" ||
            memoizedState.resumeLoading ||
            !session?.user?.email
          }
          onClick={handleGenerate}
          className="bg-gradient-to-r from-[#B324D7]  to-[#615DFF] flex flex-row justify-center items-center gap-2 py-4 px-[26px]  rounded-full"
        >
          <Image
            src="/icon/u_bolt-alt.svg"
            alt="bold icon"
            height={18}
            width={18}
          />
          <span className="text-white text-sm">
            {memoizedState.resumeLoading
              ? "Please wait..."
              : "Generate New Resume"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default memo(GenerateResume);
