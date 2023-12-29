/* eslint-disable react/display-name */

"use client";

import { getFormattedDate } from "@/helpers/getFormattedDateTime";
import { checkIconSmall, infoSmallIcon } from "@/helpers/iconsProvider";
import axios from "axios";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

type Props = {
  refresh: () => any;
};

const SlidingPanel = forwardRef(({ refresh }: Props, ref: any) => {
  const [openTrainBotModal, setOpenTrainBotModal] = useState<boolean>(false);
  const [entry, setEntry] = useState<any>({});
  const [idealOutput, setIdealOutput] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);

  const openModal = (open: boolean, entry: any) => {
    setOpenTrainBotModal(open);
    setEntry(entry);
  };

  useImperativeHandle(ref, () => ({
    openModal,
  }));

  useEffect(() => {
    if (entry) {
      setIdealOutput(entry.output);
    }
  }, [entry]);

  const handleSave = async () => {
    if (!saving) {
      // try {
      //   JSON.parse(idealOutput);
      // } catch (err) {
      //   alert("Error: The output is not a valid JSON");
      //   return;
      // }

      setSaving(true);
      // Save Record

      const record: any = await axios
        .put(`/api/trainBot/${entry._id}`, {
          idealOutput,
          status: "reviewed",
        })
        .finally(() => {
          fetchRecord(entry._id);
          setSaving(false);
          refresh();
        });
    }
  };

  const fetchRecord = async (id: any) => {
    if (!loading) {
      setLoading(true);
      const rec = await axios.get(`/api/trainBot/${id}`);
      if (rec?.data?.data) {
        setEntry(rec.data.data);
        setLoading(false);
      }
    }
  };

  if (!entry) return <span> Loading</span>;

  return (
    <div
      tabIndex={-1}
      aria-hidden="true"
      className={`overflow-y-auto overflow-x-hidden justify-center items-center  fixed -right-1 z-50  w-3/3 md:inset-0 h-screen  bg-white/50 ${openTrainBotModal ? "flex" : "hidden"
        }`}
    >
      <div className="relative  w-[80%]  max-h-screen">
        <div className="relative p-4 text-center rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <button
            onClick={() => openModal(false, null)}
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
          <div className="flex flex-col justify-between">
            <h1 className="text-lg">Train Bot Entry Detail</h1>
            <div className=" flex flex-row justify-between items-end">
              <div className="flex flex-col justify-start items-start gap-0">
                <p>Generated on: {getFormattedDate(entry.createdAt)}</p>
                <p>User Email: {entry.userEmail}</p>
                <p>
                  Status:{" "}
                  {entry.status === "pending" && (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Pending
                    </span>
                  )}
                  {entry.status === "reviewed" && (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Reviewed
                    </span>
                  )}
                  {entry.status === "trained" && (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      Trained
                    </span>
                  )}
                </p>
                <div
                  className="flex text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
                  role="alert"
                >
                  {infoSmallIcon}
                  <span className="sr-only">Info</span>
                  <div>
                    <span className="font-medium">
                      {entry.Instructions || "No instructions provided"}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <button
                  disabled={saving}
                  onClick={handleSave}
                  className="btn btn-primary-dark !flex gap-2 mr-4 "
                >
                  {saving ? (
                    "Saving..."
                  ) : (
                    <>
                      {checkIconSmall}
                      Save
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 justify-start overflow-y-scroll h-[80%]">
            {/* Card */}
            <div className="col-span-1">
              <span>Input</span>
              <div className=" text-left border rounded-md text-gray-800 dark:text-gray-100 p-4 overflow-y-scroll">
                {entry && entry.input && (
                  // <span
                  //   dangerouslySetInnerHTML={{
                  //     __html: rec.input.replaceAll("\n", "<br />"),
                  //   }}
                  // ></span>
                  <span className=" whitespace-pre-wrap text-left">
                    {entry.input.replaceAll("\n", "").replaceAll(/"/g, " ")}
                  </span>
                )}
              </div>
            </div>

            <div>
              <span>Output</span>

              <div className="col-span-1 border rounded-lg text-gray-800 dark:text-gray-100 p-4">
                {/* <span dangerouslySetInnerHTML={{ __html: rec.output }}></span> */}
                <textarea
                  name="idealOutput"
                  rows={20}
                  className="  w-full  min-h-max bg-transparent tracking-widest font-sans "
                  onChange={(e: any) => setIdealOutput(e.target.value)}
                  value={idealOutput}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default SlidingPanel;
