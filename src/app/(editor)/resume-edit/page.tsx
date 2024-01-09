import ResumePreviews from "@/components/ResumePreviews";
import React from "react";

const Editor = () => {
  return (
    <div className="w-full flex flex-row justify-start items-start">
      <div className="w-7/12">1</div>
      <div className="w-5/12 bg-slate-200 h-screen">
        <ResumePreviews />
      </div>
    </div>
  );
};

export default Editor;
