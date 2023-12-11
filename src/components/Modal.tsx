import { crossIcon } from "@/helpers/iconsProvider";
import React from "react";
import Notifications from "./Notifications";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed right-10 top-14 z-50 boverflow-auto bg-[#18181B]  w-1/4 rounded-md">
      <div className=" w-full  mx-auto p-4  rounded-lg shadow-lg">
        <div className="text-right">
          {/* <button
            className="text-gray-600 hover:text-gray-800"
            onClick={onClose}
          >
            {crossIcon}
          </button> */}
        </div>
        <div className="mt-4">
          {/* <h1 className="text-2xl font-semibold">Modal Title</h1>
          <p className="mt-2">Modal content goes here.</p> */}
          <Notifications />
        </div>
        {/* <div className="mt-6 text-right">
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            onClick={onClose}
          >
            Close
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Modal;
