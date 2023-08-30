import AddNewExperienceCard from "./AddNewExperienceCard";
import ExperienceCard from "./ExperienceCard";
import { useDispatch, useSelector } from "react-redux";
import { setStepFive } from "@/store/registerSlice";
import { WorkExperience } from "@/store/registerSlice";
import EditExperienceCard from "./EditExperienceCard";
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Add New Experience
            </button>
          </h1>

          {list.length === 0 && <p>No Experiences Found</p>}
          {list.map((rec: WorkExperience) => (
            <div key={rec.id}>
              <ExperienceCard rec={rec} />
            </div>
          ))}
        </>
      )}
    </>
  );
};
export default StepFive;
