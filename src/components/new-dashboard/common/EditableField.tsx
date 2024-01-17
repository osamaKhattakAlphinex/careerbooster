"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const EditableField = ({
  value,
  type,
  rows,
  onSave,
  style,
}: {
  value: string;
  type?: string;
  rows?: number;
  style?: any;
  onSave: (value: string) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);
  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShowPopup(false);
    }, 5000);
    // Clean up the timeout to avoid memory leaks
  }, [showPopup]); // The empty dependency array ensures that this effect runs only once after the initial render

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
  const showAlertpopupFun = () => {
    !userData?.userPackageData?.limit?.can_edit_resume &&
      alert("please upgrade to pro plan in order to edit !");
  };
  return (
    <>
      <span
        onClick={() => {
          setIsEditing(true);
          //showAlertpopupFun();
        }}
        onBlur={handleBlur}
        className=""
      >
        {userData?.creditPackage && isEditing ? (
          <>
            {type === "textarea" ? (
              <textarea
                value={editedValue}
                className="bg-transparent pr-2 w-full hover:cursor-text h-auto"
                rows={rows ? rows : 15}
                onChange={(e: any) => setEditedValue(e.target.value)}
                autoFocus
                onBlur={handleBlur}
              />
            ) : (
              <input
                type="text"
                value={editedValue}
                className="bg-transparent pr-2 hover:cursor-text"
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
