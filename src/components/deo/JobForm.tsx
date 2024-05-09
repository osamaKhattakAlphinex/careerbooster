import React from "react";
import JobFormInput from "./JobFormInput";
import { crossIcon } from "@/helpers/iconsProvider";
type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  deoId:any
  singleRec?: any
};
const JobForm = ({ setOpen,deoId, singleRec }: Props) => {
  return (
    <div className="absolute inset-0 w-full h-full bg-black/90 z-30">
      <div className="w-full h-full flex justify-center mt-12">
        <JobFormInput deoId={deoId} setOpen={setOpen} singleRec={singleRec} />
        <div
          className="absolute right-28 top-7 cursor-pointer"
          onClick={() => setOpen(false)}
        >
          {crossIcon}
        </div>
      </div>
    </div>
  );
};

export default JobForm;
