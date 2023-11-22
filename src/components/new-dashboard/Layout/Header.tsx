"use client";
import { bellIcon, sunIcon } from "@/helpers/iconsProvider";

import { useState } from "react";
import Modal from "@/components/Modal";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <nav className="fixed py-[14px]  px-4 left-0 sm:left-60 right-0 z-[1000] bg-zinc-900">
      <div className="w-full rounded-lg flex justify-between sm:justify-between items-center">
        <h1 className="rounded-[14px] text-[14px] text-neutral-400 font-bold uppercase">
          Dashboard
        </h1>
        <div className="flex">
          <button
            onClick={() => setIsModalOpen(true)}
            className=" text-white flex justify-center mr-3 items-center bg-zinc-900 border-zinc-800 w-[40px] h-[40px] rounded-full capitalize"
          >
            {bellIcon}
          </button>
          <button className=" text-white flex justify-center mr-1 items-center bg-zinc-900 border-zinc-800 w-[40px] h-[40px] rounded-full capitalize">
            {sunIcon}
          </button>
        </div>
      </div>

      {/* Render the Modal component */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </nav>
  );
};

export default Header;
