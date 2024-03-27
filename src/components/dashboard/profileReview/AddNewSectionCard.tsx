import { plusSimpleIcon } from "@/helpers/iconsProvider";
import React from "react";
import { useSelector } from "react-redux";

const AddNewSectionCard = () => {
  const stepCustom = useSelector((state: any) => state.register.stepCustom);
  console.log(stepCustom);
  return (
    <>
      <h1
        contentEditable={true}
        title="Click to Edit"
        className="hover:border-dashed hover:border-gray-300 border-2 border-transparent text-lg xs:my-5 justify-between items-center flex md:mt-2 font-bold w-full leading-tight tracking-tight dark:text-gray-100 text-gray-950  md:text-2xl "
      >
        {stepCustom[stepCustom.length - 1].name}
      </h1>

      <button
        type="button"
        // onClick={(e) => dispatch(setStepFour({ state: "add" }))}
        className="xs:w-full md:w-3/12  flex mt-4 flex-row gap-1 items-center justify-center text-blue-700 hover:text-white border-[1px] border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        {plusSimpleIcon}
        Add Item
      </button>
    </>
  );
};

export default AddNewSectionCard;
