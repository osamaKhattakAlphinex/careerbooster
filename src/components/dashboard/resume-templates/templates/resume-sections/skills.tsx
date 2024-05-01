"use client";
import Toolbar from "@/components/dashboard/Toolbar";
import React, { useState } from "react";
import useGetPrimarySkills from "@/hooks/useGetPrimarySkills";
import useDragAndDrop from "@/hooks/useDragAndDrop";
import EditableField from "@/components/dashboard/EditableField";
import useHandler from "@/hooks/useHandler";
import { crossIcon1, resumeSkillsIcon } from "@/helpers/iconsProvider";
import useAddPrimarySkill from "@/hooks/useAddPrimarySkill";
import Loader from "@/components/common/Loader";
import useUpdateAndSave from "@/hooks/useUpdateAndSave";

type Props = {
  heading: any;
  skills: any;
  styles: any;
  customStyle?: any;
};
const Skill = ({ heading, skills, styles, customStyle }: Props) => {
  const [primarySkill, setPrimarySkill] = useState<string>("");
  const [regenerating, setRegenerating] = useState(false);
  const { updateSaveHook } = useUpdateAndSave();

  const { getPrimarySkills } = useGetPrimarySkills(setRegenerating);
  const [newPrimarySkill, setNewPrimarySkill] = useState(false);
  const { addPrimarySkill } = useAddPrimarySkill();

  const { handleDropPrimary } = useDragAndDrop();
  const handleAddSkills = () => {
    setNewPrimarySkill(true);
  };
  const handleSaveSkills = () => {
    if (primarySkill.trim() !== "") {
      addPrimarySkill(primarySkill);
      setPrimarySkill("");
    }
  };
  const { handlers } = useHandler();

  return (
    <>
      {skills && skills.length > 0 && (
        <>
          <span
            className={`${styles?.span1} ${
              customStyle?.borderTopBottom ? "!block" : "hidden"
            }`}
          ></span>
          <h2 className={`${styles?.skill_heading} `}>
            {resumeSkillsIcon}
            <EditableField
              value={heading ? heading : "Skills"}
              style={{ width: "fit-content" }}
              onSave={(value: string) => {
                if (value !== heading) {
                  updateSaveHook.updateAndSaveHeadings({
                    primarySkills: value,
                  });
                }
              }}
            />
          </h2>

          <span
            className={`${styles?.span2} ${
              customStyle?.borderTopBottom || customStyle?.borderBottom
                ? "!block"
                : "hidden"
            }`}
          ></span>
        </>
      )}
      {skills && skills.length > 0 && !regenerating ? (
        <Toolbar addSkill={handleAddSkills} regenerateSkills={getPrimarySkills}>
          <ul className={`${styles?.skill_ul} as`}>
            {skills.map((skill: string, i: number) => (
              <li
                className={`${styles?.skill_li} parent before:text-white before:text-base before:h-4 before:w-4
                  before:aspect-square before:mr-1 before:content-['\\2022\']
                `}
                key={i}
                onDragStart={(e) =>
                  e.dataTransfer.setData("text/plain", i.toString())
                }
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDropPrimary(e, i)}
                draggable
              >
                <EditableField
                  value={skill}
                  onSave={(value: string) => {
                    handlers.handleUpdateSkill(value, i);
                  }}
                />
                <div
                  onClick={() => handlers.handleDeleteSkill(i)}
                  className="w-4 h-4 cursor-pointer child"
                >
                  {crossIcon1}
                </div>
              </li>
            ))}
            {newPrimarySkill ? (
              <>
                <div className={`${styles?.skill_New}`}>
                  <input
                    type="text"
                    value={primarySkill}
                    placeholder="Please add Skill"
                    className="skill-input-temp-2"
                    autoFocus
                    onChange={(e) => setPrimarySkill(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleSaveSkills();
                      }
                    }}
                  />
                  <button className={`skill-Save`} onClick={handleSaveSkills}>
                    save
                  </button>
                </div>
                <button
                  onClick={() => {
                    setNewPrimarySkill(false);
                  }}
                  className="skill-cancel"
                >
                  Cancel
                </button>
              </>
            ) : (
              " "
            )}
          </ul>
        </Toolbar>
      ) : (
        <div className="text-center">
          <div role="status">
            <Loader />
          </div>
        </div>
      )}
    </>
  );
};

export default Skill;
