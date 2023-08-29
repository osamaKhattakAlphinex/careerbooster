import AddNewExperienceCard from "./AddNewExperienceCard";
import WorkExperienceCard from "./WorkExperienceCard";

const StepFive = () => {
  return (
    <>
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Work Experience
      </h1>
      {/* Experience Card */}
      <WorkExperienceCard />

      <AddNewExperienceCard />
    </>
  );
};
export default StepFive;
