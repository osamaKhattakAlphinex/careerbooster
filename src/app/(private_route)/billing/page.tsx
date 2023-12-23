"use client";
import { getFormattedDate } from "@/helpers/getFormattedDateTime";
import {useSelector } from "react-redux";
const Page = () => {
   const  userData = useSelector((state: any) => state.userData)
  if (userData?.userPackageData === "") return <span>Loading...</span>;
  else
    return (
      <div className=" ml-[234px] p-10 ">
        <div className=" flex flex-col gap-4">
          <h2 className=" text-xl font-bold">Billing Details</h2>
          <div className="flex flex-col gap-2">
            <div className=" flex flex-row justify-between items-center">
              <div className="flex-1">
                <strong>FirstName</strong>
              </div>
              <div className="flex-1">
                <span>{userData.firstName}</span>
              </div>
            </div>
            <div className=" flex flex-row  justify-between items-center">
              <div className="flex-1">
                <strong>LastName</strong>
              </div>
              <div className="flex-1">
                <span>{userData?.lastName}</span>
              </div>
            </div>
            <div className=" flex flex-row  justify-between items-center">
              <div className="flex-1">
                <strong>Email</strong>
              </div>
              <div className="flex-1">
                <span>{userData?.email}</span>
              </div>
            </div>
            <div className=" flex flex-row  justify-between items-center">
              <div className="flex-1">
                <strong>Status</strong>
              </div>
              <div className="flex-1">
                <span
                  className={`${
                    userData?.userPackageData?.status ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {userData?.userPackageData?.status ? "Active" : "In-Active"}
                </span>
              </div>
            </div>
            <div className=" flex flex-row  justify-between items-center">
              <div className="flex-1">
                <strong>Expiration Date</strong>
              </div>
              <div className="flex-1">
                <span>
                  {getFormattedDate(userData?.userPackageExpirationDate)}
                </span>
              </div>
            </div>
            <div className=" flex flex-row  justify-between items-center">
              <div className="flex-1">
                <strong>Package Name</strong>
              </div>
              <div className="flex-1">
                <span>{userData?.userPackageData?.title}</span>
              </div>
            </div>
            <div className=" flex flex-row  justify-between items-center">
              <div className="flex-1">
                <strong>Package Type</strong>
              </div>
              <div className="flex-1">
                <span>{userData?.userPackageData?.type}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Page;
