import AiGeneratedCoverLetters from "@/components/new-dashboard/dashboard/cover-letter-generator/AiGeneratedCoverLetters";
import MainCoverLetterTool from "@/components/new-dashboard/dashboard/cover-letter-generator/MainCoverLetterTool";

export default function CoverLetterPage() {
  return (
    <>
      <div className="w-full sm:w-full z-1000 ">
        <div className="ml-[244px] px-[15px] my-[72px] ">
          <AiGeneratedCoverLetters />
          <MainCoverLetterTool />
        </div>
      </div>
    </>
  );
}
