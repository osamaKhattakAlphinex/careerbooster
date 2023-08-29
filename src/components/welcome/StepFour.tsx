import AddNewEducationCard from "./AddNewEducationCard";
import EducationCard from "./EducationCard";

const StepFour = () => {
  return (
    <>
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Your Education
      </h1>
      {/* Education Card */}
      <EducationCard />

      <EducationCard />

      <AddNewEducationCard />
    </>
  );
};
export default StepFour;
