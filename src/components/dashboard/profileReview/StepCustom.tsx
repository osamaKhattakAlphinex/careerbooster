import { plusSimpleIcon } from "@/helpers/iconsProvider";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStepCustom } from "@/store/registerSlice";
import SectionCard from "./SectionCard";
import EditCustomCard from "./EditCustomCard";

const StepCustom = () => {
  const dispatch = useDispatch();
  const stepCustom = useSelector((state: any) => state.register.stepCustom);
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
          <SectionCard key={index} index={index} singleStep={singleStep} />
        );
      })}
    </div>
  );
};

export default StepCustom;
