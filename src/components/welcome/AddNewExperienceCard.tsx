import { useDispatch, useSelector } from "react-redux";
import { setStepFive } from "@/store/registerSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { makeid } from "@/helpers/makeid";
import ExperienceForm from "./ExperienceForm";

const AddNewExperienceCard = () => {
  const dispatch = useDispatch();
  const stepFive = useSelector((state: any) => state.register.stepFive);
  const { list } = stepFive;

  const formik = useFormik({
    initialValues: {
      jobTitle: "",
      company: "",
      country: "",
      cityState: "",
      fromMonth: "",
      fromYear: new Date().getFullYear(),
      isContinue: false,
      toMonth: "",
      toYear: new Date().getFullYear(),
      description: "",
    },
    validationSchema: Yup.object({
      jobTitle: Yup.string().required("Job title is required"),
    }),
    onSubmit: async (values) => {
      // generate random id
      const obj = { id: makeid(), ...values };
      dispatch(setStepFive({ list: [obj, ...list] }));
      dispatch(setStepFive({ state: "show" }));
    },
  });

  return (
    <div className="w-full max-w-md mx-auto p-6 border rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">
        Add Experience
        <button
          type="button"
          onClick={(e) => dispatch(setStepFive({ state: "show" }))}
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
          View all Experiences
        </button>
      </h2>
      <ExperienceForm formik={formik} />
    </div>
  );
};
export default AddNewExperienceCard;