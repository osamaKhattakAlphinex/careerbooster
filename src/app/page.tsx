import UploadPDFResume from "@/components/UploadPDFResume";

export default function Home() {
  return (
    <div className="m-10 p-10 rounded-2xl backdrop-blur-xl bg-white/30 text-center ">
      <h1 className="drop-shadow-md text-center text-4xl font-extrabold text-gray-900 dark:text-white">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          AI
        </span>{" "}
        Resume Bot
      </h1>

      <UploadPDFResume />
    </div>
  );
}
