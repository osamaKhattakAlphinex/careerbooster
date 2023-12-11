/* eslint-disable react/display-name */
"use client";

import { useFormik } from "formik";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import * as Yup from "yup";

type PaymentsDecryptionModalType = {
  formHandler: (e: any) => {} | void;
};

const PaymentsDecryptionModal = forwardRef(
  (props: PaymentsDecryptionModalType, ref: any) => {
    const [openPaymentsDecryptionModal, setOpenPaymentsDecryptionModal] =
      useState<boolean>(false);

    const openModal = (open: boolean) => {
      setOpenPaymentsDecryptionModal(open);
    };

    const formik = useFormik({
      initialValues: {
        decryptionKey: "",
      },

      onSubmit: (values) => {
        console.log(values);
        props.formHandler(values);
        setOpenPaymentsDecryptionModal(false);
      },

      validationSchema: Yup.object().shape({
        decryptionKey: Yup.string().required(
          "Please Enter Your Secret Key to decrypt the transactions"
        ),
      }),
    });

    useImperativeHandle(ref, () => ({
      openModal,
    }));

    return (
      <div
        tabIndex={-1}
        aria-hidden="true"
        className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${
          openPaymentsDecryptionModal ? "flex" : "hidden"
        }`}
      >
        <div className="relative p-4 w-full max-w-xl max-h-full">
          <div className="relative p-4 text-center rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <h1 className="text-2xl font-bold text-white">Decryption Modal</h1>

            <button
              onClick={() => openModal(false)}
              type="button"
              className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="deleteModal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>

            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col justify-start items-start gap-4 p-2"
            >
              {/* decryptionKey */}
              <div className="grid grid-cols-3 gap-2 w-full">
                <label className="col-span-1 text-left">Enter Secret Key</label>
                <input
                  className="px-4 col-span-2 w-full"
                  type="password"
                  name="decryptionKey"
                  value={formik.values.decryptionKey}
                  onChange={formik.handleChange}
                />
              </div>
              {formik.touched.decryptionKey && formik.errors.decryptionKey && (
                <p className="text-rose-600 pt-3 text-center  self-center">
                  Error*: {formik.errors.decryptionKey}
                </p>
              )}

              <div className="grid place-content-center w-full">
                <div className="space-x-2">
                  <button
                    type="button"
                    onClick={() => setOpenPaymentsDecryptionModal(false)}
                    className="py-2 px-3 text-sm font-medium text-gray-500 rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  >
                    No, cancel
                  </button>
                  <button
                    type="submit"
                    className="py-2 px-3 text-sm font-medium text-gray-500 rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  >
                    Decypt Transactions
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
);

export default PaymentsDecryptionModal;
