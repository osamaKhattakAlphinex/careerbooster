import React from "react";
import JobFormInput from "./JobFormInput";
import { SingleJob } from "../../../types/ObjTypes/types";
type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  deoId?: string;
  role?: string;
  singleRec?: SingleJob | null;
};
const JobForm = ({ setOpen,role, deoId, singleRec }: Props) => {
  return (
    <div className="absolute inset-0 z-30 w-full h-full bg-black/90 overflow-y-scroll">
      <div className="flex justify-center w-full h-full mt-12">
        <JobFormInput deoId={deoId} role={role} setOpen={setOpen} singleRec={singleRec} />
      </div>
    </div>
  );
};

export default JobForm;
