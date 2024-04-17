"use client";
import EditableField from "@/components/dashboard/EditableField";
import useUpdateAndSave from "@/hooks/useUpdateAndSave";
import React from "react";

type Props = {
  name: string;
  jobTitle: string;
  fullNameStyle: string;
  jobTitleStyle: string;
};

const Header = ({ name, jobTitle, fullNameStyle, jobTitleStyle }: Props) => {
  const { updateSaveHook } = useUpdateAndSave();

  return (
    <>
      <h2 className={`${fullNameStyle}`}>
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
      <h3 className={`${jobTitleStyle}`}>
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
