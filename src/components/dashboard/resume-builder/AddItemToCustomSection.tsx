import React, { useState } from "react";
import CustomForm from "./CustomForm";

const AddItemToCustomSection = ({ recName }: any) => {
  const [showCustomForm, setShowCustomForm] = useState<boolean>(false);

  return (
    <>
      <button
        onClick={() => {
          setShowCustomForm(true);
        }}
        className="text-sm xs:w-1/3 sm:w-1/4 md:w-1/5 text-gray-900 cursor-pointer hover:opacity-80 font-semibold bg-gray-200 py-2 rounded-lg px-3 m-2   "
      >
        Add Item
      </button>
      {showCustomForm && (
        <CustomForm setShowCustomForm={setShowCustomForm} recName={recName} />
      )}
    </>
  );
};

export default AddItemToCustomSection;
