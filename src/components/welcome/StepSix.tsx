"use client";
import React, { useState } from "react";

type Skill = string;

const StepSix = () => {
  const [skills, setSkills] = useState<Skill[]>([
    "React",
    "HTML",
    "CSS",
    "PHP",
  ]);
  const [newSkill, setNewSkill] = useState("");
  const [suggestedSkills] = useState<Skill[]>([
    "JavaScript",
    "Python",
    "Node.js",
    "SQL",
  ]);

  const addSkill = () => {
    if (newSkill.trim() !== "") {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillIndex: number) => {
    const updatedSkills = skills.filter((_, index) => index !== skillIndex);
    setSkills(updatedSkills);
  };

  const addSuggestedSkill = (suggestedSkill: Skill) => {
    setSkills([...skills, suggestedSkill]);
  };

  return (
    <div className="w-full max-w-md mx-auto ">
      <h2 className="text-2xl font-semibold mb-4">Skills</h2>
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Your Skills</h3>
        <ul className="space-y-2">
          {skills.map((skill, index) => (
            <li
              key={index}
              className="flex items-center justify-between bg-white rounded-md shadow-md border p-3"
            >
              <span>{skill}</span>
              <button
                onClick={() => removeSkill(index)}
                className="text-red-500 hover:text-red-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Add New Skill</h3>
        <div className="flex space-x-2">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter a skill..."
          />
          <button
            onClick={addSkill}
            className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
          >
            Add
          </button>
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
              className="cursor-pointer text-blue-500 hover:text-blue-700"
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
