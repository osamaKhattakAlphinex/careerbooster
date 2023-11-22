
interface Props {
  show: boolean;
  onClose: () => void;
}
const Alert = ({ show, onClose }: Props) => {
   
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
    </div>
  );
};
export default Alert;
