"use client";
import { fileUploaderIcon } from "@/helpers/iconsProvider";
import { showErrorToast, showSuccessToast } from "@/helpers/toast";
import React from "react";

export type UploaderConfig = {
  file: any;
  setFile: any;
  fileName: string;
  setFileName: any;
};

const FileUploader = ({
  file,
  setFile,
  fileName,
  setFileName,
}: UploaderConfig) => {
  const isValidFile = (file: any) => {
    const ALLOWED_EXTENSIONS = /\.(pdf|doc|docx)$/i;
    if (!ALLOWED_EXTENSIONS.test(file.name)) {
      return false;
    }
    return true;
  };

  const isFileSizeValid = (file: any) => {
    const MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return false;
    }
    return true;
  };

  const handleFile = (file: any) => {
    if (file) {
      if (!isValidFile(file)) {
        showErrorToast("Allowed files formats are .pdf, doc or docx.");
        return;
      } else if (!isFileSizeValid(file)) {
        showErrorToast("file size of upto 20mb is allowed.");
        return;
      } else {
        setFile(file);
        setFileName(file.name);
        showSuccessToast("File Loaded Successfully");
      }
    }
  };

  function handleFileChange(event: any) {
    event.preventDefault();

    const files: any = event.target.files;
    const fileArray: any = Array.from(files);

    handleFile(fileArray[0]);
  }

  function handleDragOver(event: any) {
    event.preventDefault();
  }

  function handleDrop(event: any) {
    event.preventDefault();

    const fileList: any = event.dataTransfer.files;
    const fileArray: any = Array.from(fileList);

    handleFile(fileArray[0]);
  }

  return (
    <div className="flex items-center justify-center w-full ">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg hover:bg-gray-200 cursor-pointer bg-gray-50  dark:bg-[#222027] dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          {fileUploaderIcon}
          <p className="mb-2 text-xs text-gray-500 md:text-sm dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <span className="hidden sm:block font-semibold text-center tracking-wide text-xs text-[#B324D7]">
            Upload a file in .pdf .doc or .docx format and file size should be
            upto 20mb.
          </span>

          <div className=""></div>
        </div>
        <input
          id="dropzone-file"
          type="file"
          accept=".pdf, .doc, .docx"
          //   name="file"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export default FileUploader;
