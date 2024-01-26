"use client";
import { getFormattedDate } from "@/helpers/getFormattedDateTime";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const Page = () => {
  const userData = useSelector((state: any) => state.userData);
  const [remainingCredits, setRemainingCredits] = useState<number | null>(null);
  const [creditsData, setCreditsData] = useState<any>(null);
  const getCredits = async () => {
    const res: any = await fetch(
      `/api/users/getOneByEmail?email=${userData.email}`
    );
    const response = await res.json();
    if (response.success) {
      setRemainingCredits(response.result.userCredits);
    }
    const creditPackageDetails = await fetch(
      `/api/users/getCreditPackageDetails?id=${userData.creditPackage}`
    );
    const creditPackage = await creditPackageDetails.json();
    if (creditPackage.success) {
      setCreditsData(creditPackage.result);
    }
  };
  useEffect(() => {
    getCredits();
  }, [userData]);
  return (
    <div className=" ml-[234px] p-10 ">
      <div className=" flex flex-col gap-4">
        <h2 className=" text-xl font-bold dark:text-gray-100 text-gray-950">
          Billing Details
        </h2>
        <div className="flex flex-col gap-2">
          <div className=" flex flex-row justify-between items-center">
            <div className="flex-1 dark:text-gray-100 text-gray-950">
              <strong>FirstName</strong>
            </div>
            <div className="flex-1 dark:text-gray-100 text-gray-950">
              <span>{userData.firstName}</span>
            </div>
          </div>
          <div className=" flex flex-row  justify-between items-center">
            <div className="flex-1 dark:text-gray-100 text-gray-950">
              <strong>LastName</strong>
            </div>
            <div className="flex-1 dark:text-gray-100 text-gray-950">
              <span>{userData?.lastName}</span>
            </div>
          </div>
          <div className=" flex flex-row  justify-between items-center">
            <div className="flex-1 dark:text-gray-100 text-gray-950">
              <strong>Email</strong>
            </div>
            <div className="flex-1 dark:text-gray-100 text-gray-950">
              <span>{userData?.email}</span>
            </div>
          </div>
          {creditsData && (
            <>
              <div className=" flex flex-row  justify-between items-center">
                <div className="flex-1 dark:text-gray-100 text-gray-950">
                  <strong>Amount</strong>
                </div>
                <div className="flex-1 dark:text-gray-100 text-gray-950">
                  <span>{creditsData?.amount} $</span>
                </div>
              </div>
              <div className=" flex flex-row  justify-between items-center">
                <div className="flex-1 dark:text-gray-100 text-gray-950">
                  <strong>Status</strong>
                </div>
                <div className="flex-1 dark:text-gray-100 text-gray-950">
                  <span
                    className={`${
                      creditsData?.status ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {creditsData?.status ? "Active" : "In-Active"}
                  </span>
                </div>
              </div>

              <div className=" flex flex-row  justify-between items-center">
                <div className="flex-1 dark:text-gray-100 text-gray-950">
                  <strong>Package Category</strong>
                </div>
                <div className="flex-1 dark:text-gray-100 text-gray-950">
                  <span>{creditsData?.category}</span>
                </div>
              </div>
              {/* <div className=" flex flex-row  justify-between items-center">
                <div className="flex-1 dark:text-gray-100 text-gray-950">
                  <strong>Total Credits</strong>
                </div>
                <div className="flex-1 dark:text-gray-100 text-gray-950">
                  <span>{creditsData?.totalCredits}</span>
                </div>
              </div> */}
              <div className=" flex flex-row  justify-between items-center">
                <div className="flex-1 dark:text-gray-100 text-gray-950">
                  <strong>Remaining Credits</strong>
                </div>
                <div className="flex-1 dark:text-gray-100 text-gray-950">
                  <span>{remainingCredits}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
