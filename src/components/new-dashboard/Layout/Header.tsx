"use client";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Modal from "@/components/Modal";
import { bellIcon, sunIcon } from "@/helpers/iconsProvider";
import "@/app/(private_route)/dashboard.css";
import { useSelector } from "react-redux";
import Notifications from "@/components/Notifications";
interface HeaderProps {
  children?: ReactNode;
}
const pagesArray = ["/subscribe"];
const Header: React.FC<HeaderProps> = ({ children }) => {
  const pathname: any = usePathname();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSticky, setIsSticky] = useState(false);
  const userData = useSelector((state: any) => state.userData);
  const [pageScroll, setPageScroll] = useState(0);
  const routeNamesToDisplayNames: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/resume-builder": "Generate New Resumes",
    "/cover-letter-generator": "Generate Cover Letter",
    "/linkedin-generator": "Keyword Optimized Linkedin",
    "/profile-review": "Review Your Profile",
    "/email-bot": "Generate Emails Using AI",
    "/consulting-bids-bot": "Generate Bids Using AI",
    "/subscribe": `Welcome, ${userData.firstName + " " + userData.lastName}`,
    "/chatAI": `Welcome to our latest Chat Bot`,
    "/linkedin-generator/headline": "Headline Generator",
    "/linkedin-generator/about": "About Generator",
    "/linkedin-generator/job-description": "Job Description Generator",
    "/linkedin-generator/keywords": "Keyword Generator",

    // Add more routes as needed
  };

  const currentRouteDisplayName: string =
    routeNamesToDisplayNames[pathname] || "Unknown";

  return (
    <nav
      className={` py-[14px] px-4 ml-0 sticky top-0 bg-gradient-to-l from-[#340E53] to-[#000533]  z-10     
      ${pagesArray?.includes(pathname) ? "m-5" : "lg:ml-[244px]"} 
      ${pathname === "/subscribed" && "hidden"} 
      `}
    >
      <div className="w-full rounded-lg flex justify-between sm:justify-between items-center">
        <h1 className="headText mb-0 rounded-[14px] text-[14px] text-[#959595] font-bold uppercase">
          {currentRouteDisplayName}
        </h1>
        <div className="flex">
          <button
            onClick={() => setIsModalOpen(!isModalOpen)}
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
