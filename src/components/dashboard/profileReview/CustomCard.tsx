import { CustomEntry, setUserData } from "@/store/userDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { setStepCustom } from "@/store/registerSlice";
import { EditIcon, deleteIcon, plusSimpleIcon } from "@/helpers/iconsProvider";

import { useState } from "react";
import EditCustomCard from "./EditCustomCard";
import axios from "axios";
import { showSuccessToast } from "@/helpers/toast";
import { setCustomExperienceArray } from "@/store/resumeSlice";
import DeleteConfirmationModal from "@/components/common/ConfirmationModal";

const CustomCard = ({
  rec,
  isShowing = false, // not editing only showing for profileview page
  index,
  showButtons,
}: {
  rec: CustomEntry;
  isShowing?: boolean;
  index: number;
  showButtons?: boolean;
}) => {
  const [showMore, setShowMore] = useState(false);
  const [editCustom, setEditCustom] = useState<boolean>(false);
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.userData);
  const stepCustom = useSelector((state: any) => state.register.stepCustom);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const { entries } = stepCustom[index];
  const handleEdit = () => {
    setEditCustom(true);
  };
  const handleDelete = async () => {
    let updatedStepCustom = [...stepCustom];
    updatedStepCustom[index] = {
      ...updatedStepCustom[index],
      entries: entries.filter((entry: CustomEntry) => entry.id !== rec.id),
    };
    dispatch(setStepCustom(updatedStepCustom));
    dispatch(setCustomExperienceArray(updatedStepCustom));
    setEditCustom(false);
    const newUserData = { ...userData, customDetails: updatedStepCustom };
    dispatch(setUserData({ ...newUserData }));
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
  const handleOpenConfirmationModal = () => {
    setConfirmationModal(true);
  };
  return (
    <>
      <div
        className="w-full  rounded-lg shadow-md p-6 dark:border dark:border-[#2e2f45]"
        key={rec.id}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base dark:text-gray-100 text-gray-950 font-semibold w-[80%]">
            {rec.title || isShowing ? (
              rec.title
            ) : (
              <button
                onClick={(e) => handleEdit()}
                className="flex flex-row gap-1 my-2 font-semibold text-blue-600  hover:text-blue-900"
              >
                {plusSimpleIcon}
                Add title
              </button>
            )}
            {" in "}
          </h2>
          {!isShowing && showButtons && (
            <div className="space-x-2">
              <button
                className="text-blue-500 hover:text-blue-700"
                onClick={(e) => handleEdit()}
              >
                {EditIcon}
              </button>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={handleOpenConfirmationModal}
              >
                {deleteIcon}
              </button>
            </div>
          )}
        </div>
        <p className="text-md dark:text-gray-100 text-gray-950">
          {rec.country || isShowing ? (
            rec.country
          ) : (
            <button
              onClick={(e) => handleEdit()}
              className="flex flex-row gap-1 my-2 font-semibold text-blue-600  hover:text-blue-900"
            >
              {plusSimpleIcon}
              Add country
            </button>
          )}
        </p>
        {/* <h3 className="text-sm text-gray-600">Islamabad, Pakistan</h3> */}
        <h3 className="text-sm dark:text-gray-100 text-gray-950">
          {rec.cityState || isShowing ? (
            rec.cityState
          ) : (
            <button
              onClick={(e) => handleEdit()}
              className="flex flex-row gap-1 my-2 font-semibold text-blue-600  hover:text-blue-900"
            >
              {plusSimpleIcon}
              Add city, state
            </button>
          )}
        </h3>
        <p className="text-sm dark:text-gray-300 text-gray-950">
          {rec.fromMonth || isShowing ? (
            rec.fromMonth
          ) : (
            <button
              onClick={(e) => handleEdit()}
              className="flex flex-row gap-1 my-2 font-semibold text-blue-600  hover:text-blue-900"
            >
              {plusSimpleIcon}
              Add Month
            </button>
          )}{" "}
          {rec.fromYear || isShowing ? (
            rec.fromYear
          ) : (
            <button
              onClick={(e) => handleEdit()}
              className="flex flex-row gap-1 my-2 font-semibold text-blue-600  hover:text-blue-900"
            >
              {plusSimpleIcon}
              Add From Year
            </button>
          )}{" "}
          to{" "}
          {rec.isContinue ? (
            "Present"
          ) : (
            <>
              {rec.toMonth || isShowing ? (
                rec.toMonth
              ) : (
                <button
                  onClick={(e) => handleEdit()}
                  className="flex flex-row gap-1 my-2 font-semibold text-blue-600  hover:text-blue-900"
                >
                  {plusSimpleIcon}
                  Add To Month
                </button>
              )}{" "}
              {rec.toYear || isShowing ? (
                rec.toYear
              ) : (
                <button
                  onClick={(e) => handleEdit()}
                  className="flex flex-row gap-1 my-2 font-semibold text-blue-600  hover:text-blue-900"
                >
                  {plusSimpleIcon}
                  Add To Year
                </button>
              )}
            </>
          )}
        </p>
        <p className="text-md dark:text-gray-100 text-gray-950">
          {rec.description || isShowing ? (
            <>
              <span>
                {showMore ? rec.description : rec?.description?.slice(0, 50)}
              </span>
              <button
                className="ml-1 lowercase text-white/40 text-xs"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? "<< Show Less" : "Show More >>"}
              </button>
            </>
          ) : (
            <button
              onClick={(e) => handleEdit()}
              className="flex flex-row gap-1 my-2 font-semibold text-blue-600  hover:text-blue-900"
            >
              {plusSimpleIcon}
              Add Description
            </button>
          )}
        </p>
      </div>
      {editCustom && (
        <EditCustomCard setEditCustom={setEditCustom} rec={rec} index={index} />
      )}
      {confirmationModal && (
        <DeleteConfirmationModal
          message="Are you sure you want to delete ?"
          onConfirm={() => handleDelete()}
          onCancel={() => setConfirmationModal(false)}
        />
      )}
    </>
  );
};
export default CustomCard;
