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
  skillHeading: string;
  skill_ul: string;
  skill_li: string;
  skillNewStyle: string;

  customStyle?: any;
};
const Skill = ({
  heading,
  skills,
  skillHeading,
  skill_ul,
  skill_li,
  skillNewStyle,

  customStyle,
}: Props) => {
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
            className={` ${
              customStyle.borderTopBottom ? "!block" : "hidden"
            }  border-stylee w-full h-0 border-[1px] mt-6 !border-gray-900`}
          ></span>
          <h2
            className={`${skillHeading} ${
              customStyle.centerHeading ? "justify-center" : "justify-left"
            }`}
          >
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
            className={` ${
              customStyle.borderTopBottom ? "!block" : "hidden"
            }  border-stylee w-full h-0 border-[1px] !border-gray-900 mb-3`}
          ></span>
        </>
      )}
      {skills && skills.length > 0 && !regenerating ? (
        <Toolbar addSkill={handleAddSkills} regenerateSkills={getPrimarySkills}>
          <ul
            className={`${skill_ul} ${
              customStyle.borderTopBottom ? "!list-disc" : ""
            }`}
          >
            {skills.map((skill: string, i: number) => (
              <li
                className={`${skill_li} parent`}
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
                <div className={`${skillNewStyle}`}>
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
