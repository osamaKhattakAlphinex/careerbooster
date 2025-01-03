"use client";

import { getFormattedDate } from "@/helpers/getFormattedDateTime";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUserData } from "@/store/userDataSlice";

import { newViewIcon, trashIcon } from "@/helpers/iconsProvider";
import { useRouter, usePathname } from "next/navigation";
import {
  resetConsultingBid,
  setConsultingBid,
} from "@/store/consultingBidSlice";
import { RootState } from "@/store/store";

type ConsultingBidType = {
  card?: any;
  componentRef?: any;
  source?: string;
};

const ConsultingBidCardSingle = ({
  card,
  componentRef,
  source,
}: ConsultingBidType) => {
  // redux
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.userData);
  const router = useRouter();
  const handleOnView = async (card: any) => {
    if (source != "") {
      router.replace("/consulting-bids-bot");
    }
    return dispatch(setConsultingBid(card));
  };

  const handleOnDelete = async (card: any) => {
    const c = confirm("Are you sure you want to delete this Consulting Bid?");
    if (c) {
      try {
        await axios.delete(`/api/consultingBidBot/${card.id}`);
        dispatch(resetConsultingBid());
        // updated cover letters
        const updatedConsultingBids = userData.consultingBids.filter(
          (consultingBid: any) => consultingBid.id !== card.id
        );

        const updatedObject = {
          ...userData,
          consultingBids: updatedConsultingBids,
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
      <div className="flex flex-col dark:bg-[#222027] dark:text-gray-50 bg-[#ffffff94]  rounded-xl mt-[20px] py-[20px] px-[14px] ">
        <div className="">
          <div className="mx-3 border-gray-600 leading-6 w-full">
            <h2
              title={card.jobDescription}
              className="w-full pr-3 truncate md:text-[15px] text-[13px] capitalize dark:text-gray-100 text-gray-950  font-semibold  "
            >
              {card.jobDescription}
              {/* {card.jobDescription.length < 20
                ? card.jobDescription
                : card.jobDescription.slice(0, 20) + "..."} */}
            </h2>
            <h4 className="uppercase text-[#959595]  font-medium  lg:text-[12px] text-[10px] pt-[8px] pb-[12px]">
              Generated on {getFormattedDate(card.generatedOnDate)}
            </h4>
          </div>
        </div>
        <div className="flex gap-3 ">
          <button
            type="button"
            onClick={() => handleOnView(card)}
            className="flex px-2 text-[16px] dark:hover:border-[#5f5f5f] dark:hover:bg-gray-700 dark:hover:text-white justify-center dark:text-gray-100 text-[#27272a] items-center rounded-full h-[36px] dark:bg-[#18181b] hover:!bg-[#00000015] dark:border-2 border-[1px] dark:border-[#27272a] bg-transparent border-[#27272a] dark:focus:border-[#5f5f5f] hover:border-[#00000015] focus:bg-[#00000015] focus:border-[#00000015] "
          >
            {newViewIcon}
            <span className="text-[13px] mx-2">View</span>
          </button>
          <button
            type="button"
            onClick={() => handleOnDelete(card)}
            className="flex px-2 text-[16px] dark:hover:border-[#5f5f5f] dark:hover:bg-gray-700 dark:hover:text-white justify-center dark:text-gray-100 text-[#27272a] items-center rounded-full h-[36px] dark:bg-[#18181b] hover:!bg-[#00000015] dark:border-2 border-[1px] dark:border-[#27272a] bg-transparent border-[#27272a] dark:focus:border-[#5f5f5f] hover:border-[#00000015] focus:bg-[#00000015] focus:border-[#00000015]"
          >
            {trashIcon}
            <span className="text-[13px] mx-2">Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsultingBidCardSingle;
