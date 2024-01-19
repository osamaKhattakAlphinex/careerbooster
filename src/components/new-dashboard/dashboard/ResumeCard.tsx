import { rocketLaunch, trashIcon } from "@/helpers/newIconsProviders";
// import PencilLine from "@/../public/icon/PencilLine.png";
import PencilLine from "@/../public/Ai tools/icon/PencilLine.png";
import Image from "next/image";
const ResumeCard = () => {
  return (
    <div className="w-[347px] h-[160px] bg-[#222027] rounded-xl my-[18px] py-[18px]">
      <div className="">
        <div className="mx-3 border-gray-600 leading-6">
          <h2 className="text-[15px] capitalize text-white font-medium  ">
            Java Developer
          </h2>
          <h3 className="text-[13px] uppercase font-semibold text-[#959595] flex items-center">
            {" "}
            <i className="mr-1">{rocketLaunch}</i> Manager
          </h3>
          <h4 className="uppercase text-[#959595] font-medium  text-[13px]">
            Created on{":"} 17/10/23{","}11{":"}57 PM
          </h4>
        </div>
      </div>
      <div className="flex justify-between mx-3 my-3">
        <button className=" w-[36px] flex justify-center items-center rounded-full h-[36px] bg-zinc-900 border-[2px] border-zinc-800">
          <Image src={PencilLine} alt="Image Not Found" />
        </button>
        <button className="w-[36px] flex justify-center items-center rounded-full h-[36px] bg-zinc-900 border-[2px] border-zinc-800">
          {trashIcon}
        </button>
        <button className="text-[14px] w-[217px] h-[32px] rounded-full bg-zinc-900 text-green-500 border-[1px] border-green-500">
          Download
        </button>
      </div>
    </div>
  );
};
export default ResumeCard;
