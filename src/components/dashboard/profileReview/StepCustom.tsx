"use client";
import { EditIcon, deleteIcon } from "@/helpers/iconsProvider";
import { makeid } from "@/helpers/makeid";
import {
  setStepEight,
  setStepEleven,
  setStepNine,
  setStepSeven,
  setStepSix,
  setStepTen,
  setStepTwelve,
} from "@/store/registerSlice";
import {
  Award,
  Certification,
  Interest,
  Language,
  Publication,
  Reference,
  Training,
} from "@/store/userDataSlice";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

const RecordCard = ({ rec, recName, formCloseHandler }: any) => {
  const [edit, setEdit] = useState(false);

  return (
    <>
      {edit && recName === "publications" && (
        <PublicationsForm
          rec={rec}
          formCloseHandler={() => setEdit(false)}
          isEditing={edit}
        />
      )}
      {edit && recName === "certifications" && (
        <CertificationsForm
          rec={rec}
          formCloseHandler={() => setEdit(false)}
          isEditing={edit}
        />
      )}
      {edit && recName === "awards" && (
        <AwardsForm
          rec={rec}
          formCloseHandler={() => setEdit(false)}
          isEditing={edit}
        />
      )}
      {edit && recName === "languages" && (
        <LangaugesForm
          rec={rec}
          formCloseHandler={() => setEdit(false)}
          isEditing={edit}
        />
      )}
      {edit && recName === "interests" && (
        <InterestsForm
          rec={rec}
          formCloseHandler={() => setEdit(false)}
          isEditing={edit}
        />
      )}
      {edit && recName === "trainings" && (
        <TrainingForm
          rec={rec}
          formCloseHandler={() => setEdit(false)}
          isEditing={edit}
        />
      )}
      {edit && recName === "references" && (
        <ReferencesForm
          rec={rec}
          formCloseHandler={() => setEdit(false)}
          isEditing={edit}
        />
      )}

      <div className="relative flex flex-col items-start justify-start py-4 pl-4 pr-12 border border-gray-100 rounded-md">
        <div className="absolute right-2 top-4">
          <div className="flex flex-row justify-end gap-2">
            <button onClick={() => setEdit(true)}>{EditIcon}</button>
            <button>{deleteIcon}</button>
          </div>
        </div>

        <h2 className="text-xl uppercase dark:text-white/70 text-black/70">
          {rec.name}
          {rec.title}
        </h2>

        <span className="text-base dark:text-white/70 text-black/70">
          {rec.awardingOrganization}
          {rec.issuingOrganization}
          {rec.company}
        </span>

        <div className="flex flex-row items-center justify-between ">
          <span className="text-sm dark:text-white/70 text-black/70">
            {rec.date}
          </span>
          <span className="text-sm dark:text-white/70 text-black/70">
            {rec.startDate}
          </span>
          <span className="text-sm dark:text-white/70 text-black/70">
            {rec.endDate}
          </span>
        </div>
        <span className="text-sm uppercase dark:text-white/70 text-black/70">
          {rec.description}
        </span>

        <span className="text-sm uppercase dark:text-white/70 text-black/70">
          {rec.contactInformation}
          {rec.publisher}
        </span>

        <span className="text-base uppercase dark:text-white/70 text-black/70">
          {rec.position}
        </span>

        <div className="flex flex-row items-center justify-between">
          <span className="text-base dark:text-white/70 text-black/70">
            {rec.language}
          </span>
          <span className="text-sm dark:text-white/70 text-black/70">
            {rec.proficiency}
          </span>
        </div>
      </div>
    </>
  );
};

