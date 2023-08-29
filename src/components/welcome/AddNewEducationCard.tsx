const AddNewEducationCard = () => {
  return (
    <div className="w-full max-w-md mx-auto p-6 border rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Add Education</h2>
      <form className="space-y-4">
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">
            Level of education <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">
            Field of study
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">
            School
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">
            Country
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">
            School Location
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">
            Time Period
          </label>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-xs text-gray-500">From</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500">
                {/* Options for months */}
              </select>
            </div>
            <div className="w-1/2">
              <label className="block text-xs text-gray-500">Year</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500">
                {/* Options for years */}
              </select>
            </div>
          </div>
          <div className="mt-2">
            <input type="checkbox" id="currentlyEnrolled" className="mr-2" />
            <label
              htmlFor="currentlyEnrolled"
              className="text-sm text-gray-700"
            >
              Currently enrolled
            </label>
          </div>
        </div>
        <div className="w-full">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600"
          >
            Save Education
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddNewEducationCard;
