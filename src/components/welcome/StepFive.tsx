import AddNewExperienceCard from "./AddNewExperienceCard";
import ExperienceCard from "./ExperienceCard";
import { useDispatch, useSelector } from "react-redux";
import { setStepFive } from "@/store/registerSlice";
import { WorkExperience } from "@/store/userDataSlice";
import EditExperienceCard from "./EditExperienceCard";
import { plusSimpleIcon } from "@/helpers/iconsProvider";
// import { useEffect } from "react";

const StepFive = () => {
  // Redux
  const dispatch = useDispatch();
  const stepFive = useSelector((state: any) => state.register.stepFive);
  const { list, state } = stepFive;
  return (
    <>
      {state === "add" && <AddNewExperienceCard />}

      {state === "edit" && <EditExperienceCard />}

      {state === "show" && (
        <>
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Work Experience
            <button
              type="button"
              onClick={(e) => dispatch(setStepFive({ state: "add" }))}
              className="text-xs float-right flex flex-row gap-1 items-center hover:bg-gray-50"
            >
              {plusSimpleIcon}
              Add New Experience
            </button>
          </h1>

          {list.length === 0 && <p>No Experiences Found</p>}
          {list.map((rec: WorkExperience) => (
            <div key={rec.id}>
              <ExperienceCard rec={rec} />
            </div>
          ))}
          <button
            type="button"
            onClick={(e) => dispatch(setStepFive({ state: "add" }))}
            className="w-full flex flex-row gap-1 items-center justify-center text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
          >
            {plusSimpleIcon}
            Add New Experience
          </button>
        </>
      )}
    </>
  );
};
export default StepFive;
