import { Education } from "@/store/registerSlice";
import { useDispatch, useSelector } from "react-redux";
import { setStepFour } from "@/store/registerSlice";

const plusIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5v15m7.5-7.5h-15"
    />
  </svg>
);
const EducationCard = ({ rec }: { rec: Education }) => {
  const dispatch = useDispatch();
  const stepFour = useSelector((state: any) => state.register.stepFour);
  const { list, state } = stepFour;
  const handleEdit = (id: string) => {
    dispatch(setStepFour({ state: "edit", editId: id }));
  };
  const handleDelete = (id: string) => {
    const newList = list.filter((rec: Education) => rec?.id !== id);
    dispatch(setStepFour({ list: newList }));
  };
  return (
    <div
      className="w-full bg-white rounded-lg shadow-md p-6 border"
      key={rec?.id}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-md font-semibold w-[80%]">
          {rec?.educationLevel ? (
            rec?.educationLevel
          ) : (
            <button
              onClick={(e) => handleEdit(rec?.id)}
              className="flex flex-row gap-1 my-2 font-semibold text-blue-600  hover:text-blue-900"
            >
              {plusIcon}
              Add Education Level
            </button>
          )}
          {" in "}
          {rec?.fieldOfStudy ? (
            rec?.fieldOfStudy
          ) : (
            <button
              onClick={(e) => handleEdit(rec?.id)}
              className="flex flex-row gap-1 my-2 font-semibold text-blue-600  hover:text-blue-900"
            >
              {plusIcon}
              Add Field of study
            </button>
          )}
        </h2>
        <div className="space-x-2">
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={(e) => handleEdit(rec?.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
              />
            </svg>
          </button>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={(e) => handleDelete(rec?.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </div>
      </div>
      <p className="text-md">
        {rec?.schoolName ? (
          rec?.schoolName
        ) : (
          <button
            onClick={(e) => handleEdit(rec?.id)}
            className="flex flex-row gap-1 my-2 font-semibold text-blue-600  hover:text-blue-900"
          >
            {plusIcon}
            Add School Name
          </button>
        )}
      </p>
      {/* <h3 className="text-sm text-gray-600">Islamabad, Pakistan</h3> */}
      <h3 className="text-sm text-gray-600">
        {rec?.schoolLocation ? (
          rec?.schoolLocation
        ) : (
          <button
            onClick={(e) => handleEdit(rec?.id)}
            className="flex flex-row gap-1 my-2 font-semibold text-blue-600  hover:text-blue-900"
          >
            {plusIcon}
            Add Location
          </button>
        )}
      </h3>
      <p className="text-sm text-gray-400">
        {rec?.fromMonth ? (
          rec?.fromMonth
        ) : (
          <button
            onClick={(e) => handleEdit(rec?.id)}
            className="flex flex-row gap-1 my-2 font-semibold text-blue-600  hover:text-blue-900"
          >
            {plusIcon}
            Add Month
          </button>
        )}{" "}
        {rec?.fromYear ? (
          rec?.fromYear
        ) : (
          <button
            onClick={(e) => handleEdit(rec?.id)}
            className="flex flex-row gap-1 my-2 font-semibold text-blue-600  hover:text-blue-900"
          >
            {plusIcon}
            Add From Year
          </button>
        )}{" "}
        to{" "}
        {rec?.isContinue ? (
          "Present"
        ) : (
          <>
            {rec?.toMonth ? (
              rec?.toMonth
            ) : (
              <button
                onClick={(e) => handleEdit(rec?.id)}
                className="flex flex-row gap-1 my-2 font-semibold text-blue-600  hover:text-blue-900"
              >
                {plusIcon}
                Add To Month
              </button>
            )}{" "}
            {rec?.toYear ? (
              rec?.toYear
            ) : (
              <button
                onClick={(e) => handleEdit(rec?.id)}
                className="flex flex-row gap-1 my-2 font-semibold text-blue-600  hover:text-blue-900"
              >
                {plusIcon}
                Add To Year
              </button>
            )}
          </>
        )}
      </p>
    </div>
  );
};
export default EducationCard;
