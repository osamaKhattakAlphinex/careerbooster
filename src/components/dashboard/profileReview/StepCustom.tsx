"use client";
import { plusSimpleIcon } from "@/helpers/iconsProvider";

import { useDispatch, useSelector } from "react-redux";
import { setStepCustom } from "@/store/registerSlice";
import SectionCard from "./SectionCard";
import { useEffect, useRef } from "react";

const StepCustom = () => {
  const dispatch = useDispatch();
  const stepCustomRef = useRef<any>(null);
  const stepCustom = useSelector((state: any) => state.register.stepCustom);
  const scrollToNewSection = () => {
    if (stepCustomRef.current) {
      stepCustomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Call scrollToNewSection after adding a new section
  useEffect(() => {
    scrollToNewSection();
  }, [stepCustom]); // Trigger when stepCustom changes
  return (
    <div>
      <h1 className="text-lg xs:my-5 justify-between items-center flex md:mt-2  font-bold leading-tight tracking-tight  md:text-2xl dark:text-gray-100 text-gray-950 ">
        Custom Sections
      </h1>
      <button
        type="button"
        onClick={(e) => {
          dispatch(setStepCustom([...stepCustom, { name: "Untitled" }]));
        }}
        className="xs:w-full md:w-3/12 flex mt-3 flex-row gap-1 items-center justify-center text-blue-700 hover:text-white border-[1px] border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
      >
        {plusSimpleIcon}
        Add Section
      </button>
      {stepCustom?.map((singleStep: any, index: number) => {
        return (
          <div
            key={index}
            ref={index === stepCustom.length - 1 ? stepCustomRef : null}
          >
            <SectionCard index={index} singleStep={singleStep} />
          </div>
        );
      })}
    </div>
  );
};

export default StepCustom;
