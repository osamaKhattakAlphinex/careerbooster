import Image from "next/image";
import Link from "next/link";
import logo from "@/../public/logo.svg";
import profile from "@/../public/Ai tools/profile/man.jpg";
import {
  arrowLeft,
  dollarIcon,
  flagIcon,
  homeIcon,
  linkIcon,
  powerIcon,
  settingIcon,
  starIcon,
  ticketIcon,
} from "@/helpers/newIconsProviders";
import Button from "../Button";

const items = [
  { icon: homeIcon, text: "Dashboard" },
  { icon: dollarIcon, text: "My Billing" },
  { icon: flagIcon, text: "User Guide" },
  { icon: ticketIcon, text: "My Tickets" },
  { icon: starIcon, text: "Write Review" },
  { icon: linkIcon, text: "Affiliate Program" },
  { icon: settingIcon, text: "Settings" },
  { icon: powerIcon, text: "Logout" },
];

const SideBar = () => {
  return (
    <div className="fixed pb-10 inset-0 sm:left-0 w-[244px]  bg-zinc-900 overflow-y-auto z-10 transition-all">
      <div className="">
        <div className="px-6 py-[10px] flex justify-between items-center ">
          <Image src={logo} alt="" className="w-35 h-14" />
          <div className="w-5 h-5 text-zinc-600">{arrowLeft}</div>
        </div>
        <div className="px-7 py-2 flex">
          <div className="mr-4">
            <Image
              src={profile}
              alt=""
              className="w-10 h-10 object-cover border-[1px] border-fuchsia-600 rounded-full"
            />
          </div>
          <div>
            <h1 className="text-gray-200 text-base gap-1 font-semibold ">
              Aly Khan
            </h1>
            <h5 className="text-[11px] text-[#B324D7] p-.5">Edit Profile</h5>
          </div>
        </div>
        <div className="px-7 py-[8px]">
          <Button btnText="Resume Review"  textColor={`text-white`} isActive={true} />
        </div>
      </div>
      <div className="flex flex-col">
        <ul className="pb-20 pt-[8px]">
          {items?.map((item, index) => (
            <li
              key={index}
              className="px-7 py-[11px] inline-block cursor-pointer transition-all text-neutral-500 hover:text-white"
            >
              <Link href="#" className="text-base flex capitalize items-center">
                <div className="w-6 h-6 inline-block pr-2">{item.icon}</div>
                <h2 className="text-base ml-3">{item.text}</h2>
              </Link>
            </li>
          ))}
        </ul>
        <div className="w-[190px] h-[210px] mx-7 mt-20 flex flex-col justify-center items-center rounded-xl bg-gradient-to-b from-fuchsia-600 to-indigo-500">
          <p className="text-white px-8 mb-4 text-xl text-center font-semibold">
            Upgrade to Pro version to get hired faster
          </p>
          <Button btnText="Upgrade" textColor={`text-white`} bgColor="bg-zinc-900" />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
