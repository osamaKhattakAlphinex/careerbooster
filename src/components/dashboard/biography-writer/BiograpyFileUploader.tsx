"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUploadedFileName } from "@/store/resumeSlice";
import { useSession } from "next-auth/react";
// import { slugify } from "@/helpers/slugify";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { deleteIcon } from "@/helpers/iconsProvider";

interface Props {
  selectedFile: string;
  setSelectedFile: React.Dispatch<React.SetStateAction<string>>;
}
const BiograpyFileUploader = ({ selectedFile, setSelectedFile }: Props) => {
  //   const router = useRouter();
  // local states
  const [fileUploading, setFileUploading] = useState<boolean>(false);
  const [file, setFile] = useState<any>(null);
  const [fileError, setFileError] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string>("");
  const [loadingFiles, setLoadingFiles] = useState<boolean>(false);

  const [fileList, setFileList] = useState([]);

  // session
  const { data, status }: { data: any; status: any } = useSession();

  // Redux
  const dispatch = useDispatch();

  const uploadFileToServer = async () => {
    setFileError("");
    setFileUploading(true);
    if (file) {
      const body = new FormData();
      body.append("file", file);
      fetch("/api/fileUpload?type=biography", {
        method: "POST",
        body,
      })
        .then(async (resp: any) => {
          const res = await resp.json();
          if (res.success) {
            const uploadedFileName = res.fileName + "_" + file.name;
            setSuccessMsg("File has been uploaded!");
            setFileUploading(false);
            fetchFiles();
          } else {
            setFileError("Something went wrong");
          }
        })
        .catch((error) => {
          setFileError("Something went wrong");
        });
    }
  };

  const fetchFiles = async () => {
    setLoadingFiles(true);
    // Fetch the list of files from the API route
    fetch("/api/biographyBot/listFiles")
      .then((response) => response.json())
      .then((data) => {
        setLoadingFiles(false);
        setFileList(data.files);
      })
      .catch((error) => {
        console.error("Error fetching file list:", error);
      });
  };

  const handleDelete = async (file: string) => {
    const c = confirm("Are you sure you want to delete this File?");
    if (c) {
      try {
        const response = await fetch("/api/biographyBot/deleteFile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fileName: file }),
        });

        if (response.ok) {
          alert("File has bee deleted");
          fetchFiles();
        } else {
          const data = await response.json();
          alert("Error deleting file: " + data.error);
        }
      } catch (error) {
        alert("Error deleting file: " + error);
      }
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

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <>
      <div className="py-4 border-[1px] p-4 mb-4 rounded-lg">
        <label
          className={`bg-black text-white text-sm rounded-full relative flex py-2   items-center justify-center px-4 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max cursor-pointer ${fileUploading && "!bg-black"
            }
          `}
        >
          {fileUploading && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 mr-2 animate-spin"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          )}

          {fileUploading ? "Uploading..." : "Upload New File"}
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
        {loadingFiles ? (
          <p>Loading Files...</p>
        ) : (
          <>
            <h2 className="my-2 text-2xl font-semibold">Choose File to use</h2>
            <ul>
              {fileList &&
                fileList.map((file: string, i: number) => (
                  <li key={i}>
                    <input
                      id={`file_${i}`}
                      type="radio"
                      value={file}
                      checked={
                        selectedFile && selectedFile === file ? true : false
                      }
                      name="selectedFile"
                      onChange={(e) => setSelectedFile(e.target.value)}
                    />{" "}
                    <label htmlFor={`file_${i}`}>{file}</label>
                    <button
                      type="button"
                      className="mx-2  p-1  hover:bg-gray-200"
                      onClick={(e) => handleDelete(file)}
                    >
                      {deleteIcon}
                    </button>
                  </li>
                ))}
            </ul>
          </>
        )}
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
          <button type="button" onClick={() => setSuccessMsg("")}>
            [x]
          </button>
        </div>
      )}
      {/* Upload PDF Card */}
    </>
  );
};

export default BiograpyFileUploader;
