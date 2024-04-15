"use client";
import EditableField from "@/components/dashboard/EditableField";
import useUpdateAndSave from "@/hooks/useUpdateAndSave";
import React from "react";

type Props = {
  name: string;
  jobTitle: string;
};

const Header = ({ name, jobTitle }: Props) => {
  const { updateSaveHook } = useUpdateAndSave();

  return (
    <>
      <h2 className="text-4xl font-bold border-2 border-transparent xs:text-2xl md:4xl lg:text-4xl hover:shadow-md hover:bg-gray-100 hover:border-dashed hover:border-gray-500 ">
        <EditableField
          value={name ? name : "FULL NAME"}
          style={{ width: "fit-content" }}
          onSave={(value: string) => {
            if (value !== name) {
              updateSaveHook.updateAndSaveName(value);
            }
          }}
        />
      </h2>
      <h3 className="text-lg border-2 border-transparent xs:text-xs md:text-2xl lg:text-2xl hover:shadow-md hover:bg-gray-100 hover:border-dashed hover:border-gray-500 ">
        <EditableField
          value={jobTitle ? jobTitle : "JOB TITLE"}
          onSave={(value: string) => {
            if (value !== jobTitle) {
              updateSaveHook.updateAndSaveJobTitle(value);
            }
          }}
        />
      </h3>
    </>
  );
};

export default Header;
