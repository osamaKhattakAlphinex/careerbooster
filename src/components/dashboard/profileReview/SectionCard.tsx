import { deleteIcon, plusSimpleIcon } from "@/helpers/iconsProvider";
import React, { useState } from "react";
import AddNewSectionItemCard from "./AddNewSectionItemCard";
import { useDispatch, useSelector } from "react-redux";
import { setStepCustom } from "@/store/registerSlice";
import { CustomEntry, setUserData } from "@/store/userDataSlice";
import CustomCard from "./CustomCard";
import EditCustomCard from "./EditCustomCard";
import { setCustomExperienceArray } from "@/store/resumeSlice";
import axios from "axios";
import { showSuccessToast } from "@/helpers/toast";
export interface singleStepProps {
  name: string;
  entries: [];
}
const SectionCard = ({ singleStep, index, showButtons = true }: any) => {
  const [addNew, setAddNew] = useState<boolean>(false);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const stepCustom = useSelector((state: any) => state.register.stepCustom);
  const userData = useSelector((state: any) => state.userData);
  const dispatch = useDispatch();
  const { name, entries } = singleStep;
  const handleDelete = async () => {
    let updatedStepCustom = [...stepCustom];
    console.log(index)
    updatedStepCustom.splice(index, 1);
    dispatch(setStepCustom(updatedStepCustom));
    dispatch(setCustomExperienceArray(updatedStepCustom));
    const newUserData = { ...userData, customDetails: updatedStepCustom };
    dispatch(setUserData({...newUserData}));
    return axios
      .post("/api/users/updateUserData", {
        data: newUserData,
      })
      .then(async (resp: any) => {
        if (resp?.data?.success) {
          showSuccessToast("Profile updated successfully");
        }
      });
  };
  return (
    <>
      <div className="flex w-full justify-between items-center">
      <h1
        contentEditable={isEditable}
        title="Click to Edit"
        onClick={() => setIsEditable(true)}
        onBlur={(e) => {
          const updatedStepCustom = [...stepCustom];
          updatedStepCustom[index] = {
            ...updatedStepCustom[index],
            name: e.target.innerText,
            entries: entries ? [...entries] : [],
          };
          dispatch(setStepCustom(updatedStepCustom));
          dispatch(setCustomExperienceArray(updatedStepCustom));
          setIsEditable(false);
          setIsEditable(false);
        }}
        className="hover:border-dashed hover:border-gray-300 border-2 w-full border-transparent text-lg xs:my-5 justify-between items-center flex md:mt-2 font-bold leading-tight tracking-tight dark:text-gray-100 text-gray-950  md:text-2xl "
      >
        {name}
      </h1>
      <button
          className="text-red-500 hover:text-red-700"
          onClick={() => handleDelete()}
        >
          {deleteIcon}
        </button>
      </div>
      <div className="w-[100%] grid grid-cols-2 xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 mt-4 xs:mt-2  gap-4 md:gap-2 lg:gap-4 xl:gap-6  ">
        {entries?.map((rec: CustomEntry) => (
          <div key={rec.id}>
            <CustomCard rec={rec} index={index} showButtons={showButtons} />
          </div>
        ))}
      </div>
      {addNew && <AddNewSectionItemCard setAddNew={setAddNew} index={index} />}
      {showButtons && (
        <button
          type="button"
          onClick={(e) => setAddNew(true)}
          className="xs:w-full md:w-3/12  flex mt-4 flex-row gap-1 items-center justify-center text-blue-700 hover:text-white border-[1px] border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          {plusSimpleIcon}
          Add Item
        </button>
      )}
    </>
  );
};

export default SectionCard;
