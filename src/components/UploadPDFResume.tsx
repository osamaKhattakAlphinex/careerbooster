"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUploadedFileName } from "@/store/resumeSlice";

const UploadPDFResume = () => {
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
            setSuccessMsg("File has been uploaded!");
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
      <p className="mt-4">Upload your resume to get started</p>

      <div className="flex items-center justify-center mt-4">
        <label
          className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded cursor-pointer disabled:bg-blue-300 ${
            fileUploading && "!bg-blue-300"
          }`}>
          Upload File
          <input
            type="file"
            className="hidden"
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
          role="alert">
          <p className="font-bold">Error</p>
          <p>{fileError}</p>
        </div>
      )}
      {successMsg && (
        <div
          className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 my-2"
          role="alert">
          <p className="font-bold">Success</p>
          <p>{successMsg}</p>
        </div>
      )}
      {fileUploading && <p>Uploading...</p>}
      {/* Upload PDF Card */}
    </>
  );
};

export default UploadPDFResume;
