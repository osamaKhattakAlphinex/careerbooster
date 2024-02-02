import { Education } from "@/store/userDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { setStepFour } from "@/store/registerSlice";
import { EditIcon, deleteIcon, plusSimpleIcon } from "@/helpers/iconsProvider";

const EducationCard = ({
  rec,
  isShowing = false, // not editing only showing for profileview page
}: {
  rec: Education;
  isShowing?: boolean;
}) => {
  const dispatch = useDispatch();
  const stepFour = useSelector((state: any) => state.register.stepFour);
  const { list, state } = stepFour;
  const handleEdit = (id: any) => {
    dispatch(setStepFour({ state: "edit", editId: id }));
  };
  const handleDelete = (id: any) => {
    const newList = list.filter((rec: Education) => rec?.id !== id);
    dispatch(setStepFour({ list: newList }));
  };
  return (
    <div
      className="w-full  rounded-lg shadow-md p-6 dark:border-[1px] my-3 dark:border-[#2e2f45]"
      key={rec?.id}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base dark:text-gray-100 text-gray-950 font-semibold w-[80%]">
          {rec?.educationLevel || isShowing ? (
            rec?.educationLevel
          ) : (
            <button
              onClick={(e) => handleEdit(rec?.id)}
              className="flex flex-row gap-1 my-2 font-semibold text-blue-600  hover:text-blue-900"
            >
              {plusSimpleIcon}
              Add Education Level
            </button>
          )}
          {" in "}
          {rec?.fieldOfStudy || isShowing ? (
            rec?.fieldOfStudy
          ) : (
            <button
              onClick={(e) => handleEdit(rec?.id)}
              className="flex flex-row gap-1 my-2 font-semibold text-blue-600  hover:text-blue-900"
            >
              {plusSimpleIcon}
              Add Field of study
            </button>
          )}
        </h2>
        {!isShowing && (
          <div className="space-x-2">
            <button
              className="text-blue-500 hover:text-blue-700"
              onClick={(e) => handleEdit(rec?.id)}
            >
              {EditIcon}
            </button>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={(e) => handleDelete(rec?.id)}
            >
              {deleteIcon}
            </button>
          </div>
        )}
      </div>
      <p className="text-md dark:text-gray-100 text-gray-950">
        {rec?.schoolName || isShowing ? (
          rec?.schoolName
        ) : (
          <button
            onClick={(e) => handleEdit(rec?.id)}
            className="flex flex-row gap-1 my-2 font-semibold text-blue-600  hover:text-blue-900"
          >
            {plusSimpleIcon}
            Add School Name
          </button>
        )}
      </p>
      {/* <h3 className="text-sm text-gray-600">Islamabad, Pakistan</h3> */}
      <h3 className="text-sm dark:text-gray-100 text-gray-950">
        {rec?.schoolLocation || isShowing ? (
          rec?.schoolLocation
        ) : (
          <button
            onClick={(e) => handleEdit(rec?.id)}
            className="flex flex-row gap-1 my-2 font-semibold text-blue-600  hover:text-blue-900"
          >
            {plusSimpleIcon}
            Add Location
          </button>
        )}
      </h3>
      <p className="text-sm text-gray-400">
        {rec?.fromMonth || isShowing ? (
          rec?.fromMonth
        ) : (
          <button
            onClick={(e) => handleEdit(rec?.id)}
            className="flex flex-row gap-1 my-2 font-semibold text-blue-600  hover:text-blue-900"
          >
            {plusSimpleIcon}
            Add Month
          </button>
        )}{" "}
        {rec?.fromYear || isShowing ? (
          rec?.fromYear
        ) : (
          <button
            onClick={(e) => handleEdit(rec?.id)}
            className="flex flex-row gap-1 my-2 font-semibold text-blue-600  hover:text-blue-900"
          >
            {plusSimpleIcon}
            Add From Year
          </button>
        )}{" "}
        to{" "}
        {rec?.isContinue ? (
          "Present"
        ) : (
          <>
            {rec?.toMonth || isShowing ? (
              rec?.toMonth
            ) : (
              <button
                onClick={(e) => handleEdit(rec?.id)}
                className="flex flex-row gap-1 my-2 font-semibold text-blue-600  hover:text-blue-900"
              >
                {plusSimpleIcon}
                Add To Month
              </button>
            )}{" "}
            {rec?.toYear || isShowing ? (
              rec?.toYear
            ) : (
              <button
                onClick={(e) => handleEdit(rec?.id)}
                className="flex flex-row gap-1 my-2 font-semibold text-blue-600  hover:text-blue-900"
              >
                <span>{plusSimpleIcon}</span>
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
