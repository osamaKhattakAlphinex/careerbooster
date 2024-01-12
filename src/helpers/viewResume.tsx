"use client"
import { setResume } from "@/store/resumeSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

const useViewResume = (source: any, setFinished: any, resume: any) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleOnView = async () => {
    if (source != "") {
      router.replace("/resume-builder");
    }
    if (setFinished) {
      setFinished(true);
    }
    return dispatch(setResume(resume));
  };
  return { handleOnView };
};

export default useViewResume;
