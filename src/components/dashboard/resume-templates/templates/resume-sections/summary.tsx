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
  headingStyle: string;
  textStyle: string;
  customStyle?: any;
};

const Summary = ({
  summary,
  heading,
  headingStyle,
  textStyle,

  customStyle,
}: Props) => {
  const { updateSaveHook } = useUpdateAndSave();
  const [streamedSummaryData, setStreamedSummaryData] = useState("");
  const { getSummary } = useGetSummary(setStreamedSummaryData);

  return (
    <>
      <span
        className={` ${
          customStyle.borderTopBottom ? "!block" : "hidden"
        }  border-stylee w-full h-0 border-[1px] mt-6 !border-gray-900`}
      ></span>
      <h2
        className={`${headingStyle} ${
          customStyle.centerHeading ? "justify-center" : "justify-left"
        } `}
      >
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
      <span
        className={` ${
          customStyle.borderTopBottom ? "!block" : "hidden"
        }  border-stylee w-full h-0 border-[1px] !border-gray-900 mb-3`}
      ></span>
      <Toolbar regenrateSummary={getSummary}>
        <div className={`${textStyle}`}>
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
