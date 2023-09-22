import AddNewExperienceCard from "./AddNewExperienceCard";
import ExperienceCard from "./ExperienceCard";
import { useDispatch, useSelector } from "react-redux";
import { setScrapped, setStepFive } from "@/store/registerSlice";
import { WorkExperience } from "@/store/userDataSlice";
import EditExperienceCard from "./EditExperienceCard";
import { plusSimpleIcon } from "@/helpers/iconsProvider";
import { useEffect } from "react";
// import { useEffect } from "react";

const StepFive = () => {
  // Redux
  const dispatch = useDispatch();
  const stepFive = useSelector((state: any) => state.register.stepFive);
  const { list, state } = stepFive;
  const userData = useSelector((state: any) => state.userData);

  useEffect(() => {
    if (userData && userData.experience) {
      dispatch(setStepFive({ ...stepFive, list: userData.experience }));
    }
  }, [userData]);

  return (
    <>
      {/* {state === "show" && (
        <div
          className="flex items-center bg-blue-500  text-sm  px-4 py-3"
          role="alert"
        >
          <svg
            className="fill-current w-5 h-5 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
          </svg>
          <p>
            Don{"'"}t see all your Work Experience? <br />{" "}
            <button
              type="button"
              className="font-bold text-blue-950 "
              onClick={() => {
                dispatch(setScrapped({ workExperience: false }));
                fetchExperienceDataFromResume(true);
              }}
            >
              {" "}
              Click here{" "}
            </button>{" "}
            to refetch Experience List from your Resume.
          </p>
        </div>
      )} */}

      {state === "add" && <AddNewExperienceCard />}

      {state === "edit" && <EditExperienceCard />}

      {state === "show" && (
        <>
          <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl ">
            Work Experience
            <button
              type="button"
              onClick={(e) => dispatch(setStepFive({ state: "add" }))}
              className="text-xs float-right flex flex-row gap-1 items-center font-normal hover:font-extrabold"
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
            className="w-full flex flex-row gap-1 items-center justify-center text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
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
