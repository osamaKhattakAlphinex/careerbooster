<<<<<<< HEAD
=======
import Link from "next/link";
>>>>>>> osama

interface Props {
  show: boolean;
  onClose: () => void;
}
const Alert = ({ show, onClose }: Props) => {
<<<<<<< HEAD
   
  if (!show) return null;

  return (
    <div className="flex justify-center mb-7 items-center bg-[#312E37] bg-opacity-[35%] w-full h-[80px]  rounded-xl p-2 cursor-pointer">
      <div className="w-7 h-7 mr-3 text-stone-950 rounded-full bg-yellow-400 flex justify-center items-center font-extrabold text-[14px] ">
        !
      </div>
      <p className="text-gray-300 text-[16px]">
        {" "}
        <span className="w-8 h-8 text-white mr-2 font-bold text-[14px] ">
          Important!
        </span>
        Complete your profile to get butter result
      </p>

      <div
        className="bg-yellow-400 cursor-pointer ml-4 font-bold text-stone-950 rounded-full px-[28px] py-[11px] text-[14px] mx-[13px]`"
        onClick={onClose}
      >
        Complete now
      </div>
=======
  if (!show) return null;

  return (
    <div className="flex lg:flex-row flex-col justify-center mb-7 items-center bg-[#312E37] bg-opacity-[35%] w-full lg:h-[80px]  rounded-xl px-2 lg:py-[8px] py-[12px] pcursor-pointer">
      <div className="flex justify-center ">
        <div className="lg:w-7 lg:h-7 w-2 h-2 p-2 mr-3 text-stone-950 rounded-full bg-yellow-400 flex justify-center items-center font-extrabold lg:text-[14px] text-[12px]">
          !
        </div>
        <p className="text-gray-300 lg:text-[16px] text-[12px]">
          {" "}
          <span className=" text-white mr-2 font-bold lg:text-[14px] text-[12px] ">
            Important!
          </span>
          Complete your profile to get butter result
        </p>
      </div>

      <Link
        className="bg-yellow-400 cursor-pointer ml-4 font-bold text-stone-950 rounded-full lg:px-[28px] px-[20px] lg:py-[11px] py-[7px] lg:text-[14px] text-[12px] mx-[13px] flex flex-col mt-[10px] lg:mt-[0px] `"
        href="/profile-review"
      >
        Complete now
      </Link>
>>>>>>> osama
    </div>
  );
};
export default Alert;
