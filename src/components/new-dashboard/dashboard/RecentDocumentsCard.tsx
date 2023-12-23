import ResumeMaker from "./ResumeMaker";
import ProfileCompletionAlert from "@/components/dashboard/ProfileCompletionAlert";

const RecentDocumentsCard = () => {
  return (
    <>
      {/* <Alert show={show} onClose={() => setShow(false)} /> */}
      <ProfileCompletionAlert />
      <div className="mt-5">
        <h1 className="pb-2 rounded-[14px] dark:text-zinc-500 text-indigo-500  font-bold uppercase text-[14px] lg:pl-0 pl-5 lg:mt-0 ">
          career booster ai tools
        </h1>
        <div className="flex mt-5">
          <ResumeMaker />
        </div>
      </div>
    </>
  );
};

export default RecentDocumentsCard;
