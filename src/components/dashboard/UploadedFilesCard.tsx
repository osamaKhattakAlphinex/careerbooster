import FileCard from "./FileCard";
const UploadedFilesCard = () => {
  return (
    <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
      <h5 className="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white">
        Uploaded Files
      </h5>
      <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
        Recently uploaded Files
      </p>
      <div className="flex flex-row gap-4">
        <FileCard />
        <FileCard />
      </div>
    </div>
  );
};

export default UploadedFilesCard;
