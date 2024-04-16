"use client";
import Loader from "@/components/common/Loader";
import EditableField from "@/components/dashboard/EditableField";
import Toolbar from "@/components/dashboard/Toolbar";
import useUpdateAndSave from "@/hooks/useUpdateAndSave";
import React, { useState } from "react";
import useGetSummary from "@/hooks/useGetSummary";
import { resumeSummaryIcon } from "@/helpers/iconsProvider";

type Props = {
  heading: any;
  summary: any;
};

const Summary = ({ summary, heading }: Props) => {
  const { updateSaveHook } = useUpdateAndSave();
  const [streamedSummaryData, setStreamedSummaryData] = useState("");
  const { getSummary } = useGetSummary(setStreamedSummaryData);

  return (
    <>
      <h2 className="flex items-center gap-2 text-base font-semibold uppercase border-2 border-transparent hover:border-dashed hover:border-gray-500 ">
        {resumeSummaryIcon}
        <EditableField
          value={heading?.summary ? heading.summary : "Execuitve summary"}
          style={{ width: "fit-content" }}
          onSave={(value: string) => {
            if (value !== heading?.summary) {
              updateSaveHook.updateAndSaveHeadings({
                summary: value,
              });
            }
          }}
        />
      </h2>

      <Toolbar regenrateSummary={getSummary}>
        <div className="text-xs text-justify border-2 border-transparent hover:shadow-md hover:border-gray-500 hover:border-dashed ">
          <EditableField
            type="textarea"
            value={
              summary !== "" ? (
                summary
              ) : streamedSummaryData ? (
                streamedSummaryData
              ) : (
                <div className="text-center">
                  <div role="status">
                    <Loader />
                  </div>
                </div>
              )
            }
            onSave={(value: string) => {
              updateSaveHook.updateAndSaveSummary(value);
            }}
          />
        </div>
      </Toolbar>
    </>
  );
};

export default Summary;
