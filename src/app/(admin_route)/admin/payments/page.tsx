"use client";
import DataTable from "@/components/DataTable";
import FineTuningSettingModel from "@/components/admin/fineTuning/fineTuningSettingModels";
import PaymentsDecryptionModal from "@/components/admin/payments/paymentsDecryptionModal";
import { getFormattedDate } from "@/helpers/getFormattedDateTime";
import { leftArrowIcon } from "@/helpers/iconsProvider";
import { createColumnHelper } from "@tanstack/react-table";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

type Payment = {
  userEmail: string;
  amountPaid: string;
};

const Payments = () => {
  const [payments, setPayments] = useState<[] | any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const showTransactionModelRef: React.MutableRefObject<any> = useRef(null);
  const [isDecrypted, setIsDecrypted] = useState<boolean>(false);

  const columnHelper = createColumnHelper<Payment>();

  const columns = [
    columnHelper.accessor("userEmail", {
      header: () => "Email",
      cell: (info) => (
        <div className="truncate max-w-sm">{info.renderValue()}</div>
      ),
    }),
    columnHelper.accessor("amountPaid", {
      header: () => "Amount",
      cell: (info) => info.renderValue(),
    }),
  ];

  const fetchPayments = async () => {
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

  const handleDecryption = async (values: any) => {
    try {
      axios
        .post("/api/payment/decrypt", {
          decryptionKey: values.decryptionKey,
        })
        .then((resp: any) => {
          if (resp.data.success) {
            setPayments(resp.data.payments);
            setIsDecrypted(true);
          }
        });
    } catch {}
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <>
      <PaymentsDecryptionModal
        ref={showTransactionModelRef}
        formHandler={handleDecryption}
      />

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
            {isDecrypted ? (
              <button
                onClick={() => {
                  fetchPayments();
                  setIsDecrypted(false);
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

                  <span>Encrypt Transaction</span>
                </div>
              </button>
            ) : (
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
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>

                  <span>View Transaction</span>
                </div>
              </button>
            )}
          </div>
          <div className="flex flex-col gap-2  w-11/12">
            {/* Table */}
            <DataTable
              loading={loading}
              columns={columns}
              data={payments}
              source="payments"
              actions={[]}
              conditionalTableAction={[]}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Payments;
