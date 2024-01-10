"use client";
import { crownIcon } from "@/helpers/newIconsProviders";
import { setResume } from "@/store/resumeSlice";
import { setUserData } from "@/store/userDataSlice";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
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
  const params = useSearchParams();

  const { resume } = useSelector((state: any) => state);
  const componentRef = useRef<any>(null);
  const resumeId: string | null = params.get("resumeId");
  const dispatch = useDispatch();
  const resumeData = useSelector((state: any) => state.resume);
  const fetchResume = async () => {
    const res = await fetch(
      `/api/users/getOneByEmail?email=${session?.user?.email}`
    );

    const { result, success } = await res.json();

    if (success) {
      dispatch(setUserData(result));
      const currentResume = result.resumes.find(
        (resume: any) => resume.id === resumeId
      );
      dispatch(setResume(currentResume));
    }
  };

  useEffect(() => {
    if (resumeId && session) {
      fetchResume();
    }
  }, [resumeId, session]);

  const sectionHeight = 1123; // Define your section height in pixels
  const sectionWidth = 794; // Define your section width in pixels
  const [numSections, setNumSections] = useState(0);

  const [currentSection, setCurrentSection] = useState(0);
  useEffect(() => {
    if (componentRef.current) {
      const height = componentRef.current.scrollHeight;
      setNumSections(Math.ceil(height / 1123));
    }
  }, [componentRef.current]); // Recalculate contentHeight when it changes

  useEffect(() => {
    if (componentRef.current) {
      componentRef.current.scrollTop = currentSection * sectionHeight;
    }
  }, [currentSection]);
  const showNextSection = () => {
    if (currentSection < numSections - 1) {
      setCurrentSection((prev) => prev + 1);
    }
  };
  const showPrevSection = () => {
    if (currentSection > 0) {
      setCurrentSection((prev) => prev - 1);
    }
  };
  return (
    <>
      {resume &&
        (resume?.name || resume?.contact?.email || resume?.summary) && (
          <>
            <div className="transform scale-50 relative mt-[-265px]">
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
                {selectedTemplate.template({ previewTemplate })}
              </div>
            </div>
            {previewTemplate && (
              <div className="flex text-[#000]  absolute bottom-1 ">
                <button onClick={showPrevSection} className="text-[#000]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5 8.25 12l7.5-7.5"
                    />
                  </svg>
                </button>
                <span className="text-lg font-semibold">
                  {currentSection + 1}
                </span>

                <button onClick={showNextSection} className="text-[#000] ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </button>
              </div>
            )}
          </>
        )}
    </>
  );
};

export default PreviewResume;
