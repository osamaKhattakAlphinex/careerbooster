"use client";
import { deleteIcon } from "@/helpers/iconsProvider";
import { setStepSix } from "@/store/registerSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type Skill = string;
const suggestedSkillsValues = [
  "Team Management",
  "Leadership",
  "Communication Skills",
  "Problem Solving",
  "Time Management",
  "Decision Making",
  "Motivation",
  "Adaptability",
  "Creativity",
  "Interpersonal Skills",
  "Collaboration",
  "Persuasion",
  "Emotional Intelligence",
  "Stress Management",
  "Active Listening",
  "Conflict Resolution",
  "Negotiation",
  "Critical Thinking",
  "Empathy",
  "Customer Service",
  "Sales Skills",
];

const StepSix = () => {
  const dispatch = useDispatch();
  const stepSix = useSelector((state: any) => state.register.stepSix);
  const { list } = stepSix;
  const [newSkill, setNewSkill] = useState("");
  const [suggestedSkills, setSuggestedSkills] = useState<Skill[]>(
    suggestedSkillsValues
  );

  const addSkill = (e: any) => {
    e.preventDefault();
    if (newSkill.trim() !== "") {
      dispatch(setStepSix({ list: [newSkill, ...list] }));
      setNewSkill("");
    }
  };

  const removeSkill = (skillIndex: number) => {
    const updatedSkills = list.filter(
      (_: Skill, index: number) => index !== skillIndex
    );
    dispatch(setStepSix({ list: updatedSkills }));
  };

  const addSuggestedSkill = (suggestedSkill: Skill) => {
    // remove from suggested skills
    const updatedSuggestedSkills = suggestedSkills.filter(
      (skill) => skill !== suggestedSkill
    );
    setSuggestedSkills(updatedSuggestedSkills);

    dispatch(setStepSix({ list: [suggestedSkill, ...list] }));
  };

  return (
    <div className="w-full max-w-md mx-auto ">
      <h2 className="text-2xl font-semibold mb-4">Skills</h2>
      <div className="mb-4">
        {list.length === 0 ? (
          <p className="text-xs mb-2">No Skills Found</p>
        ) : (
          <>
            <h3 className="text-lg font-medium mb-2">Your Skills</h3>
            <ul className="space-y-2">
              {list.map((skill: string, index: number) => (
                <li
                  key={index}
                  className="flex items-center justify-between bg-white rounded-md shadow-md border p-3"
                >
                  <span>{skill}</span>
                  <button
                    onClick={() => removeSkill(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    {deleteIcon}
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Add New Skill</h3>
        <div className="">
          <form onSubmit={addSkill} className="flex space-x-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter a skill..."
            />
            <button
              type="submit"
              onClick={addSkill}
              className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
            >
              Add
            </button>
          </form>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-2">Suggested Skills</h3>
        <p className="text-xs mb-2">
          Click on any of the suggested skills from below and add them to your
          profile
        </p>
        <ul className="flex flex-wrap space-x-2">
          {suggestedSkills.map((suggestedSkill, index) => (
            <li
              key={index}
              onClick={() => addSuggestedSkill(suggestedSkill)}
              className="cursor-pointer text-gray-800 rounded-full bg-gray-100 hover:bg-gray-200 border px-3 py-1 m-1"
            >
              {suggestedSkill}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StepSix;
