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
        <div className="text-right"></div>
        <div className="mt-4">
          <Notifications />
        </div>
      </div>
    </div>
  );
};

export default Modal;
