import AddNewEducationCard from "./AddNewEducationCard";
import EducationCard from "./EducationCard";
import { useDispatch, useSelector } from "react-redux";
import { setStepFour } from "@/store/registerSlice";
import { Education } from "@/store/registerSlice";
import EditEducationCard from "./EditEducationCard";
import { plusSimpleIcon } from "@/helpers/iconsProvider";
// import { useEffect } from "react";

const StepFour = () => {
  // Redux
  const dispatch = useDispatch();
  const stepFour = useSelector((state: any) => state.register.stepFour);
  const { list, state } = stepFour;
  return (
    <>
      {state === "add" && <AddNewEducationCard />}

      {state === "edit" && <EditEducationCard />}

      {state === "show" && (
        <>
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Your Education
            <button
              type="button"
              onClick={(e) => dispatch(setStepFour({ state: "add" }))}
              className="text-xs float-right flex flex-row gap-1 items-center hover:bg-gray-50"
            >
              {plusSimpleIcon}
              Add New Education
            </button>
          </h1>

          {list.length === 0 && <p>No Education Found</p>}
          {list.map((rec: Education) => (
            <div key={rec.id}>
              <EducationCard rec={rec} />
            </div>
          ))}

          <button
            type="button"
            onClick={(e) => dispatch(setStepFour({ state: "add" }))}
            className="w-full flex flex-row gap-1 items-center justify-center text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
          >
            {plusSimpleIcon}
            Add New Education
          </button>
        </>
      )}
    </>
  );
};
export default StepFour;
