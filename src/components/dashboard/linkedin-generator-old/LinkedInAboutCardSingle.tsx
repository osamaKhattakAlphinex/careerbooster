"use client";

import { getFormattedDate } from "@/helpers/getFormattedDateTime";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUserData } from "@/store/userDataSlice";

import { eyeIcon, trashIcon } from "@/helpers/iconsProvider";
import { useRouter, usePathname } from "next/navigation";

import {
  resetLinkedInAbout,
  setLinkedInAbout,
} from "@/store/linkedInAboutSlice";
import { useState } from "react";
import DeleteConfirmationModal from "@/components/common/ConfirmationModal";
import { showErrorToast, showSuccessToast } from "@/helpers/toast";

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
  const userData = useSelector((state: any) => state.userData);
  const router = useRouter();
  const pathname: any = usePathname();
  const handleOnView = async (card: any) => {
    if (source != "") {
      router.replace("/linkedin-generator/about");
    }
    console.log("card", card);
    return dispatch(setLinkedInAbout(card));
  };
  const [confirmationModal, setConfirmationModal] = useState(false);
  const handleOnDelete = async (card: any) => {
    setConfirmationModal(false);
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
    }
  };
  const handleOpenConfirmationModal = () => {
    setConfirmationModal(true);
  };
  if (!card) return <h1>Loading </h1>;

  return (
    <div className="flex flex-col   dark:bg-[#222027] dark:text-gray-50 bg-[#ffffff94] text-gray-950 rounded-xl mt-[20px] py-[20px] px-[14px] ">
      <div className="">
        <div className="mx-3 border-gray-600 leading-6 w-full">
          <h2
            title={card.aboutText}
            className="w-full pr-3 truncate lg:text-[15px] text-[13px] capitalize dark:text-gray-100 text-gray-950 font-semibold  "
          >
            {/* {card.jobDescription} */}
            {card.aboutText.length < 20
              ? card.aboutText
              : card.aboutText.slice(0, 20) + "..."}
          </h2>
          <h4 className="uppercase text-[#959595] font-medium  lg:text-[12px] text-[10px] pt-[8px] pb-[12px]">
            Generated on {getFormattedDate(card.generatedOnDate)}
          </h4>
        </div>
      </div>
      <div className="flex gap-3 ">
        <button
          type="button"
          onClick={() => handleOnView(card)}
          className="px-2 flex justify-center items-center rounded-full h-[36px] dark:bg-[#18181b] dark:border-2 border-[1px] dark:border-[#27272a] bg-transparent border-[#22c55e]"
        >
          {eyeIcon}
          {pathname == "/dashboard" ? (
            <span className="text-[13px] mx-2 text-neutral-400">View</span>
          ) : (
            ""
          )}
        </button>
        <button
          type="button"
          onClick={handleOpenConfirmationModal}
          className="px-2 flex justify-center items-center rounded-full h-[36px] dark:bg-[#18181b] dark:border-2 border-[1px] dark:border-[#27272a] bg-transparent border-[#22c55e]"
        >
          {trashIcon}
          {pathname == "/dashboard" ? (
            <span className="text-[13px] mx-2 text-neutral-400">Delete</span>
          ) : (
            ""
          )}
        </button>
      </div>
      {confirmationModal && (
        <DeleteConfirmationModal
          message="Are you sure you want to delete ?"
          onConfirm={() => handleOnDelete(card)}
        />
      )}
    </div>
  );
};

export default LinkedInAboutCardSingle;
