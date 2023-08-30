import { useDispatch, useSelector } from "react-redux";
import { setStepFour } from "@/store/registerSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { makeid } from "@/helpers/makeid";
import EducationForm from "./EducationForm";

const AddNewEducationCard = () => {
  const dispatch = useDispatch();
  const stepFour = useSelector((state: any) => state.register.stepFour);
  const { list } = stepFour;

  const formik = useFormik({
    initialValues: {
      educationLevel: "",
      fieldOfStudy: "",
      schoolName: "",
      schoolLocation: "",
      fromMonth: "",
      fromYear: new Date().getFullYear(),
      isContinue: false,
      toMonth: "",
      toYear: new Date().getFullYear(),
    },
    validationSchema: Yup.object({
      educationLevel: Yup.string().required("Education Level is Required"),
    }),
    onSubmit: async (values) => {
      // generate random id
      const obj = { id: makeid(), ...values };
      dispatch(setStepFour({ list: [obj, ...list] }));
      dispatch(setStepFour({ state: "show" }));
    },
  });

  return (
    <div className="w-full max-w-md mx-auto p-6 border rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">
        Add Education
        <button
          type="button"
          onClick={(e) => dispatch(setStepFour({ state: "show" }))}
          className="text-xs float-right flex flex-row gap-1 items-center hover:bg-gray-50 mt-2"
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
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          View all educations
        </button>
      </h2>
      <EducationForm formik={formik} />
    </div>
  );
};
export default AddNewEducationCard;