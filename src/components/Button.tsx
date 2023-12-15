import React from "react";

const Button = ({
  isActive = false,
  btnText,
  bgColor,
  onClick,
  textColor,
}: {
  isActive?: Boolean;
  btnText: String;
  bgColor?: String;
  onClick?: any;
  textColor?: any;
}) => {
  // Define a set of classes based on the 'isActive' prop
  const buttonClasses = isActive ? "borderFuscia" : " borderLight ";
  return (
    <div>
      <button
        style={{
          border: buttonClasses,
        }}
        className={` ${
          isActive ? `text-fuchsia-600 font-semibold ` : `text-black`
        } ${textColor}  ${buttonClasses} ${bgColor}  rounded-full lg:px-[28px] px-[12px] lg:py-[9px] py-[6px] lg:text-[14px] text-[12px] lg:mr-[13px] mr-[6px] hover:bg-opacity-95 hover:font-semibold`}
        onClick={onClick}
      >
        {btnText}
      </button>
    </div>
  );
};

export default Button;
