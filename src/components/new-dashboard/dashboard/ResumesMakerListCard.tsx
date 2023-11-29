import ResumeCard from "@/components/new-dashboard/dashboard/resume-builder/RecentResumeCard";

const ResumesListCard = () => {
  return (
    <div className="text-white bg-gray-900 rounded-lg my-4">
      {[1, 2].map((n: number) => (
        <ResumeCard key={n} />
      ))}
    </div>
  );
};
export default ResumesListCard;
