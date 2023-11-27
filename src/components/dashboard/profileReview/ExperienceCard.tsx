import { WorkExperience } from "@/store/userDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { setStepFive } from "@/store/registerSlice";
import { EditIcon, deleteIcon, plusSimpleIcon } from "@/helpers/iconsProvider";
import { useState } from "react";

const ExperienceCard = ({
  rec,
  isShowing = false, // not editing only showing for profileview page
}: {
  rec: WorkExperience;
  isShowing?: boolean;
}) => {
  const [showMore, setShowMore] = useState(false);
  const dispatch = useDispatch();
  const stepFive = useSelector((state: any) => state.register.stepFive);
  const { list, state } = stepFive;
  const handleEdit = (id: any) => {
    dispatch(setStepFive({ state: "edit", editId: id }));
  };
  const handleDelete = (id: any) => {
    const newList = list.filter((rec: WorkExperience) => rec.id !== id);
    dispatch(setStepFive({ list: newList }));
  };
  return (
    <div className="w-full  rounded-lg shadow-md p-6 border" key={rec.id}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-semibold w-[80%]">
          {rec.jobTitle || isShowing ? (
            rec.jobTitle
          ) : (
            <button
              onClick={(e) => handleEdit(rec.id)}
              className="flex flex-row gap-1 my-2 font-semibold text-blue-600  hover:text-blue-900"
            >
              {plusSimpleIcon}
              Add job title
            </button>
          )}
          {" in "}
          {rec.company || isShowing ? (
            rec.company
          ) : (
            <button
              onClick={(e) => handleEdit(rec.id)}
              className="flex flex-row gap-1 my-2 font-semibold text-blue-600  hover:text-blue-900"
            >
              {plusSimpleIcon}
              Add company
            </button>
          )}
        </h2>
        {!isShowing && (
          <div className="space-x-2">
            <button
              className="text-blue-500 hover:text-blue-700"
              onClick={(e) => handleEdit(rec.id)}
            >
              {EditIcon}
            </button>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={(e) => handleDelete(rec.id)}
            >
              {deleteIcon}
            </button>
          </div>
        )}
      </div>
      <p className="text-md">
        {rec.country || isShowing ? (
          rec.country
        ) : (
          <button
            onClick={(e) => handleEdit(rec.id)}
            className="flex flex-row gap-1 my-2 font-semibold text-blue-600  hover:text-blue-900"
          >
            {plusSimpleIcon}
            Add country
          </button>
        )}
      </p>
      {/* <h3 className="text-sm text-gray-600">Islamabad, Pakistan</h3> */}
      <h3 className="text-sm text-gray-600">
        {rec.cityState || isShowing ? (
          rec.cityState
        ) : (
          <button
            onClick={(e) => handleEdit(rec.id)}
            className="flex flex-row gap-1 my-2 font-semibold text-blue-600  hover:text-blue-900"
          >
            {plusSimpleIcon}
            Add city, state
          </button>
        )}
      </h3>
      <p className="text-sm text-gray-400">
        {rec.fromMonth || isShowing ? (
          rec.fromMonth
        ) : (
          <button
            onClick={(e) => handleEdit(rec.id)}
            className="flex flex-row gap-1 my-2 font-semibold text-blue-600  hover:text-blue-900"
          >
            {plusSimpleIcon}
            Add Month
          </button>
        )}{" "}
        {rec.fromYear || isShowing ? (
          rec.fromYear
        ) : (
          <button
            onClick={(e) => handleEdit(rec.id)}
            className="flex flex-row gap-1 my-2 font-semibold text-blue-600  hover:text-blue-900"
          >
            {plusSimpleIcon}
            Add From Year
          </button>
        )}{" "}
        to{" "}
        {rec.isContinue ? (
          "Present"
        ) : (
          <>
            {rec.toMonth || isShowing ? (
              rec.toMonth
            ) : (
              <button
                onClick={(e) => handleEdit(rec.id)}
                className="flex flex-row gap-1 my-2 font-semibold text-blue-600  hover:text-blue-900"
              >
                {plusSimpleIcon}
                Add To Month
              </button>
            )}{" "}
            {rec.toYear || isShowing ? (
              rec.toYear
            ) : (
              <button
                onClick={(e) => handleEdit(rec.id)}
                className="flex flex-row gap-1 my-2 font-semibold text-blue-600  hover:text-blue-900"
              >
                {plusSimpleIcon}
                Add To Year
              </button>
            )}
          </>
        )}
      </p>
      <p className="text-md">
        {rec.description || isShowing ? (
          <>
            <span>
              {showMore ? rec.description : rec?.description?.slice(0, 50)}
            </span>
            <button
              className="ml-1 lowercase text-white/40 text-xs"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "<< Show Less" : "Show More >>"}
            </button>
          </>
        ) : (
          <button
            onClick={(e) => handleEdit(rec.id)}
            className="flex flex-row gap-1 my-2 font-semibold text-blue-600  hover:text-blue-900"
          >
            {plusSimpleIcon}
            Add Description
          </button>
        )}
      </p>
    </div>
  );
};
export default ExperienceCard;
