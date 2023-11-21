"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { deleteIcon } from "@/helpers/iconsProvider";
import LimitCard from "../LimitCard";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "@/store/userDataSlice";
import FileUploadHandler from "@/components/FileUploadHandler";
import { makeid } from "@/helpers/makeid";

interface Props {
  selectedFile: string;
  setSelectedFile: React.Dispatch<React.SetStateAction<string>>;
}
const CoverLetterFileUploader = ({ selectedFile, setSelectedFile }: Props) => {
  //   const router = useRouter();
  // local states
  const [fileUploading, setFileUploading] = useState<boolean>(false);
  const [file, setFile] = useState<any>(null); // file to upload
  const [fileName, setFileName] = useState<string>(""); // file to upload
  const [fileError, setFileError] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string>("");
  const [loadingFiles, setLoadingFiles] = useState<boolean>(false);
  const [newFileText, setNewFileText] = useState<string>("");
  const [fileList, setFileList] = useState([]);
  const [availablePercentage, setAvailablePercentage] = useState<number>(0);
  const [percentageCalculated, setPercentageCalculated] =
    useState<boolean>(false);

  // session
  const { data }: { data: any } = useSession();

  // redux
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.userData);

  const updateLimits = async () => {
    fetch("/api/users/updateUserLimit", {
      method: "POST",
      body: JSON.stringify({
        email: data?.user?.email,
        type: "pdf_files_upload",
      }),
    })
      .then(async (resp: any) => {
        const res = await resp.json();
        let user;
        if (typeof res?.result === "object") {
          user = res.result;
        } else {
          user = await JSON.parse(res.result);
        }
        if (res.success) {
          const updatedObject = {
            ...userData,
            userPackageUsed: {
              ...userData.userPackageUsed,
              pdf_files_upload: user.userPackageUsed.pdf_files_upload,
            },
          };
          dispatch(setUserData({ ...userData, ...updatedObject }));
        }
      })
      .catch((err) => console.log(err));
  };

  const uploadFilesToDb = async (newText: string) => {
    const userEmail = userData.email;
    const file = {
      id: makeid(),
      fileName: fileName, //fileName,
      fileContent: newText,
      uploadedDateTime: new Date(),
    };

    await fetch("/api/users/updateUser", {
      method: "POST",
      body: JSON.stringify({
        newFile: file,
        email: userEmail,
      }),
    });
    fetchFiles();
  };
  // const uploadFileToServer = async () => {
  //   setFileError("");
  //   setFileUploading(true);
  //   if (file && data?.user?.email) {
  //     const body = new FormData();
  //     body.append("file", file);
  //     fetch(`/api/fileUpload?type=coverLetter&email=${data.user.email}`, {
  //       method: "POST",
  //       body,
  //     })
  //       .then(async (resp: any) => {
  //         const res = await resp.json();
  //         if (res.success) {
  //           const uploadedFileName = res.fileName + "_" + file.name;
  //           setSuccessMsg("File has been uploaded!");
  //           setFileUploading(false);
  //           fetchFiles();

  //           fetch("/api/users/updateUserLimit", {
  //             method: "POST",
  //             body: JSON.stringify({
  //               email: data?.user?.email,
  //               type: "pdf_files_upload",
  //             }),
  //           }).then(async (resp: any) => {
  //             const res = await resp.json();
  //             if (res.success) {
  //               const updatedObject = {
  //                 ...userData,
  //                 userPackageUsed: {
  //                   ...userData.userPackageUsed,
  //                   pdf_files_upload: res.user.userPackageUsed.pdf_files_upload,
  //                 },
  //               };
  //               dispatch(setUserData({ ...userData, ...updatedObject }));
  //             }
  //           });
  //         } else {
  //           setFileError("Something went wrong");
  //         }
  //       })
  //       .catch((error) => {
  //         setFileError("Something went wrong");
  //       });
  //   }
  // };

  const fetchFiles = async () => {
    if (data?.user?.email && !loadingFiles) {
      setLoadingFiles(true);

      // Fetch the list of files from the API route
      fetch(`/api/coverLetterBot/listFiles?email=${data.user.email}`)
        .then(async (response: any) => {
          const res = await response.json();
          if (res.result) {
            setFileList(res.result);
          }
        })
        .catch((error) => {
          console.error("Error fetching file list:", error);
        })
        .finally(() => {
          setLoadingFiles(false);
        });
    }
  };

  const handleDelete = async (file: string) => {
    const c = confirm("Are you sure you want to delete this File?");
    if (c) {
      try {
        const response = await fetch(
          `/api/coverLetterBot/deleteFile?email=${data.user.email}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ fileName: file }),
          }
        );

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
      updateLimits();
      // uploadFileToServer();
    } else if (file) {
      // if file exists but not PDf
      setFileError("only PDF file is allowed");
    }
  }, [file]);

  useEffect(() => {
    if (newFileText !== "") {
      uploadFilesToDb(newFileText);
      // fetchFiles();
    }
  }, [newFileText]);
  useEffect(() => {
    fetchFiles();
  }, [data]);

  return (
    <>
      <div className="py-4 border p-4 mb-4 rounded-lg">
        <div className="w-full mb-8">
          <LimitCard
            title="File uploads available"
            limit={userData?.userPackageData?.limit?.pdf_files_upload}
            used={userData?.userPackageUsed?.pdf_files_upload}
            setPercentageCalculated={setPercentageCalculated}
            availablePercentage={availablePercentage}
            setAvailablePercentage={setAvailablePercentage}
          />
        </div>
        {!isNaN(availablePercentage) && availablePercentage !== 0 && (
          <label
            className={`bg-black text-white text-sm rounded-full relative flex py-2   items-center justify-center px-4 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max cursor-pointer ${
              fileUploading && "!bg-black"
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
                  setFileName(e.target.files[0].name);
                }
              }}
            />
          </label>
        )}

        {file !== null && (
          <FileUploadHandler
            file={file}
            text={newFileText}
            setText={setNewFileText}
          />
        )}
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
              {fileList.length === 0 && <p>No Files found</p>}
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

export default CoverLetterFileUploader;
