"use client";

import { getFormattedDate } from "@/helpers/getFormattedDateTime";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUserData } from "@/store/userDataSlice";

import { newViewIcon, trashIcon } from "@/helpers/iconsProvider";
import { useRouter, usePathname } from "next/navigation";

import {
  resetLinkedInAbout,
  setLinkedInAbout,
} from "@/store/linkedInAboutSlice";
import { useState } from "react";
import DeleteConfirmationModal from "@/components/common/ConfirmationModal";
import { showErrorToast, showSuccessToast } from "@/helpers/toast";
import { RootState } from "@/store/store";

type LinkedInAboutType = {
  card?: any;
  componentRef?: any;
  source?: string;
};

const LinkedInAboutCardSingle = ({
  card,
  componentRef,
  source,
}: LinkedInAboutType) => {
  // redux
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.userData);
  const router = useRouter();
  const [deleting, setDeleting] = useState<boolean>(false);

  const handleOnView = async (card: any) => {
    if (source != "") {
      router.replace("/linkedin-optimizer/about");
    }
    return dispatch(setLinkedInAbout(card));
  };
  const [confirmationModal, setConfirmationModal] = useState(false);
  const handleOnDelete = async (card: any) => {
    setConfirmationModal(false);
    setDeleting(true);

    try {
      await axios
        .delete(`/api/linkedInBots/linkedinAboutGenerator/${card.id}`)
        .then((res) => {
          if (res.data.success) {
            showSuccessToast("About deleted Successfully");
          } else {
            showErrorToast("Something went wrong");
          }
        });
      dispatch(resetLinkedInAbout());
      // updated cover letters
      const updatedAbouts = userData.linkedInAbouts.filter(
        (about: any) => about.id !== card.id
      );

      const updatedObject = {
        ...userData,
        linkedInAbouts: updatedAbouts,
      };

      dispatch(setUserData({ ...userData, ...updatedObject }));
    } catch (error) {
      console.log(error);
    } finally {
      setDeleting(false);
    }
  };
  const handleOpenConfirmationModal = () => {
    setConfirmationModal(true);
  };
  if (!card) return <h1>Loading </h1>;

  return (
    <div className="flex flex-col   dark:bg-[#222027] dark:text-gray-50 bg-[#ffffff94] text-gray-950 rounded-xl mt-[20px] py-[20px] px-[14px] ">
      <div className="">
        <div className="w-full mx-3 leading-6 border-gray-600">
          <h2
            title={card.aboutText}
            className="w-full pr-3 truncate lg:text-[15px] text-[13px] capitalize dark:text-gray-100 text-gray-950 font-semibold  "
          >
            {/* {card.jobDescription} */}
            {card.aboutText.length < 20
              ? card.aboutText
              : card.aboutText.slice(0, 20) + "..."}
          </h2>
          <h4
            title="Created On"
            className="uppercase text-[#959595] font-medium flex gap-2 flex-row justify-start items-center  lg:text-[12px] text-[10px] pt-[8px] pb-[12px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path d="M5.75 7.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM5 10.25a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0ZM10.25 7.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM7.25 8.25a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0ZM8 9.5A.75.75 0 1 0 8 11a.75.75 0 0 0 0-1.5Z" />
              <path
                fillRule="evenodd"
                d="M4.75 1a.75.75 0 0 0-.75.75V3a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2V1.75a.75.75 0 0 0-1.5 0V3h-5V1.75A.75.75 0 0 0 4.75 1ZM3.5 7a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v4.5a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1V7Z"
                clipRule="evenodd"
              />
            </svg>{" "}
            {getFormattedDate(card.generatedOnDate)}
          </h4>
        </div>
      </div>
      <div className="flex justify-between gap-3 mx-3 ">
        <button
          type="button"
          onClick={() => handleOnView(card)}
          className="flex flex-1 px-2 text-[16px] dark:hover:border-[#5f5f5f] dark:hover:bg-gray-700 dark:hover:text-white justify-center dark:text-gray-100 text-[#27272a] items-center rounded-lg h-[36px] dark:bg-[#18181b] hover:!bg-[#00000015] dark:border-2 border-[1px] dark:border-[#27272a] bg-transparent border-[#27272a] dark:focus:border-[#5f5f5f] hover:border-[#00000015] focus:bg-[#00000015] focus:border-[#00000015]"
        >
          {newViewIcon}
          <span className="text-[13px] mx-2">View</span>
        </button>
        <button
          disabled={deleting}
          type="button"
          onClick={handleOpenConfirmationModal}
          className="flex px-2 flex-1 dark:hover:bg-rose-700 dark:hover:border-[#5f5f5f] dark:hover:text-white text-[#27272a]  justify-center items-center rounded-lg h-[36px] dark:bg-rose-500 dark:border-2 border-[1px] dark:border-[#27272a]  dark:text-gray-100 hover:border-[#00000015] bg-transparent border-[#27272a] dark:focus:border-[#5f5f5f]"
        >
          {trashIcon}
          <span className="text-[13px] mx-2">
            {deleting ? "Deleting..." : "Delete"}
          </span>
        </button>
      </div>
      {confirmationModal && (
        <DeleteConfirmationModal
          message="Are you sure you want to delete ?"
          onConfirm={() => handleOnDelete(card)}
          onCancel={() => setConfirmationModal(false)}
        />
      )}
    </div>
  );
};

export default LinkedInAboutCardSingle;
