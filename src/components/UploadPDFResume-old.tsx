"use client";

import { useEffect, useState } from "react";

const UploadPDFResume = ({
  setUploadedFileName,
}: {
  setUploadedFileName: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [fileUploading, setFileUploading] = useState<boolean>(false);
  const [file, setFile] = useState<any>(null);
  const [fileError, setFileError] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string>("");
  const [fileIsValid, setFileIsValid] = useState<boolean>(false);

  const uploadToServer = async () => {
    setFileError("");
    setFileUploading(true);
    if (file && fileIsValid) {
      const body = new FormData();
      body.append("file", file);
      fetch("/api/fileUpload", {
        method: "POST",
        body,
      })
        .then(async (resp: any) => {
          const res = await resp.json();
          if (res.success) {
            setUploadedFileName(res.fileName + "_" + file.name);
            setSuccessMsg("File has been uploaded please click on Next");
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

  useEffect(() => {
    if (file && file.type !== "application/pdf") {
      setFileIsValid(false);
      setFileError("only PDF file is allowed");
    } else {
      setFileIsValid(true);
      setFileError("");
    }
  }, [file]);

  return (
    <>
      <h2 className="text-2xl ">Upload your Resume (PDF only) </h2>
      {/* Upload PDF Card */}

      <div className="border p-4 mt-6">
        <label className="font-bold">Choose File</label>
        <br />
        <input
          type="file"
          id="url_input"
          className={`form-control ${fileError !== "" && "is-invalid"}`}
          onChange={(e: any) => {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
          }}
        />
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

      <div className="row">
        <button
          type="button"
          disabled={!file || fileUploading || !fileIsValid}
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2  disabled:bg-gray-300 mt-4"
          onClick={(e) => uploadToServer()}
        >
          {fileUploading ? "Uploading...." : "Upload"}
        </button>
      </div>
      {/* Upload PDF Card */}
    </>
  );
};

export default UploadPDFResume;
