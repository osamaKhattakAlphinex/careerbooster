"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUploadedFileName } from "@/store/resumeSlice";
import { slugify } from "@/helpers/slugify";
import { useRouter } from "next/navigation";

const UploadPDFResume = () => {
  const router = useRouter();
  // local states
  const [fileUploading, setFileUploading] = useState<boolean>(false);
  const [file, setFile] = useState<any>(null);
  const [fileError, setFileError] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string>("");

  // Redux
  const dispatch = useDispatch();

  const uploadFileToServer = async () => {
    setFileError("");
    setFileUploading(true);
    if (file) {
      const body = new FormData();
      body.append("file", file);
      fetch("/api/fileUpload", {
        method: "POST",
        body,
      })
        .then(async (resp: any) => {
          const res = await resp.json();
          if (res.success) {
            const uploadedFileName = res.fileName + "_" + file.name;
            dispatch(setUploadedFileName(uploadedFileName));
            fetchRegistrationDataFromResume(uploadedFileName);
            // setSuccessMsg("File has been uploaded!");
          } else {
            setFileError("Something went wrong");
          }
        })
        .catch((error) => {
          setFileError("Something went wrong");
        });
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

  const fetchRegistrationDataFromResume = (uploadedFileName: string) => {
    if (uploadedFileName) {
      const formData = {
        type: "basicInfo",
        file: uploadedFileName,
      };

      fetch("/api/homepage/fetchRegistrationData", {
        method: "POST",
        body: JSON.stringify(formData),
      })
        .then(async (resp: any) => {
          const res = await resp.json();

          if (res.success) {
            if (res?.data?.text) {
              const userData = JSON.parse(res?.data?.text);
              router.replace(
                `/register?firstName=${slugify(
                  userData.firstName
                )}&lastName=${slugify(userData.lastName)}&email=${
                  userData.email
                }&file=${uploadedFileName}`
              );
            }
          }
        })
        .finally(() => {
          setFileUploading(false);
        });
    }
  };

  return (
    <>
      <div className="flex  items-center justify-center mt-4">
        <label
          // className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded cursor-pointer disabled:bg-blue-300 ${
          //   fileUploading && "!bg-blue-300"
          // }`}

          className={`bg-purple-600 text-white rounded-full relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max cursor-pointer ${
            fileUploading && "!bg-purple-300"
          }
          `}
        >
          {fileUploading ? "Uploading..." : "Upload Resume (PDF)"}
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
        </label>
      </div>

      {fileError && (
        <div
          className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 my-2"
          role="alert"
        >
          <p className="font-bold">Error</p>
          <p>{fileError}</p>
        </div>
      )}
      {successMsg && (
        <div
          className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 my-2"
          role="alert"
        >
          <p className="font-bold">Success</p>
          <p>{successMsg}</p>
        </div>
      )}
      {/* Upload PDF Card */}
    </>
  );
};

export default UploadPDFResume;
