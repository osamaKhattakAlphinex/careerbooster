"use client";
import { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import Modal from "@/components/Modal";
import { bellIcon, sunIcon } from "@/helpers/iconsProvider";
import "@/app/(private_route)/dashboard.css";
import { useSelector } from "react-redux";
interface HeaderProps {
  children?: ReactNode;
}
const pagesArray = ["/subscribe"];
const Header: React.FC<HeaderProps> = ({ children }) => {
  const pathname: any = usePathname();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const userData = useSelector((state: any) => state.userData);
  const routeNamesToDisplayNames: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/resume-builder": "Generate New Resumes",
    "/cover-letter-generator": "Generate Cover Letter",
    "/linkedin-generator": "Keyword Optimized Linkedin",
    "/profile-review": "Review Your Profile",
    "/email-bot": "Generate Emails Using AI",
    "/consulting-bids-bot": "Generate Bids Using AI",
    "/subscribe": `welCome, ${userData.firstName + " " + userData.lastName}`,
    // Add more routes as needed
  };

  const currentRouteDisplayName: string =
    routeNamesToDisplayNames[pathname] || "Unknown";

  return (
    <nav
      className={`nav-item py-[14px] px-4 ml-0  
      ${pagesArray?.includes(pathname) ? "m-5" : "lg:ml-[244px]"} 
      ${pathname === "/subscribed" && "hidden"} 
      `}
    >
      <div className="w-full rounded-lg flex justify-between sm:justify-between items-center">
        <h1 className="headText  rounded-[14px] text-[14px] text-[#959595] font-bold uppercase">
          {currentRouteDisplayName}
        </h1>
        <div className="flex">
          <button
            onClick={() => setIsModalOpen(true)}
            className={`text-white flex justify-center mr-3 items-center bg-zinc-900 border-zinc-800 w-[40px] h-[40px] rounded-full capitalize  ${
              pathname === "/subscribe" ? "hidden" : ""
            } `}
          >
            {bellIcon}
          </button>
          {/* <button className="text-white flex justify-center mr-1 items-center bg-zinc-900 border-zinc-800 w-[40px] h-[40px] rounded-full capitalize">
            {sunIcon}
          </button> */}
        </div>
      </div>

      {/* Render the Modal component */}
      {children}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </nav>
  );
};

export default Header;