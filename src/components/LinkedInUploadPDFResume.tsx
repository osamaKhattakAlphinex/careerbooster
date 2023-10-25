"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUploadedFileName } from "@/store/resumeSlice";
import { useSession } from "next-auth/react";
// import { slugify } from "@/helpers/slugify";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { refreshIconRotating, uploadIcon } from "@/helpers/iconsProvider";
import Button from "./utilities/form-elements/Button";

const LinkedInUploadPDFResume = () => {
  const router = useRouter();
  // local states
  const [msgLoading, setMsgLoading] = useState<boolean>(false); // msg loading
  const [fileUploading, setFileUploading] = useState<boolean>(false);
  const [file, setFile] = useState<any>(null);
  const [fileName, setFileName] = useState<any>(null);
  const [fileError, setFileError] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string>("");
  const [streamedData, setStreamedData] = useState("");
  const [streamedDataAbout, setStreamedDataAbout] = useState("");

  // Redux
  const dispatch = useDispatch();

  const uploadFileToServer = async () => {
    setFileError("");
    setFileUploading(true);
    if (file) {
      const body = new FormData();
      body.append("file", file);

      fetch("/api/fileUpload?type=linkedin-tool", {
        method: "POST",
        body,
      })
        .then(async (resp: any) => {
          const res = await resp.json();
          if (res.success) {
            const uploadedFileName = res.fileName + "_" + file.name;
            setFileName(uploadedFileName);
            // router.replace("/welcome?step=1");
            // router.replace("/register");
            // setSuccessMsg("File has been uploaded!");
          } else {
            setFileError("Something went wrong");
          }
        })
        .catch((error) => {
          setFileError("Something went wrong");
        })
        .finally(() => {
          setFileUploading(false);
        });
    }
  };

  const linkedinResumeData = async (fileName: string) => {
    setStreamedData("");
    setStreamedDataAbout("");
    setFileError("");
    setMsgLoading(true);
    if (fileName) {
      fetch("/api/linkedInBots/linkedinHeadlineGenerator", {
        method: "POST",
        body: JSON.stringify({ fileName }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (resp: any) => {
          const res = await resp.json();
          if (res.data) {
            setStreamedData(res.data);
          } else {
            setFileError("Something went wrong");
          }
        })
        .catch((error) => {
          setFileError("Something went wrong");
        });

      fetch("/api/linkedInBots/linkedinAboutGenerator", {
        method: "POST",
        body: JSON.stringify({ fileName }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (resp: any) => {
          const res = await resp.json();
          if (res.data && res.success) {
            setStreamedDataAbout(res.data);
          } else {
            setFileError("Something went wrong");
          }
        })
        .catch((error) => {
          setFileError("Something went wrong");
        })
        .finally(() => {
          setMsgLoading(false);
        });
    } else if (!fileName) {
      setFileError("PDF Resume / CV is Required");
      setMsgLoading(false);
    }
  };

  // check file is correct
  useEffect(() => {
    if (file && file.type === "application/pdf") {
      //  file exists and is PDF
      setFileError("");
      // upload it to server
      uploadFileToServer();
    } else if (file) {
      // if file exists but not PDf
      setFileError("only PDF file is allowed");
    }
  }, [file]);
  return (
    <>
      <label
        className="btn btn-lg  btn-gradient-1"
        data-aos="fade-up-sm"
        data-aos-delay="200"
      >
        <input
          type="file"
          className="hidden"
          disabled={fileUploading}
          onChange={(e) => {
            if (e.target.files) {
              setFile(e.target.files[0]);
            }
          }}
        />
        {fileUploading ? (
          refreshIconRotating
        ) : (
          <div className="flex gap-2 ">
            <div>{uploadIcon}</div>
            <div>
              <p className="m-0 text-sm [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">
                Upload PDF Resume
              </p>
            </div>
          </div>
        )}
      </label>

      {successMsg && (
        <div
          className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 my-2 !text-left w-[50%] m-auto"
          role="alert"
        >
          <p className="m-0">{successMsg}</p>
        </div>
      )}

      {fileError && (
        <div
          className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 my-2 !text-left w-[50%] m-auto"
          role="alert"
        >
          <p className="m-0">{fileError}</p>
        </div>
      )}

      {streamedData && (
        <div className=" my-3 w-full flex flex-col border border-gray-200 rounded-lg shadow sm:p-6 ">
          <div className="rounded p-4">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                AI LinkedIn Tool
              </span>
            </h1>
            <div className="font-sans whitespace-pre-wrap break-words">
              {streamedData}
            </div>
          </div>
          <div className="rounded p-4">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                About
              </span>
            </h1>
            <div className="font-sans whitespace-pre-wrap break-words">
              {streamedDataAbout}
            </div>
          </div>
        </div>
      )}

      <Button
        type="button"
        className="btn mt-3 theme-outline-btn"
        onClick={() => linkedinResumeData(fileName)}
      >
        <div className="flex flex-row gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={`w-4 h-4 ${msgLoading ? "animate-spin" : ""}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
          <span>Regenerate</span>
        </div>
      </Button>
    </>
  );
};

export default LinkedInUploadPDFResume;
