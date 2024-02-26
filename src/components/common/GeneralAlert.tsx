/* eslint-disable react/display-name */
"use client";
import { forwardRef, useState } from "react";
import { useSelector } from "react-redux";

type ModalProps = {
  openModal?: boolean;
  deleteResume?: () => void;
  close?: () => void;
};

const GeneralAlert = forwardRef(
  ({ openModal, close, deleteResume }: ModalProps, ref: any) => {
    const creditLimits = useSelector((state: any) => state.creditLimits);

    return (
      <div
        //   tabIndex={-1}

        className={`fixed top-24 right-0 left-24 z-50 justify-center  items-center w-full h-52 ${
          true ? "flex" : "hidden"
        }`}
        onBlur={close}
      >
        <div className="relative w-full max-w-lg max-h-full p-4 bg-gray-300 rounded shadow-md dark:bg-gray-800">
          {/* <div className="relative p-4 text-center rounded-lg shadow sm:p-5"> */}
          <h1 className="text-lg font-bold text-center dark:text-white text-gray-950">
            {/* Credits Usage Info */}
            Are you sure you want to delete ?
          </h1>

          <button
            type="button"
            className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-toggle="deleteModal"
            onClick={close}
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

          <div className="flex flex-col items-center justify-center space-y-2 ">
            <div className="flex justify-end gap-4 mt-4">
              <button
                className="p-2 text-sm text-white bg-blue-600 rounded"
                onClick={deleteResume}
              >
                Yes
              </button>
              <button
                className="p-2 text-sm text-white bg-red-600 rounded"
                onClick={close}
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default GeneralAlert;
