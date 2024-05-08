import React from "react";
import JobFormInput from "./JobFormInput";
import { crossIcon } from "@/helpers/iconsProvider";
type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const JobForm = ({ setOpen }: Props) => {
  return (
    <div className="absolute inset-0 w-full h-full bg-black/90 z-30">
      <div className="w-full h-full flex justify-center mt-12">
        <JobFormInput />
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
