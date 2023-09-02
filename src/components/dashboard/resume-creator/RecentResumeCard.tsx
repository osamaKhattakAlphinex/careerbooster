const RecentResumeCard = () => {
  return (
    <div className="w-1/3 bg-white border border-gray-200 rounded-lg shadow p-2 sm:p-4">
      <h2 className=" text-lg  ">RectJs Developer</h2>
      <p className="text-sm mb-2 text-gray-600">
        Generated on 5-Jun-2023 1:03 am
      </p>
      <div className="flex flex-row gap-2">
        <button className="bg-white border hover:bg-gray-100 text-gray-700 font-xs  px-3 rounded-md shadow-md transition duration-300 ease-in-out">
          View
        </button>
        <button className="bg-red-600 border hover:bg-red-400 text-white font-xs  px-3 rounded-md shadow-md transition duration-300 ease-in-out">
          Delete
        </button>
      </div>
    </div>
  );
};

export default RecentResumeCard;
