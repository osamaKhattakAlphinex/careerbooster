"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getYearsList, months } from "@/helpers/listsProvider";
import { useSelector } from "react-redux";
import useUpdateAndSave from "@/hooks/useUpdateAndSave";
import {
  AwardsForm,
  CertificationsForm,
  InterestsForm,
  LangaugesForm,
  PublicationsForm,
  ReferencesForm,
  TrainingForm,
} from "../profileReview/StepCustom";
import { debug } from "console";

const years = getYearsList();

const CustomForm = ({ setShowCustomForm, recName }: any) => {
  const formHandlers: any = {
    publications: async (values: any) => {
      console.log("publications is submitted", values);
    },
    certifications: async (values: any) => {
      console.log("certification is submitted", values);
    },
    trainings: async (values: any) => {
      console.log("trainings is submitted", values);
    },
    awards: async (values: any) => {
      console.log("awards is submitted", values);
    },
    interest: async (values: any) => {
      console.log("interests is submitted", values);
    },
    refrence: async (values: any) => {
      console.log("references is submitted", values);
    },
    languages: async (values: any) => {
      console.log("languages is submitted", values);
    },
  };

  return (
    <>
      {recName === "publications" && (
        <PublicationsForm
          formCloseHandler={() => setShowCustomForm(false)}
          formSubmitHandler={formHandlers[recName]}
        />
      )}
      {recName === "certifications" && (
        <CertificationsForm
          formCloseHandler={() => setShowCustomForm(false)}
          formSubmitHandler={formHandlers.certifications}
        />
      )}
      {recName === "trainings" && (
        <TrainingForm
          formCloseHandler={() => setShowCustomForm(false)}
          formSubmitHandler={formHandlers.trainings}
        />
      )}
      {recName === "awards" && (
        <AwardsForm
          formCloseHandler={() => setShowCustomForm(false)}
          formSubmitHandler={formHandlers.awards}
        />
      )}
      {recName === "interest" && (
        <InterestsForm
          formCloseHandler={() => setShowCustomForm(false)}
          formSubmitHandler={formHandlers.interest}
        />
      )}
      {recName === "refrence" && (
        <ReferencesForm
          formCloseHandler={() => setShowCustomForm(false)}
          formSubmitHandler={formHandlers.refrence}
        />
      )}
      {recName === "languages" && (
        <LangaugesForm
          formCloseHandler={() => setShowCustomForm(false)}
          formSubmitHandler={formHandlers.languages}
        />
      )}
    </>
  );
};

export default CustomForm;
