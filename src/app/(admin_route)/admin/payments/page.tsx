"use client";
import DataTable from "@/components/admin/DataTable";
import PaymentsDecryptionModal from "@/components/admin/payments/paymentsDecryptionModal";
import { getFormattedDate } from "@/helpers/getFormattedDateTime";
import { createColumnHelper } from "@tanstack/react-table";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

type Payment = {
  userEmail: string;
  amountPaid: string;
  createdAt: string;
};

const Payments = () => {
  const [payments, setPayments] = useState<[] | any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const showTransactionModelRef: React.MutableRefObject<any> = useRef(null);
  const [isDecrypted, setIsDecrypted] = useState<boolean>(false);

  const columnHelper = createColumnHelper<Payment>();

  const columns = [
    columnHelper.accessor("userEmail", {
      id: "userEmail",
      header: () => "Email",
      cell: (info) => (
        <div className="max-w-sm truncate">{info.renderValue()}</div>
      ),
    }),
    columnHelper.accessor("amountPaid", {
      id: "amountPaid",
      header: () => "Amount",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("createdAt", {
      id: "createdAt",
      header: () => "Date & Time",
      cell: (info) => getFormattedDate(info.renderValue()),
    }),
  ];

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/payment");
      if (response.data.success) {
        setPayments(response.data.payments);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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

      <div className="flex flex-col items-start justify-end">
        <h2 className="text-xl uppercase dark:text-white/70 text-black/70">
          Payments
        </h2>
        <span className="text-base dark:text-white/70 text-black/70">
          List of encrypted payments details you can decrypt them.
        </span>

        <div className="flex flex-row items-center justify-end w-full mt-4">
          {isDecrypted ? (
            <button
              onClick={() => {
                fetchPayments();
                setIsDecrypted(false);
              }}
              className="p-2 text-white bg-gray-900 rounded-lg hover:bg-gray-800"
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
              className="p-2 text-white bg-gray-900 rounded-lg hover:bg-gray-800"
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
        <div className="w-full mt-4 overflow-x-auto">
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
    </>
  );
};

export default Payments;
