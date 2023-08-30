import AddNewEducationCard from "./AddNewEducationCard";
import EducationCard from "./EducationCard";
import { useDispatch, useSelector } from "react-redux";
import { setStepFour } from "@/store/registerSlice";
import { Education } from "@/store/registerSlice";
import EditEducationCard from "./EditEducationCard";
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
              Add New Education
            </button>
          </h1>

          {list.length === 0 && <p>No Education Found</p>}
          {list.map((rec: Education) => (
            <div key={rec.id}>
              <EducationCard rec={rec} />
            </div>
          ))}
        </>
      )}
    </>
  );
};
export default StepFour;
