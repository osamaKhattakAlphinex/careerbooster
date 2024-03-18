"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const Page = () => {
  const userData = useSelector((state: any) => state.userData);
  const [remainingCredits, setRemainingCredits] = useState<number | null>(null);
  const [totalCredits, setTotalCredits] = useState<number | null>(null);
  const [creditsData, setCreditsData] = useState<any>(null);
  const getCredits = async () => {
    const res: any = await fetch(
      `/api/users/getOneByEmail?email=${userData.email}`
    );
    const response = await res.json();
    if (response.success) {
      setRemainingCredits(response.result.userCredits);
      setTotalCredits(response.result.totalCredits);
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
    <div className=" md:ml-[234px] md:p-10 p-3 ml-0">
      <div className="flex flex-col gap-2 ">
        <h2 className="text-lg font-bold md:text-xl dark:text-gray-100 text-gray-950 ">
          Billing Details
        </h2>
        <div className="flex flex-col gap-1">
          <div className="flex flex-row items-center justify-between ">
            <div className="flex-1 dark:text-gray-100 text-gray-950 ">
              <strong className="text-sm font-semibold md:text-lg">
                FirstName
              </strong>
            </div>
            <div className="flex-1 dark:text-gray-100 text-gray-950">
              <span className="text-sm md:text-base">{userData.firstName}</span>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between ">
            <div className="flex-1 dark:text-gray-100 text-gray-950 ">
              <strong className="text-sm font-semibold md:text-lg">
                LastName
              </strong>
            </div>
            <div className="flex-1 dark:text-gray-100 text-gray-950">
              <span className="text-sm md:text-base">{userData?.lastName}</span>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between ">
            <div className="flex-1 dark:text-gray-100 text-gray-950">
              <strong className="text-sm font-semibold md:text-lg">
                Email
              </strong>
            </div>
            <div className="flex-1 dark:text-gray-100 text-gray-950">
              <span className="text-sm md:text-base">{userData?.email}</span>
            </div>
          </div>
          {creditsData && (
            <>
              <div className="flex flex-row items-center justify-between ">
                <div className="flex-1 dark:text-gray-100 text-gray-950">
                  <strong className="text-sm font-semibold md:text-lg">
                    Amount
                  </strong>
                </div>
                <div className="flex-1 dark:text-gray-100 text-gray-950">
                  <span className="text-sm md:text-base">
                    $ {creditsData?.amount}{" "}
                  </span>
                </div>
              </div>
              <div className="flex flex-row items-center justify-between ">
                <div className="flex-1 dark:text-gray-100 text-gray-950">
                  <strong className="text-sm font-semibold md:text-lg">
                    Status
                  </strong>
                </div>
                <div className="flex-1 dark:text-gray-100 text-gray-950">
                  <span
                    className={` className="text-sm md:text-base" ${
                      creditsData?.status ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {creditsData?.status ? "Active" : "In-Active"}
                  </span>
                </div>
              </div>

              <div className="flex flex-row items-center justify-between ">
                <div className="flex-1 dark:text-gray-100 text-gray-950">
                  <strong className="text-sm font-semibold md:text-lg">
                    Package Category
                  </strong>
                </div>
                <div className="flex-1 dark:text-gray-100 text-gray-950">
                  <span className="text-sm md:text-base">
                    {creditsData?.category}
                  </span>
                </div>
              </div>
              <div className="flex flex-row items-center justify-between ">
                <div className="flex-1 dark:text-gray-100 text-gray-950">
                  <strong className="text-sm font-semibold md:text-lg">
                    Total Credits
                  </strong>
                </div>
                <div className="flex-1 dark:text-gray-100 text-gray-950">
                  <span className="text-sm md:text-base">{totalCredits}</span>
                </div>
              </div>
              <div className="flex flex-row items-center justify-between ">
                <div className="flex-1 dark:text-gray-100 text-gray-950">
                  <strong className="text-sm font-semibold md:text-lg">
                    Remaining Credits
                  </strong>
                </div>
                <div className="flex-1 dark:text-gray-100 text-gray-950">
                  <span className="text-sm md:text-base">
                    {remainingCredits}
                  </span>
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
