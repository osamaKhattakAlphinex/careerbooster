"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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
  const [editedValue, setEditedValue] = useState(value);

  const userData = useSelector((state: any) => state.userData);
  const handleBlur = () => {
    setIsEditing(false);
    onSave(editedValue);
  };

  useEffect(() => {
    if (value !== editedValue) {
      setEditedValue(value);
    }
  }, [value]);

  return (
    <>
      <span
        onClick={() => {
          setIsEditing(true);
        }}
        className=""
      >
        {userData?.creditPackage && isEditing ? (
          <>
            {type === "textarea" ? (
              <textarea
                value={editedValue}
                className={`bg-transparent pr-2 w-full hover:cursor-text h-auto ${className}`}
                rows={rows ? rows : 15}
                onChange={(e: any) => setEditedValue(e.target.value)}
                autoFocus
                onBlur={handleBlur}
              />
            ) : (
              <input
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
