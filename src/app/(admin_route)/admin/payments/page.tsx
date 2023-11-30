"use client";
import FineTuningSettingModel from "@/components/admin/fineTuning/fineTuningSettingModels";
import PaymentsDecryptionModal from "@/components/admin/payments/paymentsDecryptionModal";
import { getFormattedDate } from "@/helpers/getFormattedDateTime";
import { leftArrowIcon } from "@/helpers/iconsProvider";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

const Payments = () => {
  const [payments, setPayments] = useState<[] | any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const showTransactionModelRef: React.MutableRefObject<any> = useRef(null);

  const fetchmodels = async () => {
    setLoading(true);
    if (!loading) {
      axios
        .get("/api/payment", {})
        .then((res: any) => {
          if (res.data.success) {
            const payments = res.data.payments;
            setPayments(payments);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    fetchmodels();
  }, []);

  return (
    <>
      <PaymentsDecryptionModal ref={showTransactionModelRef} />

      <div className="pt-30">
        <div className="my-5 ml-10">
          <Link
            href="/admin"
            className="flex flex-row gap-2 items-center hover:font-semibold transition-all"
          >
            {leftArrowIcon}
            Dashboard
          </Link>
        </div>

        <div className="flex flex-col gap-2 items-center justify-center">
          <div className="flex md:flex-row flex-col gap-2 mx-auto sm:w-full px-12 justify-end">
            <button
              onClick={() => {
                if (showTransactionModelRef.current) {
                  showTransactionModelRef.current.openModal(true);
                }
              }}
              className="bg-gray-900 text-white rounded-lg px-6 py-4 hover:bg-gray-800"
            >
              <div className="flex flex-row gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>

                <span>View Transaction</span>
              </div>
            </button>
          </div>
          <div className=" p-8 flex flex-col gap-2 border w-11/12">
            {/* Table */}
            <div className="">
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        S.No
                      </th>
                      <th scope="col" className="px-6 py-3">
                        userEmail
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        amountPaid
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        PackageId
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading && (
                      <tr>
                        <td
                          className="text-center p-6 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                          colSpan={10}
                        >
                          Loading ...
                        </td>
                      </tr>
                    )}
                    {!loading && payments && payments.length === 0 && (
                      <tr>
                        <td
                          className="text-center p-6 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                          colSpan={10}
                        >
                          No models found
                        </td>
                      </tr>
                    )}
                    {payments &&
                      payments.map((rec: any, index: number) => (
                        <tr
                          key={rec._id}
                          className="bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {rec.userEmail}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {rec.amountPaid}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            PackageId
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payments;
