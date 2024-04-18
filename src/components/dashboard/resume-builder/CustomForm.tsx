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
const years = getYearsList();

const CustomForm = ({ setShowCustomForm, recName }: any) => {
  return (
    <>
      {recName === "publications" && (
        <PublicationsForm formCloseHandler={() => setShowCustomForm(false)} />
      )}
      {recName === "certifications" && (
        <CertificationsForm formCloseHandler={() => setShowCustomForm(false)} />
      )}
      {recName === "trainings" && (
        <TrainingForm formCloseHandler={() => setShowCustomForm(false)} />
      )}
      {recName === "awards" && (
        <AwardsForm formCloseHandler={() => setShowCustomForm(false)} />
      )}
      {recName === "interest" && (
        <InterestsForm formCloseHandler={() => setShowCustomForm(false)} />
      )}
      {recName === "refrence" && (
        <ReferencesForm formCloseHandler={() => setShowCustomForm(false)} />
      )}
      {recName === "languages" && (
        <LangaugesForm formCloseHandler={() => setShowCustomForm(false)} />
      )}
    </>
   
  );
};

export default CustomForm;