// Add item Buttons
const AddItemBtn = ({ onClick, btnText = "Add Item" }: any) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="xs:w-full md:w-5/12 flex mt-3 flex-row gap-1 items-center justify-center text-blue-700 hover:text-white border-[1px] border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
    >
      {btnText}
    </button>
  );
};
// forms
const PublicationsForm = ({
  rec = null,
  formCloseHandler,
  isEditing = false,
}: any) => {
  const dispatch = useDispatch();

  const stepEight = useSelector((state: any) => state.register.stepEight);

  const { list, state } = stepEight;

  useEffect(() => {
    if (rec) {
      formik.setValues(rec);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      title: "",
      publisher: "",
      date: "",
      description: "",
    },

    onSubmit: async (values) => {
      const { description } = values;
      const descriptionArray = description.split("\n").filter(Boolean); // Split description by '\n' and remove empty strings

      // Update the values with the description as an array
      const updatedValues = {
        ...values,
        description: descriptionArray,
      };

      const obj = { id: makeid(), ...updatedValues };
      const newList = [obj, ...list];
      dispatch(setStepEight({ list: newList }));
      dispatch(setStepEight({ state: "show" }));
      formCloseHandler();
    },

    // validationSchema: Yup.object().shape({
    //   company: Yup.string().required("company is required"),
    // }),
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-bold text-gray-200"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            className="w-full px-3 py-2 leading-tight text-gray-200 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            placeholder="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="publisher"
            className="block mb-2 text-sm font-bold text-gray-200"
          >
            Publisher
          </label>
          <input
            id="publisher"
            type="text"
            className="w-full px-3 py-2 leading-tight text-gray-200 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            placeholder="Publisher"
            onChange={formik.handleChange}
            value={formik.values.publisher}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="date"
            className="block mb-2 text-sm font-bold text-gray-200"
          >
            Date
          </label>
          <input
            id="date"
            type="date"
            className="w-full px-3 py-2 leading-tight text-gray-200 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            placeholder="Date"
            onChange={formik.handleChange}
            value={formik.values.date}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-bold text-gray-200"
          >
            Description
          </label>
          <textarea
            id="description"
            className="w-full px-3 py-2 leading-tight text-gray-200 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            onChange={formik.handleChange}
            placeholder="Description"
            value={formik.values.description}
          ></textarea>
        </div>
        <div className="flex flex-row-reverse items-center justify-end gap-2 mb-4">
          <input
            type="submit"
            className="xs:w-full md:w-5/12 flex mt-3 flex-row gap-1 items-center justify-center text-blue-700 hover:text-white border-[1px] border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
            value={isEditing ? "Update Publication" : "Add Publication"}
          />
          <input
            type="button"
            onClick={formCloseHandler}
            className="xs:w-full md:w-5/12 flex mt-3 flex-row gap-1 items-center justify-center text-blue-700 hover:text-white border-[1px] border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
            value="Cancel"
          />
        </div>
      </form>
    </div>
  );
};
const CertificationsForm = ({
  rec = null,
  formCloseHandler,
  isEditing = false,
}: any) => {
  const dispatch = useDispatch();

  const stepSix = useSelector((state: any) => state.register.stepSix);
  const { list, state } = stepSix;

  useEffect(() => {
    if (rec) {
      formik.setValues(rec);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      title: "",
      issuingOrganization: "",
      date: "",
      description: "",
    },

    onSubmit: async (values) => {
      const { description } = values;
      const descriptionArray = description.split("\n").filter(Boolean); // Split description by '\n' and remove empty strings

      // Update the values with the description as an array
      const updatedValues = {
        ...values,
        description: descriptionArray,
      };

      const obj = { id: makeid(), ...updatedValues };
      const newList = [obj, ...list];
      dispatch(setStepSix({ list: newList }));
      dispatch(setStepSix({ state: "show" }));
      formCloseHandler();
    },

    // validationSchema: Yup.object().shape({
    //   company: Yup.string().required("company is required"),
    // }),
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-bold text-gray-200"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            className="w-full px-3 py-2 leading-tight text-gray-200 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            placeholder="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="issuingOrganization"
            className="block mb-2 text-sm font-bold text-gray-200"
          >
            Issuing Organization
          </label>
          <input
            id="issuingOrganization"
            type="text"
            className="w-full px-3 py-2 leading-tight text-gray-200 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            placeholder="Issuing Organization"
            onChange={formik.handleChange}
            value={formik.values.issuingOrganization}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="date"
            className="block mb-2 text-sm font-bold text-gray-200"
          >
            Date
          </label>
          <input
            id="date"
            type="date"
            className="w-full px-3 py-2 leading-tight text-gray-200 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            placeholder="Date"
            onChange={formik.handleChange}
            value={formik.values.date}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-bold text-gray-200"
          >
            Description
          </label>
          <textarea
            id="description"
            className="w-full px-3 py-2 leading-tight text-gray-200 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            onChange={formik.handleChange}
            placeholder="Description"
            value={formik.values.description}
          ></textarea>
        </div>
        <div className="flex flex-row-reverse items-center justify-end gap-2 mb-4">
          <input
            type="submit"
            className="xs:w-full md:w-5/12 flex mt-3 flex-row gap-1 items-center justify-center text-blue-700 hover:text-white border-[1px] border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
            value={isEditing ? "Update Certification" : "Add Certification"}
          />
          <input
            type="button"
            className="xs:w-full "
            value="Cancel"
            onClick={formCloseHandler}
          />
        </div>
      </form>
    </div>
  );
};
const AwardsForm = ({
  rec = null,
  formCloseHandler,
  isEditing = false,
}: any) => {
  const dispatch = useDispatch();
  const stepNine = useSelector((state: any) => state.register.stepNine);

  useEffect(() => {
    if (rec) {
      formik.setValues(rec);
    }
  }, []);

  const { list, state } = stepNine;
  const formik = useFormik({
    initialValues: {
      title: "",
      awardingOrganization: "",
      date: "",
      description: "",
    },

    onSubmit: async (values) => {
      const { description } = values;
      const descriptionArray = description.split("\n").filter(Boolean); // Split description by '\n' and remove empty strings

      // Update the values with the description as an array
      const updatedValues = {
        ...values,
        description: descriptionArray,
      };

      const obj = { id: makeid(), ...updatedValues };
      const newList = [obj, ...list];
      dispatch(setStepNine({ list: newList }));
      dispatch(setStepNine({ state: "show" }));
      formCloseHandler();
    },

    validationSchema: Yup.object().shape({
      title: Yup.string().required("title is required"),
      awardingOrganization: Yup.string().required(
        "awardingOrganization is required"
      ),
      date: Yup.string().required("date is required"),
    }),
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-bold text-gray-200"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            className="w-full px-3 py-2 leading-tight text-gray-200 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            placeholder="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="awardingOrganization"
            className="block mb-2 text-sm font-bold text-gray-200"
          >
            Awarding Organization
          </label>
          <input
            id="awardingOrganization"
            type="text"
            className="w-full px-3 py-2 leading-tight text-gray-200 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            placeholder="Awarding Organization"
            onChange={formik.handleChange}
            value={formik.values.awardingOrganization}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="date"
            className="block mb-2 text-sm font-bold text-gray-200"
          >
            Date
          </label>
          <input
            id="date"
            type="date"
            className="w-full px-3 py-2 leading-tight text-gray-200 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            placeholder="Date"
            onChange={formik.handleChange}
            value={formik.values.date}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-bold text-gray-200"
          >
            Description
          </label>
          <textarea
            id="description"
            className="w-full px-3 py-2 leading-tight text-gray-200 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            onChange={formik.handleChange}
            placeholder="Description"
            value={formik.values.description}
          ></textarea>
        </div>
        <div className="flex flex-row-reverse items-center justify-end gap-2 mb-4">
          <input
            type="submit"
            className="xs:w-full md:w-5/12 flex mt-3 flex-row gap-1 items-center justify-center text-blue-700 hover:text-white border-[1px] border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
            value={isEditing ? "Update Awards" : "Add Awards"}
          />
          <input
            type="button"
            onClick={formCloseHandler}
            className="xs:w-full md:w-5/12 flex mt-3 flex-row gap-1 items-center justify-center text-blue-700 hover:text-white border-[1px] border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
            value="Cancel"
          />
        </div>
      </form>
    </div>
  );
};
const InterestsForm = ({
  rec = null,
  formCloseHandler,
  isEditing = false,
}: any) => {
  const dispatch = useDispatch();
  const stepTen = useSelector((state: any) => state.register.stepTen);
  const { list, state } = stepTen;

  useEffect(() => {
    if (rec) {
      formik.setValues(rec);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },

    onSubmit: async (values) => {
      const { description } = values;
      const descriptionArray = description.split("\n").filter(Boolean); // Split description by '\n' and remove empty strings

      // Update the values with the description as an array
      const updatedValues = {
        ...values,
        description: descriptionArray,
      };

      const obj = { id: makeid(), ...updatedValues };
      const newList = [obj, ...list];
      dispatch(setStepTen({ list: newList }));
      dispatch(setStepTen({ state: "show" }));
      formCloseHandler();
    },

    validationSchema: Yup.object().shape({
      name: Yup.string().required("name is required"),
    }),
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-bold text-gray-200"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            className="w-full px-3 py-2 leading-tight text-gray-200 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            placeholder="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-bold text-gray-200"
          >
            Description
          </label>
          <textarea
            id="description"
            className="w-full px-3 py-2 leading-tight text-gray-200 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            onChange={formik.handleChange}
            placeholder="Description"
            value={formik.values.description}
          ></textarea>
        </div>
        <div className="flex flex-row-reverse items-center justify-end gap-2 mb-4">
          <input
            type="submit"
            className="xs:w-full md:w-5/12 flex mt-3 flex-row gap-1 items-center justify-center text-blue-700 hover:text-white border-[1px] border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
            value={isEditing ? "Update Interest" : "Add Interest"}
          />
          <input
            type="button"
            onClick={formCloseHandler}
            className="xs:w-full md:w-5/12 flex mt-3 flex-row gap-1 items-center justify-center text-blue-700 hover:text-white border-[1px] border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
            value="Cancel"
          />
        </div>
      </form>
    </div>
  );
};
const ReferencesForm = ({
  rec = null,
  formCloseHandler,
  isEditing = false,
}: any) => {
  const dispatch = useDispatch();
  const stepTwelve = useSelector((state: any) => state.register.stepTwelve);
  const { list, state } = stepTwelve;

  useEffect(() => {
    if (rec) {
      formik.setValues(rec);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      position: "",
      company: "",
      contactInformation: "",
    },
    onSubmit: async (values) => {
      const obj = { id: makeid(), ...values };
      const newList = [obj, ...list];
      dispatch(setStepTwelve({ list: newList }));
      dispatch(setStepTwelve({ state: "show" }));
      formCloseHandler();
    },

    validationSchema: Yup.object().shape({
      company: Yup.string().required("company is required"),
      position: Yup.string().required("position is required"),
      name: Yup.string().required("name is required"),
      contactInformation: Yup.string().required(
        "Contact Information is required"
      ),
    }),
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-bold text-gray-200"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            className="w-full px-3 py-2 leading-tight text-gray-200 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            placeholder="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="position"
            className="block mb-2 text-sm font-bold text-gray-200"
          >
            Position
          </label>
          <input
            id="position"
            type="text"
            className="w-full px-3 py-2 leading-tight text-gray-200 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            placeholder="Position"
            onChange={formik.handleChange}
            value={formik.values.position}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="company"
            className="block mb-2 text-sm font-bold text-gray-200"
          >
            Company
          </label>
          <input
            id="company"
            type="text"
            className="w-full px-3 py-2 leading-tight text-gray-200 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            placeholder="Company"
            onChange={formik.handleChange}
            value={formik.values.company}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="contactInformation"
            className="block mb-2 text-sm font-bold text-gray-200"
          >
            Contact Information
          </label>
          <input
            id="contactInformation"
            type="text"
            className="w-full px-3 py-2 leading-tight text-gray-200 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            onChange={formik.handleChange}
            placeholder="Contact Information"
            value={formik.values.contactInformation}
          />
        </div>

        <div className="flex flex-row-reverse items-center justify-end gap-2 mb-4">
          <input
            type="submit"
            className="xs:w-full md:w-5/12 flex mt-3 flex-row gap-1 items-center justify-center text-blue-700 hover:text-white border-[1px] border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
            value={isEditing ? "Update Preference" : "Add Reference"}
          />
          <input
            type="button"
            onClick={formCloseHandler}
            className="xs:w-full md:w-5/12 flex mt-3 flex-row gap-1 items-center justify-center text-blue-700 hover:text-white border-[1px] border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
            value="Cancel"
          />{" "}
        </div>
      </form>
    </div>
  );
};
const TrainingForm = ({
  rec = null,
  formCloseHandler,
  isEditing = false,
}: any) => {
  const dispatch = useDispatch();
  const stepSeven = useSelector((state: any) => state.register.stepSeven);
  const { list, state } = stepSeven;

  useEffect(() => {
    if (rec) {
      formik.setValues(rec);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
    },

    onSubmit: async (values) => {
      const { description } = values;
      const descriptionArray = description.split("\n").filter(Boolean); // Split description by '\n' and remove empty strings

      // Update the values with the description as an array
      const updatedValues = {
        ...values,
        description: descriptionArray,
      };

      const obj = { id: makeid(), ...updatedValues };
      const newList = [obj, ...list];
      dispatch(setStepSeven({ list: newList }));
      dispatch(setStepSeven({ state: "show" }));
      formCloseHandler();
    },

    validationSchema: Yup.object().shape({
      company: Yup.string().required("company is required"),
      position: Yup.string().required("position is required"),
      startDate: Yup.string().required("startDate is required"),
      endDate: Yup.string().required("endDate is required"),
    }),
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="company"
            className="block mb-2 text-sm font-bold text-gray-200"
          >
            Company
          </label>
          <input
            id="company"
            type="text"
            className="w-full px-3 py-2 leading-tight text-gray-200 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            placeholder="Company"
            value={formik.values.company}
            onChange={formik.handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="position"
            className="block mb-2 text-sm font-bold text-gray-200"
          >
            Position
          </label>
          <input
            id="position"
            type="text"
            className="w-full px-3 py-2 leading-tight text-gray-200 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            placeholder="Position"
            onChange={formik.handleChange}
            value={formik.values.position}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="startDate"
            className="block mb-2 text-sm font-bold text-gray-200"
          >
            Start Date
          </label>
          <input
            id="startDate"
            type="date"
            className="w-full px-3 py-2 leading-tight text-gray-200 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            placeholder="Start Date"
            onChange={formik.handleChange}
            value={formik.values.startDate}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="endDate"
            className="block mb-2 text-sm font-bold text-gray-200"
          >
            End Date
          </label>
          <input
            id="endDate"
            type="date"
            className="w-full px-3 py-2 leading-tight text-gray-200 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            onChange={formik.handleChange}
            placeholder="End Date"
            value={formik.values.endDate}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-bold text-gray-200"
          >
            Description
          </label>
          <textarea
            id="description"
            className="w-full px-3 py-2 leading-tight text-gray-200 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            onChange={formik.handleChange}
            placeholder="Description"
            value={formik.values.description}
          ></textarea>
        </div>
        <div className="flex flex-row-reverse items-center justify-end gap-2 mb-4">
          <input
            type="submit"
            className="xs:w-full md:w-5/12 flex mt-3 flex-row gap-1 items-center justify-center text-blue-700 hover:text-white border-[1px] border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
            value={isEditing ? "Update Training" : "Add Training"}
          />
          <input
            type="button"
            onClick={formCloseHandler}
            className="xs:w-full md:w-5/12 flex mt-3 flex-row gap-1 items-center justify-center text-blue-700 hover:text-white border-[1px] border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
            value="Cancel"
          />
        </div>
      </form>
    </div>
  );
};
const LangaugesForm = ({
  rec = null,
  formCloseHandler,
  isEditing = false,
}: any) => {
  const dispatch = useDispatch();
  const stepEleven = useSelector((state: any) => state.register.stepEleven);
  const { list, state } = stepEleven;

  useEffect(() => {
    if (rec) {
      formik.setValues(rec);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      language: "",
      proficiency: "",
    },

    onSubmit: async (values) => {
      const obj = { id: makeid(), ...values };
      const newList = [obj, ...list];
      dispatch(setStepEleven({ list: newList }));
      dispatch(setStepEleven({ state: "show" }));
      formCloseHandler();
    },

    // validationSchema: Yup.object().shape({
    //   company: Yup.string().required("company is required"),
    // }),
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="language"
            className="block mb-2 text-sm font-bold text-gray-200"
          >
            Language
          </label>
          <input
            id="language"
            type="text"
            className="w-full px-3 py-2 leading-tight text-gray-200 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            placeholder="Language"
            value={formik.values.language}
            onChange={formik.handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="proficiency"
            className="block mb-2 text-sm font-bold text-gray-200"
          >
            Proficiency
          </label>
          <select
            id="proficiency"
            value={formik.values.proficiency}
            onChange={formik.handleChange}
            className="w-full px-3 py-2 leading-tight text-gray-200 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
        <div className="flex flex-row-reverse items-center justify-end gap-2 mb-4">
          <input
            type="submit"
            className="xs:w-full md:w-5/12 flex mt-3 flex-row gap-1 items-center justify-center text-blue-700 hover:text-white border-[1px] border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
            value={isEditing ? "Update Language" : "Add Language"}
          />
          <input
            type="button"
            onClick={formCloseHandler}
            className="xs:w-full md:w-5/12 flex mt-3 flex-row gap-1 items-center justify-center text-blue-700 hover:text-white border-[1px] border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
            value="Cancel"
          />
        </div>
      </form>
    </div>
  );
};

const StepCustom = () => {
  const [expanded, setExpanded] = useState<{
    languages: boolean;
    references: boolean;
    publications: boolean;
    certifications: boolean;
    awards: boolean;
    interests: boolean;
    trainings: boolean;
  }>({
    languages: false,
    references: false,
    publications: false,
    awards: false,
    interests: false,
    certifications: false,
    trainings: false,
  });

  const stepEight = useSelector((state: any) => state.register.stepEight);
  const { list: publicationsList } = stepEight;
  const stepSix = useSelector((state: any) => state.register.stepSix);
  const { list: certificationsList } = stepSix;
  const stepSeven = useSelector((state: any) => state.register.stepSeven);
  const { list: trainingsList } = stepSeven;
  const stepNine = useSelector((state: any) => state.register.stepNine);
  const { list: awardsList } = stepNine;
  const stepTen = useSelector((state: any) => state.register.stepTen);
  const { list: interestsList } = stepTen;
  const stepEleven = useSelector((state: any) => state.register.stepEleven);
  const { list: languagesList } = stepEleven;
  const stepTwelve = useSelector((state: any) => state.register.stepTwelve);
  const { list: referencesList } = stepTwelve;

  const setExpandedHelper = (key: string) => {
    setExpanded((prev: any) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="flex flex-col items-start justify-start gap-4 ">
      {/* publications */}
      <div className="w-full">
        <h1 className="flex items-center justify-between text-xl font-bold leading-tight tracking-tight xs:my-5 md:mt-2 dark:text-gray-100 text-gray-950 ">
          Publications
        </h1>
        {publicationsList.length === 0 && <p>No Publications Added</p>}
        <div className="w-[100%] grid grid-cols-2 xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 mt-4 xs:mt-2  gap-4 md:gap-2 lg:gap-4 xl:gap-6  ">
          {publicationsList.map((rec: Publication) => (
            <div key={rec.id}>
              <RecordCard
                rec={rec}
                recName={"publications"}
                formCloseHandler={() => setExpandedHelper("publications")}
              />
            </div>
          ))}
        </div>

        {expanded.publications ? (
          <PublicationsForm
            formCloseHandler={() => setExpandedHelper("publications")}
          />
        ) : (
          <AddItemBtn onClick={() => setExpandedHelper("publications")} />
        )}
      </div>
      {/* certifications */}
      <div className="w-full">
        <h1 className="flex items-center justify-between text-xl font-bold leading-tight tracking-tight xs:my-5 md:mt-2 dark:text-gray-100 text-gray-950 ">
          Certifications
        </h1>
        {certificationsList.length === 0 && <p>No Certifications Added</p>}
        <div className="w-[100%] grid grid-cols-2 xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 mt-4 xs:mt-2  gap-4 md:gap-2 lg:gap-4 xl:gap-6  ">
          {certificationsList.map((rec: Certification) => (
            <div key={rec.id}>
              <RecordCard
                rec={rec}
                recName={"certifications"}
                formCloseHandler={() => setExpandedHelper("certifications")}
              />
            </div>
          ))}
        </div>
        {expanded.certifications ? (
          <CertificationsForm
            formCloseHandler={() => setExpandedHelper("certifications")}
          />
        ) : (
          <AddItemBtn onClick={() => setExpandedHelper("certifications")} />
        )}
      </div>
      {/* awards */}
      <div className="w-full">
        <h1 className="flex items-center justify-between text-xl font-bold leading-tight tracking-tight xs:my-5 md:mt-2 dark:text-gray-100 text-gray-950 ">
          Awards
        </h1>
        {awardsList.length === 0 && <p>No Awards Added</p>}
        <div className="w-[100%] grid grid-cols-2 xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 mt-4 xs:mt-2  gap-4 md:gap-2 lg:gap-4 xl:gap-6  ">
          {awardsList.map((rec: Award) => (
            <div key={rec.id}>
              <RecordCard
                rec={rec}
                recName={"awards"}
                formCloseHandler={() => setExpandedHelper("awards")}
              />
            </div>
          ))}
        </div>
        {expanded.awards ? (
          <AwardsForm formCloseHandler={() => setExpandedHelper("awards")} />
        ) : (
          <AddItemBtn onClick={() => setExpandedHelper("awards")} />
        )}
      </div>
      {/* references */}
      <div className="w-full">
        <h1 className="flex items-center justify-between text-xl font-bold leading-tight tracking-tight xs:my-5 md:mt-2 dark:text-gray-100 text-gray-950 ">
          References
        </h1>
        {referencesList.length === 0 && <p>No References Added</p>}
        <div className="w-[100%] grid grid-cols-2 xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 mt-4 xs:mt-2  gap-4 md:gap-2 lg:gap-4 xl:gap-6  ">
          {referencesList.map((rec: Reference) => (
            <div key={rec.id}>
              <RecordCard
                rec={rec}
                recName={"references"}
                formCloseHandler={() => setExpandedHelper("references")}
              />
            </div>
          ))}
        </div>
        {expanded.references ? (
          <ReferencesForm
            formCloseHandler={() => setExpandedHelper("references")}
          />
        ) : (
          <AddItemBtn onClick={() => setExpandedHelper("references")} />
        )}
      </div>
      {/* trainings */}
      <div className="w-full">
        <h1 className="flex items-center justify-between text-xl font-bold leading-tight tracking-tight xs:my-5 md:mt-2 dark:text-gray-100 text-gray-950 ">
          Trainings
        </h1>
        {trainingsList.length === 0 && <p>No Trainings Added</p>}
        <div className="w-[100%] grid grid-cols-2 xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 mt-4 xs:mt-2  gap-4 md:gap-2 lg:gap-4 xl:gap-6  ">
          {trainingsList.map((rec: Training) => (
            <div key={rec.id}>
              <RecordCard
                rec={rec}
                recName={"trainings"}
                formCloseHandler={() => setExpandedHelper("trainings")}
              />
            </div>
          ))}
        </div>

        {expanded.trainings ? (
          <TrainingForm
            formCloseHandler={() => setExpandedHelper("trainings")}
          />
        ) : (
          <AddItemBtn onClick={() => setExpandedHelper("trainings")} />
        )}
      </div>
      {/* interests */}
      <div className="w-full">
        <h1 className="flex items-center justify-between text-xl font-bold leading-tight tracking-tight xs:my-5 md:mt-2 dark:text-gray-100 text-gray-950 ">
          Interests & Hobbies
        </h1>
        {interestsList.length === 0 && <p>No Interests Added</p>}
        <div className="w-[100%] grid grid-cols-2 xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 mt-4 xs:mt-2  gap-4 md:gap-2 lg:gap-4 xl:gap-6  ">
          {interestsList.map((rec: Interest) => (
            <div key={rec.id}>
              <RecordCard
                rec={rec}
                recName={"interests"}
                formCloseHandler={() => setExpandedHelper("interests")}
              />
            </div>
          ))}
        </div>
        {expanded.interests ? (
          <InterestsForm
            formCloseHandler={() => setExpandedHelper("interests")}
          />
        ) : (
          <AddItemBtn onClick={() => setExpandedHelper("interests")} />
        )}
      </div>
      {/* languages */}
      <div className="w-full">
        <h1 className="flex items-center justify-between text-xl font-bold leading-tight tracking-tight xs:my-5 md:mt-2 dark:text-gray-100 text-gray-950 ">
          Languages
        </h1>
        {languagesList.length === 0 && <p>No Languages Added</p>}
        <div className="w-[100%] grid grid-cols-2 xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 mt-4 xs:mt-2  gap-4 md:gap-2 lg:gap-4 xl:gap-6  ">
          {languagesList.map((rec: Language) => (
            <div key={rec.id}>
              <RecordCard
                rec={rec}
                recName={"languages"}
                formCloseHandler={() => setExpandedHelper("languages")}
              />
            </div>
          ))}
        </div>
        {expanded.languages ? (
          <LangaugesForm
            formCloseHandler={() => setExpandedHelper("languages")}
          />
        ) : (
          <AddItemBtn onClick={() => setExpandedHelper("languages")} />
        )}
      </div>
    </div>
  );
};

export default StepCustom;
