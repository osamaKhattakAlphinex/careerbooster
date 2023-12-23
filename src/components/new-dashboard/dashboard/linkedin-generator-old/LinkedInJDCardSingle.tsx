"use client";

import { getFormattedDate } from "@/helpers/getFormattedDateTime";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUserData } from "@/store/userDataSlice";

import { eyeIcon, trashIcon } from "@/helpers/iconsProvider";
import { useRouter, usePathname } from "next/navigation";

import {
  resetLinkedInJobDescription,
  setLinkedInJobDescription,
} from "@/store/linkedInJobDescriptionSlice";
import { htmlToPlainText } from "@/helpers/HtmlToPlainText";

type LinkedInHeadlineType = {
  card?: any;
  componentRef?: any;
  source?: string;
};

const LinkedInJDCardSingle = ({
  card,
  componentRef,
  source,
}: LinkedInHeadlineType) => {
  // redux
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.userData);

  const router = useRouter();
  const pathname: any = usePathname();
  const handleOnView = async (card: any) => {
    if (source != "") {
      router.replace("/linkedin-generator/job-description");
    }
    console.log("card", card);
    return dispatch(setLinkedInJobDescription(card));
  };

  const handleOnDelete = async (card: any) => {
    const c = confirm(
      "Are you sure you want to delete this Linked In Job Description?"
    );
    if (c) {
      try {
        await axios.delete(`/api/linkedInBots/jdGeneratorSingle/${card.id}`);
        dispatch(resetLinkedInJobDescription());
        // updated cover letters
        const updatedDescriptions = userData.linkedInJobDescriptions.filter(
          (jd: any) => jd.id !== card.id
        );

        const updatedObject = {
          ...userData,
          linkedInJobDescriptions: updatedDescriptions,
        };

        dispatch(setUserData({ ...userData, ...updatedObject }));
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (!card) return <h1>Loading </h1>;
  console.log(card);
  return (
    <div>
      <div className="flex flex-col   single-service-card-bg  rounded-xl mt-[20px] py-[20px] px-[14px] ">
        <div className="">
          <div className="mx-3 border-gray-600 leading-6 w-full">
            <h2
              title={card.jobDescription}
              className="w-full pr-3 truncate lg:text-[15px] text-[13px] capitalize card-h2 font-semibold  "
            >
              {htmlToPlainText(card.jobDescriptionText)}
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
            className="px-2 flex justify-center items-center rounded-full h-[36px] card-btn "
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
            onClick={() => handleOnDelete(card)}
            className="px-2 flex justify-center items-center rounded-full h-[36px] card-btn"
          >
            {trashIcon}
            {pathname == "/dashboard" ? (
              <span className="text-[13px] mx-2 text-neutral-400">Delete</span>
            ) : (
              ""
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LinkedInJDCardSingle;
