/* eslint-disable react/display-name */
"use client";

import { MessageViewerRef } from "@/app/(admin_route)/admin/contacts/page";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import * as Yup from "yup";

type MessageViewerType = {
  message: string;
};

const MessageViewer = forwardRef<MessageViewerRef,MessageViewerType>((props, ref) => { 
  const [mesageViewer, setMesageViewer] = useState<boolean>(false);

  const openModal = (open: boolean) => {
    setMesageViewer(open);
  };

  useImperativeHandle(ref, () => ({
    openModal,
  }));

  return (
    <div
      tabIndex={-1}
      aria-hidden="true"
      className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${
        mesageViewer ? "flex" : "hidden"
      }`}
    >
      <div className="relative p-4 w-full max-w-xl max-h-full">
        <div className="relative p-4 text-center rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <h1 className="text-2xl font-bold text-white">Sender Message</h1>

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
          <div>
            <p>{props.message}</p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default MessageViewer;
