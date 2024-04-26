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

  styles: any;
};

const Summary = ({
  summary,
  heading,

  styles,
}: Props) => {
  const { updateSaveHook } = useUpdateAndSave();
  const [streamedSummaryData, setStreamedSummaryData] = useState("");
  const { getSummary } = useGetSummary(setStreamedSummaryData);

  return (
    <>
      <h2 className={`${styles?.summary_heading}`}>
        {resumeSummaryIcon}
        <EditableField
          value={heading?.summary ? heading.summary : "Execuitve summary"}
          style={{ width: "fit-content " }}
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
        <div className={`${styles?.summary_text}`}>
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
