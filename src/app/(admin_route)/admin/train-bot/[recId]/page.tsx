"use client";
import { getFormattedDate } from "@/helpers/getFormattedDateTime";
import {
  checkIconSmall,
  exterLinkIconSmall,
  infoSmallIcon,
  leftArrowIcon,
} from "@/helpers/iconsProvider";
import axios from "axios";
import Link from "next/link";

import { useEffect, useState } from "react";

const ReviewTrainBotRecord = ({ params }: { params: { recId: string } }) => {
  const [rec, setRec] = useState({} as any);
  const [idealOutput, setIdealOutput] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchRecord = async () => {
    if (!loading) {
      setLoading(true);
      // fetch record
      const rec = await axios.get(`/api/trainBot/${params.recId}`);
      if (rec?.data?.data) {
        setRec(rec.data.data);
        setLoading(false);
      }
    }
    // set record
  };

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
        .put(`/api/trainBot/${params.recId}`, {
          idealOutput,
          status: "reviewed",
        })
        .finally(() => {
          setSaving(false);
        });

      // Fetch pending records again
      axios
        .get("/api/trainBot", {
          params: {
            status: "pending",
          },
        })
        .then((res: any) => {
          if (res.data.success) {
            const result = res.data;
            if (result.data.length > 0 && typeof window !== "undefined") {
              const firstPendingRecord = result.data[0];
              window.location.href = `/admin/train-bot/${firstPendingRecord._id}`;
            }
          }
        });

      if (record?.data?.data) {
        setRec(record.data.data);
      }
    }
  };

  // on first load fetch record
  useEffect(() => {
    fetchRecord();
  }, []);

  // when record is fetch set ideal output
  useEffect(() => {
    if (rec?.output) {
      const text = rec.idealOutput !== "" ? rec.idealOutput : rec.output;
      // const formattedOutput = JSON.stringify(JSON.parse(text), null, 2);
      setIdealOutput(text);
    }
  }, [rec]);

  return (
    <div className="pt-30">
      <div className="my-5 ml-10">
        <Link
          href="/admin/train-bot"
          className="flex flex-row gap-2 items-center hover:font-semibold transition-all"
        >
          {leftArrowIcon}
          View All
        </Link>
      </div>

      <div className=" p-8">
        <div className="flex justify-between">
          <div className="flex flex-col gap-0">
            <p>Generated on: {getFormattedDate(rec.createdAt)}</p>
            <p>User Email: {rec.userEmail}</p>
            <p className="flex gap-1">
              File:
              <a
                href={`/files/userResumes/${rec.userEmail}/${rec.fileAddress}`}
                className="text-sm cursor-pointer flex gap-1 hover:font-bold"
                target="_blank"
              >
                {rec.fileAddress} {exterLinkIconSmall}
              </a>
            </p>
            <p>
              Status:{" "}
              {rec.status === "pending" && (
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                  Pending
                </span>
              )}
              {rec.status === "reviewed" && (
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Reviewed
                </span>
              )}
              {rec.status === "trained" && (
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                  Trained
                </span>
              )}
            </p>
            <div
              className="flex p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
              role="alert"
            >
              {infoSmallIcon}
              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium">
                  {rec.Instructions || "No instructions provided"}
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
        <div className="flex flex-row gap-4  justify-center">
          {/* Card */}
          <div className="w-1/2 border rounded-md text-gray-800 dark:text-gray-100 p-4">
            {rec && rec.input && (
              <span
                dangerouslySetInnerHTML={{
                  __html: rec.input.replaceAll("\n", "<br />"),
                }}
              ></span>
            )}
          </div>
          <div className="w-1/2 border rounded-lg text-gray-800 dark:text-gray-100 p-4">
            {/* <span dangerouslySetInnerHTML={{ __html: rec.output }}></span> */}
            <textarea
              name="idealOutput"
              className="w-full h-full bg-transparent tracking-widest font-sans "
              onChange={(e: any) => setIdealOutput(e.target.value)}
              value={idealOutput}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewTrainBotRecord;
