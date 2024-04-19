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
import useHandler from "@/hooks/useHandler";
import { makeid } from "@/helpers/makeid";

const years = getYearsList();

const CustomForm = ({ setShowCustomForm, recName }: any) => {
  const {handlers} = useHandler()
  const formHandlers: any = {
    publications: async (values: any) => {
      console.log("publications is submitted", values);
      
      handlers.handleAddNewDetails(recName, values)

    },
    certifications: async (values: any) => {
      console.log("certification is submitted", values);
      handlers.handleAddNewDetails(recName, values)

    },
    trainings: async (values: any) => {
      console.log("trainings is submitted", values);
      handlers.handleAddNewDetails(recName, values)

    },
    awards: async (values: any) => {
      console.log("awards is submitted", values);
      handlers.handleAddNewDetails(recName, values)

    },
    interests: async (values: any) => {
      console.log("interests is submitted", values);
      handlers.handleAddNewDetails(recName, values)

    },
    references: async (values: any) => {
      console.log("references is submitted", values);
      handlers.handleAddNewDetails(recName, values)

    },
    languages: async (values: any) => {
      console.log("languages is submitted", values);
      handlers.handleAddNewDetails(recName, values)

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
      {recName === "interests" && (
        <InterestsForm
          formCloseHandler={() => setShowCustomForm(false)}
          formSubmitHandler={formHandlers.interest}
        />
      )}
      {recName === "references" && (
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
