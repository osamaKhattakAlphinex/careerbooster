import AiToolsCar from "@/components/new-dashboard/dashboard/CareerBoostingAiToolsCard";
import RecentDocumentsCard from "@/components/new-dashboard/dashboard/RecentDocumentsCard";
import GenerateResume from "@/components/new-dashboard/generateResume/generateResume";

export default function Dashboard() {
  return (
    <div className="w-full sm:w-full z-1000 ">
      <div className="ml-[234px] px-[15px] my-[72px] ">
        <RecentDocumentsCard />
        <AiToolsCar />
        {/* <GenerateResume /> */}
      </div>
    </div>
  );
}
