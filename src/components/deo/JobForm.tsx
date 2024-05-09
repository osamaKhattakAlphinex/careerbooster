import React from "react";
import JobFormInput from "./JobFormInput";
import { crossIcon } from "@/helpers/iconsProvider";
type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  deoId: any;
  singleRec?: any;
};
const JobForm = ({ setOpen, deoId, singleRec }: Props) => {
  return (
    <div className="absolute inset-0 z-30 w-full h-full bg-black/90 overflow-y-scroll">
      <div className="flex justify-center w-full h-full mt-12">
        <JobFormInput deoId={deoId} setOpen={setOpen} singleRec={singleRec} />
      </div>
    </div>
  );
};

export default JobForm;
