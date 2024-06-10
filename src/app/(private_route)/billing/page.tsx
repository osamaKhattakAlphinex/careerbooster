"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const Page = () => {
  const userData = useSelector((state: any) => state.userData);
  const [remainingCredits, setRemainingCredits] = useState<number | null>(null);
  const [totalCredits, setTotalCredits] = useState<number | null>(null);
  const [creditsData, setCreditsData] = useState<any>(null);
  const getCredits = async () => {
    const response = await axios.get(`/api/users/getOneByEmail?email=${userData.email}`);
    if (response.data.success) {
      setRemainingCredits(response.data.userCredits);
      setTotalCredits(response.data.totalCredits);
    }
    const creditPackageDetails = await axios.get(
      `/api/users/getCreditPackageDetails?id=${userData.creditPackage}`
    );
    if (creditPackageDetails.data.success) {
      setCreditsData(creditPackageDetails.data.result);
    }
  };

  useEffect(() => {
    getCredits();
  }, [userData]);
  return (
    <div className=" md:ml-[234px] md:p-10 p-3 ml-0">
      <div className="p-4 bg-gray-100 dark:bg-[#18181B] rounded-md">
        <div className="flex flex-col divide-y-[1px] gap-3 divide-gray-400">
          {/* Heading */}
          <div>
            <h1 className="text-lg font-bold text-center text-gray-600 dark:text-gray-400 md:text-xl">
              Billing Details
            </h1>
          </div>
          {/* user data */}
          <div className="p-3 space-y-2">
            <div className="flex flex-col items-start justify-start">
              <h3 className="text-xs text-gray-500 uppercase dark:text-gray-300 md:text-sm">
                Name
              </h3>
              <span className="text-sm font-bold text-gray-500 dark:text-gray-400 md:text-lg ">{`${userData.firstName} ${userData?.lastName}`}</span>
            </div>
            <div>
              <h3 className="text-xs text-gray-500 uppercase dark:text-gray-300 md:text-sm">
                Email
              </h3>
              <span className="text-sm font-bold text-gray-500 dark:text-gray-400 md:text-lg">
                {userData?.email}
              </span>
            </div>
          </div>
          {/* package data */}
          <div className="p-3 bg-slate-300 dark:bg-gray-800">
            <div className="flex flex-col items-center justify-center divide-y-[1px] divide-gray-400">
              <div className="flex flex-row items-center justify-between w-full py-1">
                <h3 className="text-xs text-gray-600 uppercase dark:text-gray-400 md:text-sm">
                  Package Category
                </h3>
                <span className="text-xs font-semibold text-gray-600 capitalize dark:text-gray-400 md:text-sm">
                  {creditsData?.category}
                </span>
              </div>
              <div className="flex flex-row items-center justify-between w-full py-1">
                <h3 className="text-xs text-gray-600 uppercase dark:text-gray-400 md:text-sm">
                  Status
                </h3>
                <span className="text-xs font-semibold text-gray-600 capitalize dark:text-gray-400 md:text-sm">
                  {creditsData?.status}
                </span>
              </div>
              <div className="flex flex-row items-center justify-between w-full py-1 ">
                <h3 className="text-xs text-gray-600 uppercase dark:text-gray-400 md:text-sm">
                  Total Credits
                </h3>
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 md:text-sm">
                  {totalCredits}
                </span>
              </div>
              <div className="flex flex-row items-center justify-between w-full py-1">
                <h3 className="text-xs text-gray-600 uppercase dark:text-gray-400 md:text-sm">
                  Remaining Credits
                </h3>
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 md:text-sm">
                  {remainingCredits}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
