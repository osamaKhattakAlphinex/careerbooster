"use client"
import { crownIcon } from "@/helpers/newIconsProviders";
import { setResume } from "@/store/resumeSlice";
import { setUserData } from "@/store/userDataSlice";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef } from "react";
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
    const { data: session } = useSession();
    const { resume } = useSelector((state: any) => state);
    const componentRef = useRef(null);
    const dispatch = useDispatch();

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
    return <div>
        {resume &&
            (resume?.name || resume?.contact?.email || resume?.summary) && (
                <div className="relative p-4">
                    {selectedTemplate.category === "premium" && (
                        <div className="absolute rounded-full right-1 top-1 h-10 w-10 grid place-content-center bg-yellow-600">
                            {crownIcon}
                        </div>
                    )}

                    <div ref={componentRef} className=" bg-white">
                        {selectedTemplate.template({})}
                    </div>
                </div>
            )}

    </div>;
};

export default PreviewResume;
