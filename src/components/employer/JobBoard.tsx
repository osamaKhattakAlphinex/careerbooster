"use client";
import React, { useState } from "react";
import JobForm from "../deo/JobForm";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const EmployerJobBoard = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [currentRecord, setCurrentRecord] = useState<any>(null);
  const userData = useSelector((state: RootState) => state.userData);
  return (
    <>
      <div className="flex justify-between items-center">
        Job Board
        <button
          onClick={() => {
            setCurrentRecord(null);
            setOpen(true);
          }}
          className="px-4 py-2 ml-auto text-sm font-semibold text-gray-500 border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white w-fit"
        >
          Add New Job
        </button>
      </div>
      {open && (
        <JobForm
          setOpen={setOpen}
          deoId={userData._id}
          role={userData.role}
          singleRec={currentRecord}
        />
      )}
    </>
  );
};

export default EmployerJobBoard;
