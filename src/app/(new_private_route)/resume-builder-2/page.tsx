import ResumeMaker from "@/components/new-dashboard/dashboard/ResumeMaker";
import ResumesListCard from "@/components/new-dashboard/dashboard/ResumesListCard";
import GenerateResume from "@/components/new-dashboard/generateResume/generateResume";

export default function ResumeBuilder() {
  return (
    <div className="w-full sm:w-full z-1000 ">
      <div className="ml-[244px] px-[15px] my-[72px] ">
        <ResumesListCard />
       <GenerateResume/>
      </div>
    </div>
  );
}
