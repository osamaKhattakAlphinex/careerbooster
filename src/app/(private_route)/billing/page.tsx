"use client";

import { getFormattedDate } from "@/helpers/getFormattedDateTime";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [billing, setBilling] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

  const fetchBillingRecord = async () => {
    setLoading(true);
    if (!loading) {
      try {
        const _billing = await axios.get("/api/billing");
        if (_billing.data.success) {
          setBilling(_billing.data.billingDetail);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    fetchBillingRecord();
  }, []);

  if (loading) return <span>Loading...</span>;
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
                <span>{billing.firstName}</span>
              </div>
            </div>
            <div className=" flex flex-row  justify-between items-center">
              <div className="flex-1">
                <strong>LastName</strong>
              </div>
              <div className="flex-1">
                <span>{billing.lastName}</span>
              </div>
            </div>
            <div className=" flex flex-row  justify-between items-center">
              <div className="flex-1">
                <strong>Email</strong>
              </div>
              <div className="flex-1">
                <span>{billing.email}</span>
              </div>
            </div>
            <div className=" flex flex-row  justify-between items-center">
              <div className="flex-1">
                <strong>Status</strong>
              </div>
              <div className="flex-1">
                <span
                  className={`${
                    billing.status ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {billing.status ? "Active" : "In-Active"}
                </span>
              </div>
            </div>
            <div className=" flex flex-row  justify-between items-center">
              <div className="flex-1">
                <strong>Expiration Date</strong>
              </div>
              <div className="flex-1">
                <span>
                  {getFormattedDate(billing.userPackageExpirationDate)}
                </span>
              </div>
            </div>
            <div className=" flex flex-row  justify-between items-center">
              <div className="flex-1">
                <strong>Package Name</strong>
              </div>
              <div className="flex-1">
                <span>{billing.package?.title}</span>
              </div>
            </div>
            <div className=" flex flex-row  justify-between items-center">
              <div className="flex-1">
                <strong>Package Type</strong>
              </div>
              <div className="flex-1">
                <span>{billing.package?.type}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Page;
