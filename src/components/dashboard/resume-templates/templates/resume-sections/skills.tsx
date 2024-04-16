"use client";
import Toolbar from "@/components/dashboard/Toolbar";
import React, { useState } from "react";
import useGetPrimarySkills from "@/hooks/useGetPrimarySkills";
import useDragAndDrop from "@/hooks/useDragAndDrop";
import EditableField from "@/components/dashboard/EditableField";
import useHandler from "@/hooks/useHandler";
import { crossIcon1 } from "@/helpers/iconsProvider";
import useAddPrimarySkill from "@/hooks/useAddPrimarySkill";

type Props = {
  skills: any;
  setRegenerating: any;
};
const Skill = ({ skills, setRegenerating }: Props) => {
  const [primarySkill, setPrimarySkill] = useState<string>("");

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
  
      <Toolbar addSkill={handleAddSkills} regenerateSkills={getPrimarySkills}>
        <ul className="flex flex-row flex-wrap gap-1 text-xs border-2 border-transparent hover:border-dashed hover:border-gray-500 ">
          {skills.map((skill: string, i: number) => (
            <li
              className=" px-4 py-2 bg-gray-300 border-transparent border-[1px] rounded-full hover:shadow-md hover:cursor-move parent hover:border-dashed hover:border-gray-500 hover:border  hover:bg-gray-100 flex justify-between items-center"
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
              <div className="w-full rounded-2xl  border-[1px] border-black flex h-9.5">
                <input
                  type="text"
                  value={primarySkill}
                  placeholder="Please add Skill"
                  className="w-full px-2 bg-white outline-none rounded-2xl"
                  autoFocus
                  onChange={(e) => setPrimarySkill(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSaveSkills();
                    }
                  }}
                />
                <button
                  className="px-2 text-white uppercase bg-green-500 h-9 rounded-r-2xl"
                  onClick={handleSaveSkills}
                >
                  save
                </button>
              </div>
              <button
                onClick={() => {
                  setNewPrimarySkill(false);
                }}
                className="px-2 py-1 text-white bg-red-500 rounded-full"
              >
                Cancel
              </button>
            </>
          ) : (
            " "
          )}
        </ul>
      </Toolbar>
  
  );
};

export default Skill;
