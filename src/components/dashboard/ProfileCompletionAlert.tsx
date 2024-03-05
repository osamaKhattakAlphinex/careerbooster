"use client";
import { checkIcon } from "@/helpers/iconsProvider";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ProfileCompletionAlert = () => {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const params = useSearchParams();
  useEffect(() => {
    const success = params?.get("success");
    if (success) {
      setShowSuccessAlert(true);
    }
  }, [params]);
  const userData = useSelector((state: any) => state.userData);
  if (userData?.wizardReviewed && showSuccessAlert) {
    return (
      <div className="flex lg:flex-row flex-col justify-center mb-7 items-center bg-[#312E37] bg-opacity-[35%] w-full lg:h-[80px]  rounded-xl px-2 lg:py-[8px] py-[12px] pcursor-pointer">
        <div className="flex justify-center ">
          {checkIcon}
          <p className="text-gray-300 lg:text-[16px] text-[12px]">
            {" "}
            Your profile is completed now. You will get better results
          </p>
        </div>
      </div>
    );
  }
  if (!userData?.wizardReviewed) {
    return (
      <div className="flex lg:flex-row flex-col mt-2 justify-center mb-7 items-center  bg-gradient-to-r from-fuchsia-600 to-indigo-500 !text-gray-100  w-full lg:h-[56px]  rounded-xl px-2 lg:py-[4px] py-[6px] pcursor-pointer">
        <div className="flex justify-center items-center">
          <div className=" w-5 h-5 p-2 mr-3 text-stone-950 rounded-full bg-yellow-400 flex justify-center items-center font-extrabold lg:text-[14px] text-[12px]">
            !
          </div>
          <p className="text-gray-300 lg:text-[16px] text-[12px] mb-0">
            {" "}
            <span className=" text-white mr-2 font-bold lg:text-[14px] text-[12px] ">
              Important!
            </span>
            Complete your profile to get better results
          </p>
        </div>

        <Link
          className="bg-yellow-400 cursor-pointer ml-4 font-bold text-stone-950 no-underline rounded-full lg:px-[28px] px-[20px] lg:py-[7px] py-[5px] lg:text-[14px] text-[12px] mx-[13px] flex flex-col mt-[10px] lg:mt-[0px] hover:bg-yellow-500"
          href="/profile-review"
        >
          Complete now
        </Link>
      </div>
    );
  }
  return null;
};
export default ProfileCompletionAlert;
