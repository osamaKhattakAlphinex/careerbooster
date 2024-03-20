/* eslint-disable react/display-name */
"use client";

import { updateUserCreditsByAdmin } from "@/helpers/updateUserCreditsByAdmin";
import axios from "axios";
import { useFormik } from "formik";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import * as Yup from "yup";

const CreditsUpdationModal = forwardRef((props: any, ref: any) => {
  const [openCreditsUpdationModal, setOpenCreditsUpdationModal] =
    useState<boolean>(false);
  const [user, setUser] = useState<any>([]);

  const openModal = (open: boolean) => {
    setOpenCreditsUpdationModal(open);
  };

  const formik = useFormik({
    initialValues: {
      credits: 0,
    },

    onSubmit: async (values) => {
      setOpenCreditsUpdationModal(false);

      try {
        await fetch("/api/users/updateCredits", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            credits: values.credits,
          }),
        });
      } catch (error) {
        console.log(error);
      } finally {
        props.callback();
      }
    },

    validationSchema: Yup.object().shape({
      credits: Yup.number()
        .required("Credits are required")
        .min(0, "Credits cannot be negative"),
    }),
  });

  useImperativeHandle(ref, () => ({
    openModal,
    setUser,
  }));

  return (
    <div
      tabIndex={-1}
      aria-hidden="true"
      className={`overflow-y-auto overflow-x-hidden bg-white/50 fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${
        openCreditsUpdationModal ? "flex" : "hidden"
      }`}
    >
      <div className="relative w-full max-w-xl max-h-full p-4">
        <div className="relative p-4 text-center rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <h1 className="text-2xl font-bold text-white">Enter Credits Modal</h1>
          <div className="absolute top-2.5 right-2.5">
            <button
              onClick={() => openModal(false)}
              type="button"
              className="text-gray-400  bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col items-start justify-start gap-4 p-2"
          >
            <div className="grid w-full grid-cols-4 gap-6">
              <label
                className="block col-span-2 text-left"
                htmlFor="total-credits"
              >
                Total Credits
              </label>
              <input
                id="total-credits"
                className="block w-full col-span-2 p-1"
                type="number"
                value={user.totalCredits}
                disabled
              />
            </div>

            <div className="grid w-full grid-cols-4 gap-6">
              <label
                className="block col-span-2 text-left"
                htmlFor="remaining-credits"
              >
                Remaining Credits
              </label>
              <input
                id="remaining-credits"
                className="block w-full col-span-2 p-1"
                type="number"
                value={user.userCredits}
                disabled
              />
            </div>
            <div className="grid w-full grid-cols-4 gap-6">
              <label className="block col-span-2 text-left" htmlFor="credits">
                Enter credits to be added
              </label>
              <input
                id="credits"
                className="block w-full col-span-2 p-1"
                type="number"
                value={formik.values.credits}
                onChange={formik.handleChange}
              />
            </div>
            <div className="grid w-full grid-cols-4 gap-6">
              <div className="col-span-2 "></div>
              <div className="flex items-center justify-between col-span-2 space-x-4 ">
                <button
                  type="button"
                  onClick={() => setOpenCreditsUpdationModal(false)}
                  className="p-2 text-sm text-white bg-green-600 border-[1.5px] rounded"
                >
                  No, cancel
                </button>
                <button
                  type="submit"
                  className="p-2 text-sm text-white bg-blue-600 border-[1.5px] rounded"
                >
                  Update Credits
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
});

export default CreditsUpdationModal;
