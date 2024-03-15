"use client";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const normalizeValue = (value: string) => {
  if (typeof value === "string") {
    // Remove line breaks and multiple whitespaces
    return value.replace(/\n/g, " ").replace(/\s\s+/g, " ").trim();
  } else {
    return "";
  }
};
const EditableField = ({
  overrideValue,
  value,
  type,
  rows,
  className,
  onSave,
  style,
}: {
  value: string;
  overrideValue?: string;
  type?: string;
  rows?: number;
  style?: any;
  className?: any;
  onSave: (value: string) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  let new_value: any = normalizeValue(value);
  const [editedValue, setEditedValue] = useState<any>(new_value);
  const [inputWidth,setInputWidth] = useState<any>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const spanRef = useRef<HTMLInputElement>(null);
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
      inputRef.current.style.width = `${inputWidth}px`; // Set width to scrollWidth
    }
    
  }, [value, isEditing]);
  useEffect(() => {
    if(spanRef.current?.scrollWidth){
      setInputWidth(spanRef.current?.scrollWidth+10)
    }
  },[spanRef.current?.scrollWidth]);

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
          <>
            {/* <a
              href={value}
              className=" xs:hidden md:hidden hover:cursor-text text-justify"
              title="Click to Edit"
            >
              {value}
            </a> */}
            <span
              ref={spanRef}
              className="hidden w-fit xs:block md:block hover:cursor-text text-justify"
              title="Click to Edit"
            >
              {value}
            </span>
            </>
        )}
      </span>
    </>
  );
};

export default EditableField;
