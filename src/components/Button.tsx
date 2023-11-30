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
  const buttonClasses = isActive ? "border-fuchsia-600" : " border-[#312E37] ";
  return (
    <div>
      <button
        className={`border ${
          isActive ? `text-fuchsia-600 font-semibold ` : `text-neutral-400`
        } ${textColor}  ${buttonClasses} ${bgColor} rounded-full lg:px-[28px] px-[12px] lg:py-[9px] py-[6px] lg:text-[14px] text-[9px] lg:mr-[13px] mr-[6px]`}
        onClick={onClick}
      >
        {btnText}
      </button>
    </div>
  );
};

export default Button;
