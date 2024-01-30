const AddressCard = () => {
  return (
    <div className="flex flex-row justify-center items-center">
      <div className="w-10/12">
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-y-20 lg:gap-x-20">
          <div className="col">
            <div className="text-center">
              <div className="w-18 h-18 rounded-md p-4 inline-flex items-center justify-center bg-[#E6F85E] text-[#11121c] mb-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <path d="M18 6v.01M18 13l-3.5-5a4 4 0 1 1 7 0L18 13" />
                  <path d="M10.5 4.75 9 4 3 7v13l6-3 6 3 6-3v-2M9 4v13m6-2v5" />
                </svg>
              </div>
              <h4 className=" font-medium mb-0">
                23 The Atria 219 Bath Road Slough SL1 4BF, United Kingdom
              </h4>
            </div>
          </div>
          <div className="col">
            <div className="text-center">
              <div className="w-18 h-18 rounded-md p-4 inline-flex items-center justify-center bg-[#E6F85E] text-[#11121c] mb-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2m10 3a2 2 0 0 1 2 2m-2-6a6 6 0 0 1 6 6" />
                </svg>
              </div>
              <h4 className="font-medium mb-0">+44 7933 951034</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddressCard;
