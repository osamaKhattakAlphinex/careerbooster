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
          isActive
            ? `text-fuchsia-600 font-semibold `
            : `dark:text-[#A3A3A3] text-gray-950`
        } ${textColor}  ${buttonClasses} ${bgColor} rounded-full px-[28px] py-[9px] text-[14px] mr-[5px]`}
        onClick={onClick}
      >
        {btnText}
      </button>
    </div>
  );
};

export default Button;
