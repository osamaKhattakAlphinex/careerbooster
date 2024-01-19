"use client";

import { getFormattedDate } from "@/helpers/getFormattedDateTime";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUserData } from "@/store/userDataSlice";

import { resetCoverLetter, setCoverLetter } from "@/store/coverLetterSlice";
import { eyeIcon, trashIcon } from "@/helpers/iconsProvider";

import { usePathname, useRouter } from "next/navigation";
import DownloadService from "@/helpers/downloadFile";

type CoverLetterType = {
  card?: any;
  componentRef?: any;
  source?: string;
};

const CoverLetterCardSingle = ({
  card,
  componentRef,
  source,
}: CoverLetterType) => {
  // redux
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.userData);
  const router = useRouter();
  const pathname: any = usePathname();
  const handleOnView = async (card: any) => {
    if (source !== "") {
      router.replace("/cover-letter-generator");
    }
    return dispatch(setCoverLetter(card));
  };

  const handleOnDelete = async (card: any) => {
    const c = confirm("Are you sure you want to delete this Cover Letter?");

    if (c) {
      try {
        await axios.delete(`/api/coverLetterBot/${card.id}`);
        dispatch(resetCoverLetter());
        // updated cover letters
        const updatedCoverLetters = userData.coverLetters.filter(
          (letter: any) => letter.id !== card.id
        );

        const updatedObject = {
          ...userData,
          coverLetters: updatedCoverLetters,
        };

        dispatch(setUserData({ ...userData, ...updatedObject }));
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (!card) return <h1>Loading </h1>;

  return (
    <div>
      <div className="flex flex-col dark:bg-[#222027] dark:text-gray-50 bg-[#ffffff94] text-gray-950 bg rounded-xl mt-[20px] py-[20px] px-[14px] ">
        <div className="">
          <div className="mx-3 border-gray-600 leading-6 w-full">
            <h2
              title={card.jobDescription}
              className="w-full pr-3 truncate lg:text-[15px] text-[13px] capitalize dark:text-gray-100 text-gray-950 font-semibold  "
            >
              {card.jobDescription}
              {/* {card.jobDescription.length < 20
                ? card.jobDescription
                : card.jobDescription.slice(0, 20) + "..."} */}
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
            className="flex px-2 justify-center items-center rounded-full h-[36px] dark:bg-[#18181b] dark:border-2 border-[1px] dark:border-[#27272a] bg-transparent border-[#22c55e]"
          >
            {/* <Image src={PencilLine} alt="Image Not Found" /> */}
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
            className="flex px-2 justify-center items-center rounded-full h-[36px] dark:bg-[#18181b] dark:border-2 border-[1px] dark:border-[#27272a] bg-transparent border-[#22c55e]"
          >
            {trashIcon}
            {pathname == "/dashboard" ? (
              <span className="text-[13px] mx-2 text-neutral-400">Delete</span>
            ) : (
              ""
            )}
          </button>
          {pathname == "/dashboard"
            ? ""
            : card && (
              <DownloadService
                componentRef={componentRef}
                view={handleOnView}
                card={card}
                type="coverLetter"
                fileName="ai-cover-letter"
              />
            )}
        </div>
      </div>
    </div>
  );
};

export default CoverLetterCardSingle;
