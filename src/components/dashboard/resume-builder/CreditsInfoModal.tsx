/* eslint-disable react/display-name */
"use client";
import { BlobLike } from "openai/uploads.mjs";
import { forwardRef, useImperativeHandle, useState } from "react";

type ModalProps = {
  handleGenerate: (quantifyingExperience: boolean) => void;
};

const CreditInfoModal = forwardRef(
  ({ handleGenerate }: ModalProps, ref: any) => {
    const [openCreditInfoModal, setOpenCreditInfoFineTuneModal] =
      useState<boolean>(false);
    const [quantifyingExperience, setQuantifyingExperience] =
      useState<boolean>(true);

    const openModal = (open: boolean, quantifyingExp: boolean) => {
      setOpenCreditInfoFineTuneModal(open);
      setQuantifyingExperience(quantifyingExp);
    };

    useImperativeHandle(ref, () => ({
      openModal,
    }));

    const handleOk = () => {
      handleGenerate(quantifyingExperience);
      setOpenCreditInfoFineTuneModal(false);
    };

    return (
      <div
        tabIndex={-1}
        aria-hidden="true"
        className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center  items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${
          openCreditInfoModal ? "flex" : "hidden"
        }`}
      >
        <div className="relative p-4 w-full max-w-xl max-h-full dark:bg-gray-800">
          <div className="relative p-4 text-center rounded-lg shadow sm:p-5">
            <h1 className="text-2xl font-bold text-white">
              Credits Usage Info
            </h1>

            <button
              onClick={() => setOpenCreditInfoFineTuneModal(false)}
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
          </div>

          <button onClick={handleOk}>Yes</button>
          <button
            onClick={() => {
              setOpenCreditInfoFineTuneModal(false);
            }}
          >
            No
          </button>
        </div>
      </div>
    );
  }
);

export default CreditInfoModal;
