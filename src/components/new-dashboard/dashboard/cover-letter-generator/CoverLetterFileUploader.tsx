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
        const response: any = await fetch(
          `/api/coverLetterBot/deleteFile?email=${data.user.email}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ fileName: file }),
          }
        );
        const responseData = await response.json();
        if (responseData.success) {
          alert("File has been deleted");
          fetchFiles();
        } else {
          alert("Error deleting file: " + responseData.error);
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
      fetchFiles();
    }
  }, [newFileText]);
  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <>
      <div className="py-4  lg:p-4 mb-4 rounded-lg">
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
          <div className="py-3">
            <div className="py-[20px] lg:w-[480px] px-[30px] flex flex-col lg:flex-row  gap-4 border-2 rounded-[10px] mt-4 border-[#312E37] border-dashed	">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-[40px] h-[40px] text-[#B324D7] font-normal"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                />
              </svg>

              <div className="flex flex-col gap-[3px]">
                <h2 className="text-white text-[16px] font-semibold">
                  Drag and drop file here
                </h2>
                <p className="text-[#312E37] text-[14px]">
                  Limit 200mb per file
                </p>
              </div>
              <label
                className={`flex flex-row justify-center items-center gap-2 py-3 px-[28px] border  border-[#312E37] rounded-full ml-auto ${
                  fileUploading && "!bg-black"
                }`}
              >
                <span className="text-white text-[15px] font-semibold">
                  {fileUploading ? "Uploading..." : "Browse Files"}
                </span>
                <input
                  type="file"
                  className="hidden"
                  disabled={fileUploading}
                  onChange={(e) => {
                    if (e.target.files) {
                      setFile(e.target.files[0]);
                      setFileName(e.target.files[0]?.name);
                    }
                  }}
                />
              </label>
            </div>
          </div>
        )}

        {file !== null && (
          <FileUploadHandler
            file={file}
            text={newFileText}
            setText={setNewFileText}
          />
        )}
        {loadingFiles ? (
          <p className="text-white">Loading Files...</p>
        ) : (
          <div className="flex flex-col gap-4 mt-[30px]">
            <span className="text-sm text-[#615DFF]  uppercase font-bold">
              or Choose File to use
            </span>
            <ul>
              {fileList &&
                fileList.map((file: string, i: number) => (
                  <li key={i} className="flex">
                    <label
                      className="flex gap-3 mt-2   items-center rounded-full border-[1px] border-[#353672] px-3 lg:px-6 lg:py-3  cursor-pointer lg:text-[15px] text-[11px] text-white"
                      htmlFor={`file_${i}`}
                    >
                      <input
                        id={`file_${i}`}
                        type="radio"
                        value={file}
                        checked={
                          selectedFile && selectedFile === file ? true : false
                        }
                        name="selectedFile"
                        onChange={(e) => {
                          setSelectedFile(e.target.value);
                        }}
                        className="h-4 bg-transparent border-[1px]"
                      />{" "}
                      {file}
                      <button
                        type="button"
                        className="mx-2  p-1"
                        onClick={(e) => handleDelete(file)}
                      >
                        {deleteIcon}
                      </button>
                    </label>
                  </li>
                ))}
              {fileList.length === 0 && <p>No Files found</p>}
            </ul>
          </div>
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
