"use client";

import { useEffect, useState } from "react";
// import Test from "../components/Test";
import { useSelector, useDispatch } from "react-redux";
import { setFile } from "../../store/resumeSlice";
import { RootState } from "../../store/store";

// interface File {
//   name: string;
//   size: number;
//   type: string;
//   lastModified: number;
// }

export default function Homepage() {
  //   const file = useSelector((state: RootState) => state.resume.file);
  const dispatch = useDispatch();

  //   const [file, setFile] = useState(null);
  const handleFileChange = (e: any) => {
    const uploadedFile = e.target.files[0];
    console.log("handleFileChange");
    console.log(uploadedFile);
    dispatch(setFile({ file: JSON.parse(uploadedFile) }));
    // setFile(e.target.files[0]);
  };

  return (
    <div className=" p-10 rounded-2xl backdrop-blur-xl bg-white/30 text-center ">
      <h1 className="drop-shadow-md text-center text-4xl font-extrabold text-gray-900 dark:text-white">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          AI
        </span>{" "}
        Resume Bot
      </h1>
      <p className="mt-4">Upload your resume to get started</p>
      <div className="flex items-center justify-center mt-4">
        <label className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded cursor-pointer">
          Upload File
          <input type="file" className="hidden" onChange={handleFileChange} />
        </label>
      </div>

      {/* <Test /> */}
    </div>
  );
}
