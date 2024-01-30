"use client";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const normalizeValue = (value: string) => {
  if (typeof value === "string") {
    return value.replace(/\n/g, " ").replace(/\s\s+/g, " ").trim();
  } else {
    return "";
  }
  // Remove line breaks and multiple whitespaces
};
const EditableField = ({
  value,
  type,
  rows,
  className,
  onSave,
  style,
}: {
  value: string;
  type?: string;
  rows?: number;
  style?: any;
  className?: any;
  onSave: (value: string) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  let new_value: any = normalizeValue(value);
  const [editedValue, setEditedValue] = useState<any>(new_value);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const userData = useSelector((state: any) => state.userData);
  const handleBlur = () => {
    setIsEditing(false);
    onSave(editedValue);
  };

  useEffect(() => {
    if (value !== editedValue) {
      setEditedValue(normalizeValue(value));
    }
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";

      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
    if (inputRef.current) {
      inputRef.current.style.width = "auto"; // Reset width to auto
      inputRef.current.style.width = `${inputRef.current.scrollWidth - 30}px`; // Set width to scrollWidth
    }
  }, [value, isEditing]);

  return (
    <>
      <span
        onClick={() => {
          setIsEditing(true);
        }}
      >
        {userData?.creditPackage && isEditing ? (
          <>
            {type === "textarea" ? (
              <textarea
                ref={textareaRef}
                value={editedValue}
                className={`bg-transparent w-full hover:cursor-text ${className} resize-none overflow-y-hidden`}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setEditedValue(e.target.value)
                }
                autoFocus
                onBlur={handleBlur}
              />
            ) : (
              <input
                ref={inputRef}
                type="text"
                value={editedValue}
                className={`bg-transparent pr-2 hover:cursor-text ${className}`}
                style={style ? style : {}}
                onChange={(e: any) => setEditedValue(e.target.value)}
                autoFocus
                onBlur={handleBlur}
              />
            )}
          </>
        ) : (
          <span className="hover:cursor-text" title="click to edit">
            {value}
          </span>
        )}
      </span>
    </>
  );
};

export default EditableField;
