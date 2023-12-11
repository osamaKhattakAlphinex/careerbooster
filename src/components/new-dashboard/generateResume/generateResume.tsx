"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import fi_chevron_down from "@/../public/Ai tools/icon/fi_chevron-down.svg";
const GenerateResume = () => {
  const [showInstruction, setShowInstruction] = useState<boolean>(false);

  return (
    <div className=" bg-[#17151B] rounded-[20px] py-9 px-[30px] flex flex-col gap-7 ">
      {/* header */}
      <div className="flex flex-row justify-between items-center">
        <h3 className=" text-sm uppercase text-white font-bold">
          generate new resume
        </h3>
        <div className=" text-sm text-white uppercase font-bold">
          Available Credits:<span className="text-[#B324D7]"> 1 out of 1</span>
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
            src="/Ai tools/icon/fi_chevron-down.svg"
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
      <form className="flex flex-col gap-5 justify-between items-start">
        <div className="w-full flex flex-col gap-[30px]">
          <label
            htmlFor="job-title"
            className=" font-bold text-white flex flex-row gap-[10px]"
          >
            <Image
              src="/Ai tools/icon/rocket.svg"
              alt="bold icon"
              height={16}
              width={16}
            />
            Targeted Job Position
          </label>
          <input
            type="text"
            id="job-title"
            name="jobTitle"
            placeholder="e.g. Sales Associates"
            className="w-full py-4 px-[26px] rounded-full text-sm text-[#959595] bg-transparent border-[#312E37] border"
          />
        </div>
        <button
          type="submit"
          className="bg-gradient-to-r from-[#B324D7]  to-[#615DFF] flex flex-row justify-center items-center gap-2 py-4 px-[26px]  rounded-full"
        >
          <Image
            src="/Ai tools/icon/u_bolt-alt.svg"
            alt="bold icon"
            height={18}
            width={18}
          />
          <span className="text-white text-sm">Generate New Resume</span>
        </button>
      </form>
    </div>
  );
};

export default GenerateResume;
