/* eslint-disable react/display-name */
"use client";
import { forwardRef, useImperativeHandle, useState } from "react";
import { useSelector } from "react-redux";

type ModalProps = {
  handleGenerate: (quantifyingExperience: boolean) => void;
};

const CreditInfoModal = forwardRef(
  ({ handleGenerate }: ModalProps, ref: any) => {
    const [openCreditInfoModal, setOpenCreditInfoModal] =
      useState<boolean>(false);
    const [quantifyingExperience, setQuantifyingExperience] =
      useState<boolean>(true);

    const openModal = (open: boolean, quantifyingExp: boolean) => {
      setOpenCreditInfoModal(open);
      setQuantifyingExperience(quantifyingExp);
    };

    useImperativeHandle(ref, () => ({
      openModal,
    }));

    const handleOk = () => {
      handleGenerate(quantifyingExperience);
      setOpenCreditInfoModal(false);
    };

    const creditLimits = useSelector((state: any) => state.creditLimits);

    return (
      <div
        tabIndex={-1}
        aria-hidden="true"
        className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center  items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${
          openCreditInfoModal ? "flex" : "hidden"
        }`}
      >
        <div className="rounded relative p-8 w-full max-w-xl max-h-full shadow-md dark:bg-gray-800 bg-gray-300">
          {/* <div className="relative p-4 text-center rounded-lg shadow sm:p-5"> */}
          <h1 className="text-xl font-bold dark:text-white text-center text-gray-950">
            Credits Usage Info
          </h1>

          <button
            onClick={() => setOpenCreditInfoModal(false)}
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
          {/* </div> */}

          <ul className=" list-decimal px-4 py-6">
            <li className=" py-1 px-3 text-sm">
              You will be cost <strong>{creditLimits.resume_basicInfo}</strong>{" "}
              credits for Basic Info and Job Title Generation.
            </li>
            <li className=" py-1 px-3 text-sm">
              You will be cost <strong>{creditLimits.resume_skills}</strong>{" "}
              credits for Skills Generation.
            </li>
            <li className=" py-1 px-3 text-sm">
              You will be cost{" "}
              <strong>{creditLimits.resume_summary_generation}</strong> credits
              for Summary Generation.
            </li>
            <li className="py-1 px-3 text-sm">
              You will be cost{" "}
              <strong>{creditLimits.resume_individualWorkExperience}</strong>{" "}
              credits for Individual Work Experience.
            </li>
          </ul>
          <div className=" flex flex-col justify-center items-center space-y-2">
            <div className="w-full text-center">
              <strong>Are you sure you want to continue?</strong>
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={handleOk}
                className="bg-blue-600 p-2 rounded text-sm  text-white"
              >
                Yes, Continue
              </button>
              <button
                className="bg-red-600 p-2 rounded text-sm  text-white"
                onClick={() => {
                  setOpenCreditInfoModal(false);
                }}
              >
                No, Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default CreditInfoModal;
