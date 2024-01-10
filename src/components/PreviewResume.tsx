"use client";
import { crownIcon } from "@/helpers/newIconsProviders";
import { setResume } from "@/store/resumeSlice";
import { setUserData } from "@/store/userDataSlice";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
export type Template = {
  id: number;
  title: string;
  tags: string[];
  template: (props: any) => React.ReactNode;
  category: "premium" | "freemium";
  preview: string;
};

const PreviewResume = ({ selectedTemplate }: any) => {
  const [previewTemplate, setPreviewTemplate] = useState(true);
  const { data: session } = useSession();
  const { resume } = useSelector((state: any) => state);
  const componentRef = useRef(null);
  const dispatch = useDispatch();
  const resumeData = useSelector((state: any) => state.resume);
  const fetchDefaultResume = async () => {
    const res = await fetch(
      `/api/users/getOneByEmail?email=${session?.user?.email}`
    );

    const { result, success } = await res.json();

    if (success) {
      dispatch(setUserData(result));
      dispatch(setResume(result.resumes[0]));
    }
  };
  useEffect(() => {
    if (!resume.id) {
      fetchDefaultResume();
    }
  }, []);
  return (
    <>
      {resume &&
        (resume?.name || resume?.contact?.email || resume?.summary) && (
          <div className="">
            {selectedTemplate.category === "premium" && (
              <div className="absolute rounded-full right-1 top-1 h-10 w-10 grid place-content-center bg-yellow-600">
                {crownIcon}
              </div>
            )}

            <div
              ref={componentRef}
              className={` bg-white 
                    
               ${previewTemplate ? `h-[1123px]` : "h-auto"} ${
                previewTemplate ? `w-[794px]` : "w-auto"
              } ${previewTemplate ? "overflow-hidden" : "overflow-visible"}
                } ${resumeData.state.resumeLoading ? "animate-pulse" : ""}`}
            >
              {selectedTemplate.template({})}
            </div>
          </div>
        )}
    </>
  );
};

export default PreviewResume;
